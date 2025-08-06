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
      You are an expert pitch deck consultant. Your task is to generate a comprehensive and visually compelling pitch deck based on the provided company information and visual guidelines.

      **Company Information:**
      - **Company Name:** ${companyInfo.companyName}
      - **Industry:** ${companyInfo.industry}
      - **Stage:** ${companyInfo.stage}
      - **Funding Goal:** ${companyInfo.fundingGoal}
      - **Problem Statement:** ${companyInfo.problemStatement}
      - **Solution:** ${companyInfo.solution}
      - **Business Model:** ${companyInfo.businessModel}
      - **Target Market:** ${companyInfo.targetMarket}

      **Visual Instructions:**
      - **Theme:** Modern, professional, and minimalist. The tone should be confident and trustworthy.
      - **Color Palette:** Use a primary color of deep blue (#004488), a light gray (#F5F5F5) for backgrounds, and a dark gray (#333333) for text.
      - **Typography:** Use the 'Montserrat' font for all text. Titles should be bold and larger (e.g., 48pt), with body text at a readable size (e.g., 24pt).
      - **Layout:** Each slide needs a strong focal point with generous white space. Limit text to key bullet points or a single impactful sentence.
      - **Imagery:** Suggest high-quality, professional stock photos relevant to the industry. For data, recommend clean charts and graphs matching the color scheme. Use consistent, modern icons for features and benefits.

      **Output Format:**
      Your response must be a single, valid JSON object with two main keys: "theme" and "slides".

      1.  **"theme"**: An object containing the visual branding guidelines.
          - **"colorPalette"**: An object with keys "primary", "secondary", and "accent", containing the hex codes from the instructions.
          - **"typography"**: An object with the key "fontFamily" set to the font specified in the instructions.

      2.  **"slides"**: An array of 10-12 slide objects. Each object must have the following keys:
          - **"title"**: A string for the slide title.
          - **"content"**: A string containing the detailed, persuasive content for the slide, adhering to the layout instructions.
          - **"visual_suggestion"**: A string providing a detailed prompt for an AI image generation model, consistent with the imagery and theme guidelines.

      Do not include any additional text, explanations, or formatting outside of the specified JSON structure.
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
