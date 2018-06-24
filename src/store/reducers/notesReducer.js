const notesReducer = (state = {notes: []}, action) => {
    switch (action.type) {
        case 'notes:addNotes':
            return {
                ...state,
                notes: state.notes.concat(action.payload)
            }
        case 'notes:setNotes':
            return {
                ...state,
                notes: action.payload
            }
        case 'notes:addNoteToStack':
            return {
                ...state,
                notes: [action.payload].concat(state.notes)
            }
        case 'notes:editNoteInStack':
            let editIndex = state.notes.map(note => note.id).indexOf(Number(action.payload.id))
            state.notes[editIndex].title = action.payload.title
            state.notes[editIndex].content = action.payload.content
            return {
                ...state,
                notes: state.notes
            }
        case 'notes:deleteNoteInStack':
            let deleteIndex = state.notes.map(note => note.id).indexOf(Number(action.payload.id))
            state.notes.splice(deleteIndex, 1)
            return {
                ...state,
                notes: state.notes
            }
        default:
            return state
    }
}

export default notesReducer