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
        default:
            return state
    }
}

export default notesReducer