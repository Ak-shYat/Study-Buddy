import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// In a real app, this would be stored in environment variables
// For demo purposes, users can add their own API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { text, category } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      // Return mock explanation if no API key is provided
      return NextResponse.json({
        definition: `Mock definition: ${text} is a specialized term in ${category}.`,
        context: `This term is commonly used in ${category} contexts.`,
        examples: [
          `Example 1: ${text} is used when...`,
          `Example 2: In ${category}, ${text} applies to...`,
        ],
        relatedTerms: ['related term 1', 'related term 2'],
        difficulty: 'intermediate',
      });
    }

    const prompt = `You are an expert in ${category}. Explain the term "${text}" in a comprehensive but concise way.

Provide a response in the following JSON format:
{
  "definition": "A clear, concise definition (1-2 sentences)",
  "context": "How this term is used in ${category} specifically (1 sentence)",
  "examples": ["3 practical examples of usage"],
  "relatedTerms": ["4-5 related terms"],
  "difficulty": "basic|intermediate|advanced"
}

Make sure the explanation is accurate, accessible, and tailored to the ${category} field. Only return valid JSON, no additional text or markdown formatting.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    if (!response) {
      throw new Error('No response from Gemini');
    }

    try {
      // Clean the response in case it has markdown formatting
      const cleanedResponse = response.replace(/```json\n?|\n?```/g, '').trim();
      const parsedResponse = JSON.parse(cleanedResponse);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      console.error('Raw response:', response);
      // Fallback to mock response
      return NextResponse.json({
        definition: `${text} is an important concept in ${category}.`,
        context: `This term is frequently used in ${category} discussions.`,
        examples: [
          `Example 1: ${text} is applied when...`,
          `Example 2: In ${category}, ${text} helps to...`,
        ],
        relatedTerms: ['related concept', 'similar term'],
        difficulty: 'intermediate',
      });
    }

  } catch (error) {
    console.error('Error in explain API:', error);

    // Return a fallback response
    return NextResponse.json({
      definition: 'Unable to generate explanation at this time.',
      context: 'Please try again later.',
      examples: ['Example will be available when service is restored.'],
      relatedTerms: ['Related terms unavailable'],
      difficulty: 'intermediate',
    }, { status: 500 });
  }
}
