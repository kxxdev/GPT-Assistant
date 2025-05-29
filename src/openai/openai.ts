import { HttpsProxyAgent } from 'https-proxy-agent';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index';
import { stripDisallowedHtmlTags } from '../utils/stripDisallowedHtmlTags';

const proxy = process.env.PROXY;

const proxyAgent = proxy ? new HttpsProxyAgent(proxy) : undefined;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  ...(proxyAgent && { httpAgent: proxyAgent }),
});

export async function gptText(
  messages: ChatCompletionMessageParam[]
): Promise<{ text: string; usageTokens: number }> {
  const response = await openai.chat.completions.create({
    model: process.env.MODEL || 'gpt-3.5-turbo',
    messages,
  });

  const text = response.choices[0].message.content || 'Ошибка ответа';
  const usageTokens = response.usage?.total_tokens || 0;

  return { text: stripDisallowedHtmlTags(text), usageTokens };
}
