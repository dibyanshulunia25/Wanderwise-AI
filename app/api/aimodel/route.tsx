import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: NextRequest) {
    const { messages } = await req.json();

    const prompt = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
    
    IMPORTANT: You must ALWAYS return your response as a valid JSON object, strictly following this schema:
    {
        "resp": "Your conversational response goes here",
        "ui": "budget" | "groupSize" | "TripDuration" | "Final"
    }

    Only ask questions about the following details in order, and wait for the user's answer before asking the next:
    1. Starting location (source)
    2. Destination city or country
    3. Group size (Solo, Couple, Family, Friends) -> use ui: "groupSize"
    4. Budget (Low, Medium, High) -> use ui: "budget"
    5. Trip duration (number of days) -> use ui: "TripDuration"
    6. Travel interests
    7. Special requirements

    Do not ask multiple questions at once.
    If any answer is missing or unclear, politely ask the user to clarify.
    When asking questions 1, 2, 6, 7, use ui: "default".
    When all required information is collected, generate the final trip plan and use ui: "Final".
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "openai/gpt-4.1-mini",
            messages: [
                {
                    "role": "system",
                    "content": prompt
                },
                ...messages
            ],
            max_tokens: 2000,
            response_format: { type: "json_object" },
        });

        const message = completion.choices[0].message;
        return NextResponse.json(JSON.parse(message.content ?? ""));
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error });
    }
}