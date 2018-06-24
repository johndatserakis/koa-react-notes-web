import axios from 'common/axios'
import setAuthorizationHeader from 'common/setAuthorizationHeader'

export const ADD_NOTES = 'notes:addNotes'
export const SET_NOTES = 'notes:setNotes'
export const ADD_NOTE_TO_STACK = 'notes:addNoteToStack'


// Mutations
export const addNotes = (notesArray) => {
    return {
        type: ADD_NOTES,
        payload: { notes: notesArray }
    }
}

export const setNotes = (notesArray) => {
    return {
        type: SET_NOTES,
        payload: { notes: notesArray }
    }
}

export const addNoteToStack = (note) => {
    return {
        type: ADD_NOTE_TO_STACK,
        payload: { notes: note }
    }
}

export const notesLogout = () => {
    return async dispatch => {
        try {
            await dispatch({ type: SET_NOTES, payload: null})
            return Promise.resolve()
        } catch (error) {
            throw new Error(error)
        }
    }
}

// API Calls
export const getNotes = (data) => {
    return async (dispatch, getState) => {
        try {
            setAuthorizationHeader(getState().user.accessToken)
            let result = await axios.get('notes', {params: {sort: data.sort, order: data.order, page: data.page, limit: data.limit}})
            await dispatch({ type: SET_NOTES, payload: result.data})
            return Promise.resolve()
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const createNote = (data) => {
    return async (dispatch, getState) => {
        try {
            setAuthorizationHeader(getState().user.accessToken)
            return await axios.post('notes', data)
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const getNote = (data) => {
    return async (dispatch, getState) => {
        try {
            setAuthorizationHeader(getState().user.accessToken)
            return await axios.get('notes/' + data)
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const saveNote = (data) => {
    return async (dispatch, getState) => {
        try {
            setAuthorizationHeader(getState().user.accessToken)
            return await axios.put('notes/' + data.id, {title: data.title, content: data.content})
        } catch (error) {
            throw new Error(error)
        }
    }
}