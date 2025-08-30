import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { query, userId } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json({
        error: 'Invalid request',
        message: 'Query is required and must be a string'
      }, { status: 400 });
    }

    // Create system prompt for number conversion
    const systemPrompt = `You are an expert mathematician and programmer specializing in number system conversions. 
    
    Your task is to:
    1. Understand the user's natural language request for number conversion
    2. Identify the source number and target format
    3. Perform the conversion accurately
    4. Provide a clear explanation of the process
    5. Show step-by-step conversion if applicable
    
    Always respond in this JSON format:
    {
      "result": "the converted number",
      "explanation": "clear explanation of what was done",
      "steps": ["step 1", "step 2", "step 3"],
      "confidence": 0.95
    }
    
    Examples of conversions you should handle:
    - Binary to decimal, hex, octal
    - Decimal to binary, hex, octal
    - Hexadecimal to decimal, binary, octal
    - Octal to decimal, binary, hex
    - Roman numerals
    - Fractional numbers
    - Mathematical operations in different bases
    
    Be precise, educational, and helpful.`;

    // Create user prompt
    const userPrompt = `Please convert this request: "${query}"
    
    If this involves mathematical operations, show the work.
    If this involves fractional numbers, provide appropriate precision.
    Always explain your reasoning.`;

    // Call Gemini AI API
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `${systemPrompt}\n\n${userPrompt}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();
    
    // Parse the AI response
    let parsedResponse;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      parsedResponse = {
        result: "Conversion completed",
        explanation: aiResponse,
        steps: ["AI processed the request", "Conversion completed"],
        confidence: 0.8
      };
    }

    // Return the response
    return NextResponse.json({
      success: true,
      data: {
        ...parsedResponse,
        timestamp: new Date().toISOString(),
        userId: userId || 'demo-user'
      }
    });

  } catch (error) {
    console.error('Gemini AI conversion error:', error);
    
    return NextResponse.json({
      error: 'AI conversion failed',
      message: 'Failed to process the conversion request. Please try again.',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
