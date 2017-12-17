import { combineReducers } from 'redux';
import { notebookReducer, notebooksReducer } from'./notebook';
import { noteReducer } from'./note';

export default combineReducers({
    notebook : notebookReducer,
    notebooks : notebooksReducer,
    notes : noteReducer
});
