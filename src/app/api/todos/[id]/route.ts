

import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

interface Segments {
    params: {
        id: string;
    }
}

export async function GET(request: Request, {params}: Segments) { 

    const {id} = params;
    const todo = await prisma.todo.findFirst({
        where: {
            id:id
        }
    });

    if (!todo) {
        return NextResponse.json({error: 'No se encuentra el ID'}, {status: 404});
    }

    return NextResponse.json(todo);

}