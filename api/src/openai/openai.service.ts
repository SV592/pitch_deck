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
    const prompt = `Generate a pitch deck outline and content for a company with the following information:\n    Company Name: ${companyInfo.companyName}\n    Industry: ${companyInfo.industry}\n    Stage: ${companyInfo.stage}\n    Funding Goal: ${companyInfo.fundingGoal}\n    Problem Statement: ${companyInfo.problemStatement}\n    Solution: ${companyInfo.solution}\n    Business Model: ${companyInfo.businessModel}\n    Target Market: ${companyInfo.targetMarket}\n\n    The output should be a JSON array of slides, where each slide has a 'title' and 'content' field. The content should be detailed and suitable for a pitch deck.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Using the mini model
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0].message.content);
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
        this.logger.error(
          `An unexpected error occurred: ${error.message}`,
          error.stack
        );
        throw new InternalServerErrorException(
          `An unexpected error occurred during pitch deck generation. Please try again.`
        );
      }
    }
  }
}
