const ADD_DESIGNED_FORM = 'ADD_DESIGNED_FORM';
const SAVE_DESIGNED_FORM = 'SAVE_DESIGNED_FORM';
const DELETE_DESIGNED_FORM = 'DELETE_DESIGNED_FORM';

const initialState = {

};

export default function designForm(state = initialState, action) {
  switch (action.type) {
    case ADD_DESIGNED_FORM: {
      return state;
    }
    case SAVE_DESIGNED_FORM: {
      return state;
    }
    case DELETE_DESIGNED_FORM: {
      return state;
    }
    default: {
      return state
    }
  }

}
