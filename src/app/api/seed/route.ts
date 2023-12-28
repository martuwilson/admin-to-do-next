import prisma from '@/lib/prisma';
import {
    NextResponse, NextRequest
} from 'next/server';

export async function GET(request: Request){

    await prisma.todo.deleteMany(); // delete all todos
    

    // Preparar insersion de datos
    /* const todo = await prisma.todo.create(
        //insertar la data
        {
            data: {
                description: 'Piedra del alma',
                complete: true,
            }
        }
    )

    console.log(todo); */

    
    await prisma.todo.createMany({
        data: [
            {
                description: 'Piedra del alma',
                complete: true,
            },
            {
                description: 'Piedra del tiempo',
                complete: false,
            },
            {
                description: 'Piedra del poder',
                complete: false,
            },
            {
                description: 'Piedra del espacio',
                complete: false,
            },
            {
                description: 'Piedra de la mente',
                complete: false,
            },
            {
                description: 'Piedra de la realidad',
                complete: false,
            },
        ]
    })

    return NextResponse.json({
        message: 'Seed experiment'
    });
}

