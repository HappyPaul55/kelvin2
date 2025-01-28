import CreatePromptFactory from '@/Factory/CreatePromptFactory';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return new NextResponse(
    CreatePromptFactory(),
    {
      status: 200,
    }
  );
}
