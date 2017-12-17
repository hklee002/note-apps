import * as type from '../constants/ActionTypes';
import axios from 'axios';

const notebookApiUrl = 'http://localhost:5000/notebook';
const noteApiUrl = 'http://localhost:5000/note';

export const fetchNotebookSuccess = (notebooks) => {
    return {
        type: type.FETCH_NOTEBOOK_SUCCESS,
        notebooks
    }
};

export const createNotebookSuccess = (notebook) => {
    return {
        type: type.CREATE_NOTEBOOK_SUCCESS,
        notebook
    }
};

export const updateNotebookSuccess = (notebook) => {
    return {
        type : type.UPDATE_NOTEBOOK_SUCCESS,
        notebook
    }
}

export const removeNotebookSuccess = (notebook) => {
    return {
        type : type.REMOVE_NOTEBOOK_SUCCESS,
        notebook
    }
}

export const fetchNotebookByIdSuccess = (notebook) => {
    return {
        type: type.FETCH_NOTEBOOK_BY_ID_SUCCESS,
        notebook
    }
};

export const fetchNotebooks = () => {
    return (dispatch) => {
        return axios.get(notebookApiUrl)
        .then(response => {
            dispatch(fetchNotebookSuccess(response.data))
        })
        .catch(error => {
            throw(error);
        });
    }
}

export const createNotebook = ( notebook ) => {
    return (dispatch) => {
        return axios.post(notebookApiUrl, notebook)
        .then(response => {
            dispatch(createNotebookSuccess(response.data))
        })
        .catch(error => {
            throw(error);
        })
    }
}

export const updateNotebook = ( notebook ) => {
    return (dispatch) => {
        return axios.post(notebookApiUrl, notebook)
        .then(response => {
            dispatch(updateNotebookSuccess(response.data))
        })
        .catch(error => {
            throw(error);
        })
    }
}

export const fetchNotebookById = ( notebookId ) => {
    return (dispatch) => {
        return axios.get(notebookApiUrl + '?id=' + notebookId )
        .then(response => {
            dispatch(fetchNotebookByIdSuccess(response.data))
        })
        .catch(error => {
            throw(error);
        })
    }
}

export const removeNotebook = ( notebook ) => {
    return (dispatch) => {
        return axios.put(notebookApiUrl, notebook )
        .then( response => {
            console.log('removeNotebook:',response.data);
            dispatch(removeNotebookSuccess(response.data))
        })
        .catch(error => {
            throw(error);
        })
    }
}

export const fetchNoteSuccess = (notes) => {
    return {
        type: type.FETCH_NOTE_SUCCESS,
        notes
    }
}

export const fetchNoteByIdSuccess = (note) => {
    return {
        type : type.FETCH_NOTE_BY_ID_SUCCESS,
        note
    }
}

export const createNoteSuccess = (note) => {
    return {
        type : type.CREATE_NOTE_SUCCESS,
        note
    }
}

export const updateNoteSuccess = (note) => {
    return {
        type : type.UPDATE_NOTE_SUCCESS,
        note
    }
}

export const removeNoteSuccess = (note) => {
    return {
        type : type.REMOVE_NOTE_SUCCESS,
        note
    }
}

export const fetchNotes = (id, sortType) => {
    return (dispatch) => {
        return axios.get(noteApiUrl + '/?notebookId=' + id + '&sort=' + (sortType || ''))
        .then(response => {
            dispatch(fetchNoteSuccess(response.data))
        })
        .catch(error => {
            throw(error)
        });
    }
}

export const fetchNote = (id) => {
    return (dispatch) => {
        return axios.get(noteApiUrl + '/?noteId=' + id)
        .then(response => {
            dispatch(fetchNoteByIdSuccess(response.data))
        })
        .catch(error => {
            throw(error)
        })
    }
}

export const createNote = (note) => {
    return (dispatch) => {
        return axios.post(noteApiUrl,note)
        .then(response => {
            dispatch(createNoteSuccess(response.data))
        })
        .catch(error => {
            throw(error)
        })
    }
}

export const updateNote = (note) => {
    return (dispatch) => {
        return axios.post(noteApiUrl, note)
        .then(response => {
            dispatch(updateNoteSuccess(response.data))
        })
        .catch(error => {
            throw(error)
        })
    }
}

export const removeNote = (note) => {
    return (dispatch) => {
        return axios.put(noteApiUrl, note)
        .then(response => {
            dispatch(removeNoteSuccess(response.data))
        })
        .catch(error => {
            throw(error)
        })
    }
}
