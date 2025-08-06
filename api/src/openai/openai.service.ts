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
      timeout: 60 * 1000, // 60 seconds timeout
    });
  }

  async generatePitchDeckOutline(companyInfo: any): Promise<any> {
    const prompt = `
      {
        "role": "You are an expert pitch deck consultant with a deep understanding of venture capital and strategic storytelling. Your task is to generate a comprehensive and visually compelling pitch deck based on the provided company information and visual guidelines. You will act as a creative partner, selecting the typography, color palette, and other visual elements that best represent the company's brand, industry, and stage. Your output must be a single, valid JSON object.",
        "companyInfo": {
          "companyName": "${companyInfo.companyName}",
          "industry": "${companyInfo.industry}",
          "stage": "${companyInfo.stage}",
          "fundingGoal": "${companyInfo.fundingGoal}",
          "problemStatement": "${companyInfo.problemStatement}",
          "solution": "${companyInfo.solution}",
          "businessModel": "${companyInfo.businessModel}",
          "targetMarket": "${companyInfo.targetMarket}",
          "teamInfo": "${companyInfo.teamInfo || ''}",
          "tractionInfo": "${companyInfo.tractionInfo || ''}",
          "useOfFunds": "${companyInfo.useOfFunds || ''}"
        },
        "visualInstructions": {
          "tone": "Modern, professional, and minimalist. The tone should be confident and trustworthy.",
          "layout": "Each slide needs a strong visual focal point with generous white space. Content should be organized into concise, impactful bullet points.",
          "imagery": "Suggest high-quality, professional stock photos, clean charts, graphs, and modern icons. The imagery should be relevant to the industry and convey a sense of innovation and progress."
        },
        "outputFormat": {
          "jsonStructure": {
            "theme": {
              "colorPalette": {
                "primary": "string (hex code)",
                "secondary": "string (hex code)",
                "accent": "string (hex code)",
                "background": "string (hex code)",
                "text": "string (hex code)"
              },
              "typography": {
                "fontFamily": "string (e.g., 'Montserrat')",
                "titleSize": "string (e.g., '48pt')",
                "bodySize": "string (e.g., '24pt')"
              },
              "justification": "A brief explanation (string) of why the chosen color palette and typography were selected for the specific industry and tone."
            },
            "slides": [
              {
                "slide_number": "number (1-12)",
                "slide_title": "string (e.g., 'The Problem')",
                "headline": "string (An impactful one-line summary of the slide's core message)",
                "hook": "string (An engaging, attention-grabbing opening sentence or question for this slide, designed to immediately capture the audience's interest.)",
                "key_points": [
                  "string (First key bullet point)",
                  "string (Second key bullet point)",
                  "string (Third key bullet point)"
                ],
                "speaker_notes": "string (The detailed, persuasive script for the presenter to deliver this slide. This should be a full paragraph explaining the slide's key points, providing supporting data, and anticipating investor questions. It should be a comprehensive, yet conversational script.)",
                "visual_suggestion": "string (A detailed prompt for an AI image generation model, consistent with the imagery and theme guidelines. For data slides, specify the type of chart and the data it should visualize.)"
              }
            ]
          },
          "guidelines": "The output must be a single, valid JSON object. Do not include any additional text, explanations, or formatting outside of the specified JSON structure. The 'slides' array must contain 10-12 slide objects, each with the specified components."
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
}
