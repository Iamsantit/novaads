import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "sk-placeholder"
});

type ChatOpts = {
  system: string;
  user: string;
  model?: string;
  json?: boolean;
  maxTokens?: number;
};

/**
 * Thin wrapper with JSON mode + cost-conscious defaults.
 * Default model: gpt-4o-mini for speed/cost; bump to gpt-4o for premium features.
 */
export async function chat({ system, user, model = "gpt-4o-mini", json = true, maxTokens = 1200 }: ChatOpts) {
  const res = await client.chat.completions.create({
    model,
    response_format: json ? { type: "json_object" } : undefined,
    max_tokens: maxTokens,
    temperature: 0.7,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ]
  });
  const text = res.choices[0]?.message?.content ?? "";
  return json ? (safeJson(text) ?? { raw: text }) : text;
}

export async function image(prompt: string, size: "1024x1024" | "1792x1024" | "1024x1792" = "1024x1024") {
  const res = await client.images.generate({
    model: "dall-e-3",
    prompt,
    size,
    n: 1
  });
  return res.data?.[0]?.url ?? "";
}

function safeJson(s: string): unknown | null {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
