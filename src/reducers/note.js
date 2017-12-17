export const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_NOTE_SUCCESS':
        return action.notes;
    case 'FETCH_NOTE_BY_ID_SUCCESS':
        return action.note;
    case 'CREATE_NOTE_SUCCESS':
        return [
            ...state,
            Object.assign({}, action.note)
        ];
    case 'REMOVE_NOTE_SUCCESS':
        return [
            ...state,
            Object.assign({}, action.note)
        ]
    default:
        return state;
  }
}
