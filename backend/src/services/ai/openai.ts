import OpenAI from "openai";
import type { AIProvider, ChatInput, ChatOutput, ImageInput, ImageOutput } from "./types";
import { ProviderError, safeJson } from "./types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "sk-placeholder"
});

/**
 * OpenAI provider. Defaults to gpt-4o-mini for chat (fast + cheap) and DALL·E 3
 * for image. Bump to gpt-4o for higher-stakes modules (pitch, sales page).
 */
export const openaiProvider: AIProvider = {
  id: "openai",
  supports: { chat: true, image: true, slides: false },

  async chat(input: ChatInput): Promise<ChatOutput> {
    const model = "gpt-4o-mini";
    try {
      const res = await client.chat.completions.create({
        model,
        response_format: input.json ? { type: "json_object" } : undefined,
        max_tokens: input.maxTokens ?? 1400,
        temperature: input.temperature ?? 0.7,
        messages: [
          { role: "system", content: input.system },
          { role: "user", content: input.user }
        ]
      });
      const text = res.choices[0]?.message?.content ?? "";
      return {
        provider: "openai",
        model,
        content: input.json ? safeJson(text) ?? { raw: text } : text,
        raw: text,
        tokens: {
          input: res.usage?.prompt_tokens ?? 0,
          output: res.usage?.completion_tokens ?? 0
        }
      };
    } catch (err) {
      throw new ProviderError("openai", (err as Error).message);
    }
  },

  async image(input: ImageInput): Promise<ImageOutput> {
    try {
      const res = await client.images.generate({
        model: "dall-e-3",
        prompt: input.prompt,
        size: input.size ?? "1024x1024",
        n: 1
      });
      const url = res.data?.[0]?.url ?? "";
      return { provider: "openai", url };
    } catch (err) {
      throw new ProviderError("openai", (err as Error).message);
    }
  }
};
