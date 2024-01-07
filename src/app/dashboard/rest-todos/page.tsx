'use client';

import prisma from "@/lib/prisma";


// eslint-disable-next-line @next/next/no-async-client-component
export default async function RestTodosPage(){

    const todos = await prisma.todo.findMany({ orderBy: { id: 'desc' } })
    

    return(
        <>
            {
                JSON.stringify(todos)
            }
        </>
    )
}