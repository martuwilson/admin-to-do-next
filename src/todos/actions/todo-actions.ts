'use server'
import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

    const todo = await prisma.todo.findFirst({
        where: { id }
    })

    if (!todo) {
        throw new Error('Todo not found')
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete }
    })


    revalidatePath('/dashboard/server-todos') // sirve para refrescar la pagina en el cliente

    return updatedTodo
}


export const addTodo = async (description: string) => {
    try {
    
        const todo = await prisma.todo.create({ data: { description } })
        
        revalidatePath('/dashboard/server-todos') // sirve para refrescar la pagina en el cliente
        
        return todo;
        
      } catch (error) {
        return {
            message: 'Error al crear el todo',
        }
      }
}


export const deleteCompletedTodos = async ():Promise<void>  => {
    await prisma.todo.deleteMany({ where: { complete: true } });
    revalidatePath('/dashboard/server-todos') // sirve para refrescar la pagina en el cliente
}