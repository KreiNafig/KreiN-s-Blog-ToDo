import React, { useEffect, useState } from 'react'
import { useCreateTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../../api/todoApi'
import {useValidation} from '../../hooks/useValidation'
import { sortTodoCompleted, sortTodoNotCompleted } from '../../features/sort'

export const TodoComp = () => {
    const {data} = useGetTodosQuery()
    const title = useValidation()
    const text = useValidation()
    const [createTodo] = useCreateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [todo, setTodo] = useState([])

    useEffect(() => {
        setTodo(data)
    }, [data])

    function handleSubmit(e) {
        e.preventDefault()
        const obj = {
            title: title.value,
            text: text.value
        }
        createTodo(obj)
    }


  return (
    <div className="todo">
    <div>{todo?.length === 0 ? <div className="todo-card">Нет задач</div> : todo?.map((e) => (
        <div style={{position: "relative"}} className="todo-card" key={e.id}>
            <h1 className={e.completed === 0 ? "todo-title" : "todo-title completed"}>{e.title}</h1>
            <p className={e.completed === 0 ? "todo-text" : "todo-text completed"}>{e.text}</p>
            <div style={{display: "flex", flexDirection: "column", position: "absolute", top: "5px", right: "5px"}}>
            <div className="todo-actions">
            <button style={{width: "110px"}} onClick={() => deleteTodo(e.id)}>Удалить</button>
            {e.completed === 1
            ? <button style={{width: "110px"}} onClick={() => updateTodo({id: e.id, completed: e.completed - 1})}>Отмена</button>
            : <button style={{width: "110px"}} onClick={() => updateTodo({id: e.id, completed: e.completed + 1})}>Выполнить</button>
            }
            </div>
            </div>
        </div>
    ))}</div>
    <div className="aside__todo">
        <form onSubmit={(e) => handleSubmit(e)}>
            <input placeholder='Введите заголовок' name="title" value={title.value} onChange={title.onChange} onBlur={title.onBlur} />
            {(title.dirty && title.error) && <div style={{color: 'red'}}>{title.errorMessage}</div>}
            <input placeholder='Введите текст' name="text" value={text.value} onChange={text.onChange} onBlur={text.onBlur} />
            {(text.dirty && text.error) && <div style={{color: 'red'}}>{text.errorMessage}</div>}
            <button type="submit">Добавить задачу</button>
        </form>
        <h4 style={{margin: "15px 0px"}}>Сортировка задач:</h4>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <button onClick={() => setTodo(sortTodoCompleted(todo))}>Выполненные</button>
            <button onClick={() => setTodo(sortTodoNotCompleted(todo))}>Невыполненные</button>
        </div>
    </div>
    </div>
  )
}
