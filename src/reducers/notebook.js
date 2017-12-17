export const notebooksReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_NOTEBOOK_SUCCESS':
        return [
            ...state,
            Object.assign({}, action.notebook)
        ];
    case 'UPDATE_NOTEBOOK_SUCCESS':
        return [
            ...state,
            Object.assign({}, action.notebook)
        ];
    case 'FETCH_NOTEBOOK_SUCCESS':
        return action.notebooks;
    case 'REMOVE_NOTEBOOK_SUCCESS':
        return [
            ...state,
            Object.assign({}, action.notebook)
        ];
    default:
        return state;
  }
};

export const notebookReducer = (state = [], action) => {
    switch ( action.type ) {
        case 'FETCH_NOTEBOOK_BY_ID_SUCCESS':
            return action.notebook;
        default:
            return state;
    }
};
