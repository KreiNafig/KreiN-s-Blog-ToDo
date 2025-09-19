export const sortNewElement = (data) => {
    return [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const  sortOldElement = (data) => {
    return [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
}

export const sortPostName = (data, query) => {
    return data?.filter((e) => e.title.toLowerCase().includes(query.toLowerCase()))
}

export const sortPostAuthor = (data, query) => {
    return data?.filter((e) => e.author.toLowerCase().includes(query.toLowerCase()))
}

export const sortTodoCompleted = (data) => {
    return [...data].sort((a, b) => b.completed - a.completed)
}


export const sortTodoNotCompleted = (data) => {
    return [...data].sort((a, b) => a.completed - b.completed)
}

