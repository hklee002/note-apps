import * as actions from '../actions'
import * as types from '../constants/ActionTypes'

describe('action', () => {
    it('should create an action to add a notebook', () => {

        const notebook = {
            title : 'homework',
            description : 'homework notebook'
        }
        const expectedAction = {
            type : types.CREATE_NOTEBOOK_SUCCESS,
            notebook
        }
        expect(actions.createNotebookSuccess(notebook)).toEqual(expectedAction)
    })

    it('fetch notebook by id', () => {
        const notebook = {
            id : "1"
        }
        const expectedFetchAction = {
            type : types.FETCH_NOTEBOOK_BY_ID_SUCCESS,
            notebook
        }

        expect(actions.fetchNotebookByIdSuccess(notebook)).toEqual(expectedFetchAction)
    })

    it('update note', () => {
        const note = {
            id : "1",
            motebookId : "1",
            title: "hklee",
            content: "test"
        }
        const expectedFetchAction = {
            type : types.UPDATE_NOTE_SUCCESS,
            note
        }

        expect(actions.updateNoteSuccess(note)).toEqual(expectedFetchAction)
    })
})
