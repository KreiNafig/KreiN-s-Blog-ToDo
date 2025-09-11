import React from 'react'
import "./todo.css"

export const TodoComp = () => {
    const array = [{
        id: 1,
        title: 'title',
        text: 'text',
    }, {
        id: 2,
        title: 'zagolovok2',
        text: 'text2'
    }]
  return (
    <div className="todoList">
    <div>{array.map((e) => (
        <div style={{position: "relative"}} className="todo" key={e.id}>
            <h2>{e.title}</h2>
            <p>{e.text}</p>
            <div style={{display: "flex", flexDirection: "column", position: "absolute", top: "5px", right: "5px"}}>
            <button>delete</button>
            <button>completed</button>
            </div>
        </div>
    ))}</div>
    <div className="aside__todo">
        fda
        fasd
    </div>
    </div>
  )
}
