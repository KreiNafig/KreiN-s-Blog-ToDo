import { useState } from 'react';

export const useEditState = (initialState = null) => {
    const [editingId, setEditingId] = useState(initialState);

    const startEditing = (id) => {
        setEditingId(id);
    };

    const stopEditing = () => {
        setEditingId(null);
    };

    const isEditing = (id) => {
        return editingId === id;
    };

    return {
        editingId,
        startEditing,
        stopEditing,
        isEditing
    };
};