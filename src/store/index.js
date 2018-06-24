import { applyMiddleware, combineReducers, createStore } from 'redux'
    import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import userReducer from 'store/reducers/userReducer'
import notesReducer from 'store/reducers/notesReducer'

const allReducers = combineReducers({
    user: userReducer,
    notes: notesReducer
})

const compose = composeWithDevTools({})

const middleware = compose(
    applyMiddleware(thunk)
)

const store = createStore(allReducers, {}, middleware)

export default store