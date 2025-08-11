import {
  Injectable,
  Logger,
  BadGatewayException,
  InternalServerErrorException,
} from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 120 * 1000, // 120 seconds timeout (2 minutes)
    });
  }

  async generatePitchDeckOutline(companyInfo: any): Promise<any> {
    const prompt = `
      {
        "role": "You are an expert pitch deck consultant with a deep understanding of venture capital and strategic storytelling. Your task is to generate a comprehensive pitch deck based on the provided company information. Your output must be a single, valid JSON object.",
        "companyInfo": {
          "companyName": "${companyInfo.companyName}",
          "industry": "${companyInfo.industry}",
          "stage": "${companyInfo.stage}",
          "fundingGoal": "${companyInfo.fundingGoal}",
          "problemStatement": "${companyInfo.problemStatement}",
          "solution": "${companyInfo.solution}",
          "businessModel": "${companyInfo.businessModel}",
          "targetMarket": "${companyInfo.targetMarket}",
        },
        "outputFormat": {
          "jsonStructure": {
            "slides": [
              {
                "slide_number": "number (1-12)",
                "headline": "string (An impactful one-line summary of the slide's core message, which will also serve as the main title for the slide. This should be bold. Format as HTML, e.g., <h1><strong>Headline</strong></h1>)",
                "hook": "string (An engaging, attention-grabbing opening sentence or question for this slide, designed to immediately capture the audience's interest. Format as HTML, e.g., <p>Hook text</p>)",
                "key_points": [
                  "string (First key bullet point. Format as HTML, e.g., <li>Key point</li>)",
                  "string (Second key bullet point. Format as HTML, e.g., <li>Key point</li>)",
                  "string (Third key bullet point. Format as HTML, e.g., <li>Key point</li>)"
                ],
                "speaker_notes": "string (The detailed, persuasive script for the presenter to deliver this slide. This should be a full paragraph explaining the slide's key points, providing supporting data, and anticipating investor questions. It should be a comprehensive, yet conversational script. Format as HTML, e.g., <p>Speaker notes content</p>)",
                "visual_suggestion": "string (A detailed prompt for an AI image generation model. For data slides, specify the type of chart and the data it should visualize.)"
              }
            ]
          },
          "guidelines": "The output must be a single, valid JSON object. Do not include any additional text, explanations, or formatting outside of the specified JSON structure. The 'slides' array must contain 10-12 slide objects, each with the specified components. The 'key_points' field must be an array of strings. All content fields (headline, hook, key_points, speaker_notes) should be formatted as valid HTML snippets."
        }
      }
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // Using the more powerful model
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0].message.content;
      this.logger.log(
        `Raw OpenAI response content: ${content ? content.substring(0, 500) + "..." : "empty"}`
      );
      if (!content) {
        throw new InternalServerErrorException(
          `OpenAI response content is empty. Cannot generate pitch deck.`
        );
      }
      const parsedContent = JSON.parse(content);
      this.logger.log(
        `Parsed OpenAI response (first 500 chars): ${JSON.stringify(parsedContent).substring(0, 500)}...`
      );
      return parsedContent;
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        this.logger.error(
          `OpenAI API Error: ${error.status} - ${error.message}`,
          error.stack
        );
        throw new BadGatewayException(
          `Failed to generate pitch deck outline due to an external API error. Please try again later.`
        );
      } else if (error instanceof SyntaxError) {
        this.logger.error(
          `JSON Parsing Error: Invalid response from OpenAI API. Raw content: ${error.message}`,
          error.stack
        );
        throw new InternalServerErrorException(
          `Failed to process OpenAI response. Please contact support.`
        );
      } else {
        if (error instanceof Error) {
          this.logger.error(
            `An unexpected error occurred: ${error.message}`,
            error.stack
          );
        } else {
          this.logger.error(`An unexpected error occurred: ${error}`);
        }
        throw new InternalServerErrorException(
          `An unexpected error occurred during pitch deck generation. Please try again.`
        );
      }
    }
  }

  async generateSlideContent(fullPrompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: fullPrompt }],
        response_format: { type: "json_object" },
      });

      let generatedContent = response.choices[0].message.content;
      this.logger.log(
        `Raw generatedContent from OpenAI: ${generatedContent ? generatedContent.substring(0, 500) + "..." : "empty"}`
      );
      if (!generatedContent) {
        throw new InternalServerErrorException(
          `OpenAI response content is empty for slide generation.`
        );
      }

      // Parse the JSON response
      let parsedResponse: { content: string; speaker_notes?: string };
      try {
        parsedResponse = JSON.parse(generatedContent);
      } catch (e) {
        this.logger.error(
          `Failed to parse JSON from OpenAI response: ${e.message}`
        );
        throw new InternalServerErrorException(
          `Invalid JSON response from OpenAI.`
        );
      }

      // Assuming the HTML content is in a 'content' field within the JSON
      if (!parsedResponse.content) {
        throw new InternalServerErrorException(
          `JSON response missing 'content' field.`
        );
      }

      return parsedResponse.content;
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        this.logger.error(
          `OpenAI API Error during slide generation: ${error.status} - ${error.message}`,
          error.stack
        );
        throw new BadGatewayException(
          `Failed to generate slide content due to an external API error. Please try again later.`
        );
      } else {
        if (error instanceof Error) {
          this.logger.error(
            `An unexpected error occurred during slide generation: ${error.message}`,
            error.stack
          );
        } else {
          this.logger.error(
            `An unexpected error occurred during slide generation: ${error}`
          );
        }
        throw new InternalServerErrorException(
          `An unexpected error occurred during slide content generation. Please try again.`
        );
      }
    }
  }
}
