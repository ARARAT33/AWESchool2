export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { translate } from '@vitalets/google-translate-api';

export async function POST(req: NextRequest) {
  try {
    const { text, to } = await req.json();
    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }
    
    // Check if it's an array of texts
    if (Array.isArray(text)) {
      const results = await Promise.all(text.map(async (t) => {
        if (!t || typeof t !== 'string') return t;
        try {
          const res = await translate(t, { to });
          return res.text;
        } catch {
          return t;
        }
      }));
      return NextResponse.json({ translatedText: results });
    }
    
    const { text: translatedText } = await translate(text, { to });
    return NextResponse.json({ translatedText });
  } catch (error: any) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed', details: error.message }, { status: 500 });
  }
}
