import { aT } from '../../globals/constants';

// Fetch single note with id noteId
export function getNote(noteId) {
  return (dispatch) => {
    dispatch({
      type: aT.invest.NOTE_REQUEST,
      payload: noteId
    });
  };
}

// Fetch all notes
export function getNotes() {
  return (dispatch) => {
    dispatch({
      type: aT.invest.NOTES_REQUEST
    });
  };
}
export function getPopulateLoans() {
  return (dispatch) => {
    dispatch({
      type: aT.mock.UPLOAD_LOANS_REQUEST
    });
  };
}
