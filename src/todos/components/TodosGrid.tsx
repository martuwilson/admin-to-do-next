'use client';

import { Todo } from "@prisma/client"
import { TodoItem } from "..";


interface TodosGridProps {
    todos?: Todo[] // Todo es un arreglo que viene desde Prisma
}

export const TodosGrid = ({todos = []}: TodosGridProps) => {


  return (
    <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-2"
    >
        {
            todos.map(todo =>(
                <TodoItem key={todo.id} todo={todo}/>
            ))
        }
    </div>
  )
}
