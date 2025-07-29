import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generatePitchDeckOutline(companyInfo: any): Promise<any> {
    const prompt = `Generate a pitch deck outline and content for a company with the following information:
    Company Name: ${companyInfo.companyName}
    Industry: ${companyInfo.industry}
    Stage: ${companyInfo.stage}
    Funding Goal: ${companyInfo.fundingGoal}
    Problem Statement: ${companyInfo.problemStatement}
    Solution: ${companyInfo.solution}
    Business Model: ${companyInfo.businessModel}
    Target Market: ${companyInfo.targetMarket}

    The output should be a JSON array of slides, where each slide has a 'title' and 'content' field. The content should be detailed and suitable for a pitch deck.`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using the mini model
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  }
}
