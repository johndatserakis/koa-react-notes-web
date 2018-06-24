import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk';
import userReducer from 'store/reducers/userReducer'
import notesReducer from 'store/reducers/notesReducer'

const allReducers = combineReducers({
    user: userReducer,
    notes: notesReducer
})

const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

const store = createStore(allReducers, {}, allStoreEnhancers)

export default store