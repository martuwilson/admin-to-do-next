
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';
interface Segments {
    params: {
        id: string
    }
}


const getTodo =async (id:string):Promise<Todo | null> => {
    const todo = await prisma.todo.findFirst( {where: { id }});

    return todo;
}

export async function GET(request: Request, {params}: Segments ){

    const todo = await getTodo(params.id);

    if( !todo ) return NextResponse.json({ message: `Todo with ${params.id} not found` }, { status: 400 });
    return NextResponse.json({
       todo
    });
}


const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional(),
})

export async function PUT(request: Request, {params}: Segments ){

    const id = params.id;
    const todo = await prisma.todo.findFirst( {where: { id }});

    if( !todo ) return NextResponse.json({ message: `Todo with ${id} not found` }, { status: 400 });

    
    try {
        const {description, complete} = await putSchema.validate( await request.json() );

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { description, complete }
        });

        return NextResponse.json({
            updatedTodo
        });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}

export async function DELETE(request: Request, {params}: Segments ){

    const id = params.id;
    const todo = await prisma.todo.findFirst( {where: { id }});

    if( !todo ) return NextResponse.json({ message: `Todo with ${id} not found` }, { status: 400 });

    const deletedTodo = await prisma.todo.delete({ where: { id } });

    return NextResponse.json({
        deletedTodo
    });
}