

import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    const {searchParams} = new URL(request.url);
    const take = searchParams.get('take') ?? '10';
    const skip = searchParams.get('skip') ?? '0';

    if(isNaN(+ take)) {
        return NextResponse.json({error: 'Take debe ser un numero'}, {status: 400});
    }

    if(isNaN(+ skip)) {
        return NextResponse.json({error: 'Skip debe ser un numero'}, {status: 400});
    }

    const todos = await prisma.todo.findMany({
        take: +take,
        skip: +skip,
    });

  return NextResponse.json(todos);
}