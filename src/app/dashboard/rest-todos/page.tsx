
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";


// eslint-disable-next-line @next/next/no-async-client-component
export default async function RestTodosPage(){

    const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } })
    

    return(
        <>  
        <div
            className="w-full px-3 mx-5 mb-5"
        >
            <NewTodo/>
        </div>
            <TodosGrid todos={todos} />
        </>
    )
}