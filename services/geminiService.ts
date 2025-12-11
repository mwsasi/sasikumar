import { GoogleGenAI, Chat } from "@google/genai";
import { PRODUCTS } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Construct a system instruction that includes product knowledge
const systemInstruction = `
You are "Pick Me Bot", a helpful and stylish AI fashion assistant for the luxury brand "Pick Me".
Your goal is to help customers choose from our exclusive collection of bags, shoes, and accessories.
Be concise, friendly, and enthusiastic.

Here is our current product catalog:
${JSON.stringify(PRODUCTS.map(p => ({
  name: p.name,
  category: p.category,
  price: p.price,
  style: p.description,
  colors: p.colors
})))}

If a user asks about a specific occasion (e.g., "formal dinner", "streetwear", "office"), recommend the best match from the catalog.
If you don't know the answer, politely say you can only help with Pick Me products.
Keep responses short (under 50 words) unless detailed advice is requested.
`;

export const createChatSession = (): Chat | null => {
  if (!ai) {
    console.warn("Gemini API Key is missing.");
    return null;
  }

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
    },
  });
};