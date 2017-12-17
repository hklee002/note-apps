import expect from 'expect';
import * as actions from '../actions'
import * as types from '../constants/ActionTypes'
import { notebooksReducer } from '../reducers/notebook';
import { noteReducer } from '../reducers/note';

describe('notebooks reducer', () => {
    it('should return the initial state', () => {
        expect(notebooksReducer(undefined, [])).toEqual([]);
    });

    it('should handle CREATE_NOTEBOOK_SUCCESS', () => {
        const Action = {
            type: actions.CREATE_NOTEBOOK_SUCCESS
        };

        expect(notebooksReducer([], Action)).toEqual([]);
        expect(notebooksReducer([], {
            type : actions.CREATE_NOTEBOOK_SUCCESS, { id : 1 }
        })).toEqual([{ id : 1, title : 'title', content : 'content'}]);
    })
});
