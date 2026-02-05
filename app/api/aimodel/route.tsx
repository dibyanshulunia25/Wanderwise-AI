import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { aj } from "../arcjet/route";
import { currentUser } from "@clerk/nextjs/server";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const prompt = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

    IMPORTANT: You must ALWAYS return your response as a valid JSON object, strictly following this schema:
    {
        "resp": "Your conversational response or question goes here",
        "ui": "default" | "budget" | "groupSize" | "TripDuration" | "Final"
    }

    Only ask questions about the following details in order, and wait for the user's answer before asking the next: 
   
   1. Starting location (source) 
   2. Destination city or country 
   3. Group size (Solo, Couple, Family, Friends) -> use ui: "groupSize"
   4. Budget (Low, Medium, High) -> use ui: "budget"
   5. Trip duration (number of days) -> use ui: "TripDuration"
   6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
   7. Special requirements or preferences (if any)
   
   Do not ask multiple questions at once, and never ask irrelevant questions.
   If any answer is missing or unclear, politely ask the user to clarify before proceeding.
   Always maintain a conversational, interactive style while asking questions.
   
   When asking questions 1, 2, 6, 7, use ui: "default".
   
   When all required information is collected, generate and return the JSON response with ui: "Final".
   `;

const FINAL_PROMPT = `You are a JSON API.

Return ONLY valid JSON.
Do NOT wrap the response in quotes.
Do NOT escape characters.
Do NOT add any keys like "resp", "data", or "result".
Do NOT add explanations, markdown, or text outside JSON.

If you violate this, the response is invalid.

Generate a travel plan using the schema below.

Output MUST strictly follow this schema and start with a opening curlybrace and end with a closing curlybrace:

{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string", //in inr only rupees
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": number,
          "longitude": number
        },
        "rating": number,
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": number,
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": number,
              "longitude": number
            },
            "place_address": "string",
            "ticket_pricing": "string",//in inr only rupees
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
 `

export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();
  const user = await currentUser();

  const decision = await aj.protect(req, { userId: user?.primaryEmailAddress?.emailAddress ?? "", requested: isFinal?5:0 }); // Deduct 5 tokens from the bucket

  if (decision?.reason?.remaining == 0) {
    return NextResponse.json(
      {
        resp: "You have exceeded the rate limit. Please try again later.",
        ui: "limit",
      }
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          "role": "system",
          "content": isFinal ? FINAL_PROMPT : prompt
        },
        ...messages
      ],
      // max_tokens: 81920,
      response_format: { type: "json_object" },
    });

    const message = completion.choices[0].message;
    const content = message.content ?? "";

    try {
      return NextResponse.json(JSON.parse(content));
    } catch (e) {
      // Fallback for non-JSON responses
      return NextResponse.json({
        resp: content,
        ui: "default",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}