'use client';

import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";


// eslint-disable-next-line @next/next/no-async-client-component
export default async function RestTodosPage(){

    const todos = await prisma.todo.findMany({ orderBy: { id: 'desc' } })
    

    return(
        <>
            {/* formulario todos */}
            <TodosGrid todos={todos} />
        </>
    )
}