import { initialState } from './initial-state';

const BACK_TO_LIST_PAGE = 'BACK_TO_LIST_PAGE';
const ADD_NEW_FORM_CONFIG_PAGE = 'ADD_NEW_FORM_CONFIG_PAGE';
const EDIT_FORM_CONFIG_PAGE = 'EDIT_FORM_CONFIG_PAGE';

const SHOW_POPUP_WINDOW_ACTION = 'SHOW_POPUP_WINDOW_ACTION';
const HIDE_POPUP_WINDOW_ACTION = 'HIDE_POPUP_WINDOW_ACTION';

const DELETE_FORM_CONFIG_ACTION = 'DELETE_FORM_ACTION';

const ADD_FORM_ACTION = 'ADD_FORM_ACTION';
const EDIT_FORM_ACTION = 'EDIT_FORM_ACTION';

const ADD_FORM_FIELDSET_ACTION = 'ADD_FORM_FIELDSET_ACTION';
const CLEAR_FORM_CONFIG_MATRIX_ACTION = 'CLEAR_FORM_CONFIG_MATRIX_ACTION';

const DELETE_FORM_FIELDSET_ACTION = 'DELETE_FORM_FIELDSET_ACTION';
const EDIT_FORM_FIELDSET_ACTION = 'EDIT_FORM_FIELDSET_ACTION';

const DELETE_FORM_FIELD_ACTION = 'DELETE_FORM_FIELD_ACTION';
const EDIT_FORM_FIELD_ACTION = 'EDIT_FORM_FIELD_ACTION';

export const actions = {
  backToListPage() {
    return {
      type: BACK_TO_LIST_PAGE
    }
  },
  addNewFormPage() {
    return {
      type: ADD_NEW_FORM_CONFIG_PAGE
    }
  },
  clearFormConfigMatrix() {
    return {
      type: CLEAR_FORM_CONFIG_MATRIX_ACTION
    }
  },
  showPopupWindowAction(popupWindowTitle, popupWindowContent) {
    return {
      type: SHOW_POPUP_WINDOW_ACTION,
      popupWindowTitle,
      popupWindowContent
    }
  },
  hidePopupWindowAction() {
    return {
      type: HIDE_POPUP_WINDOW_ACTION,
    }
  },
  deleteFormConfigAction(formConfigIndex) {
    return {
      type: DELETE_FORM_CONFIG_ACTION,
      formConfigIndex
    }
  },
  editFormConfigPage(formConfigIndex) {
    return {
      type: EDIT_FORM_CONFIG_PAGE,
      formConfigIndex
    }
  },
  addFormAction(formConfig) {
    return {
      type: ADD_FORM_ACTION,
      formConfig
    }
  },
  editFormAction(formConfigIndex, fieldValue, fieldName) {
    return {
      type: EDIT_FORM_ACTION,
      formConfigIndex,
      fieldValue,
      fieldName
    }
  },
  addFormFieldSetAction(formConfigIndex, fieldsetTitle) {
    return {
      type: ADD_FORM_FIELDSET_ACTION,
      formConfigIndex,
      fieldsetTitle
    }
  },
  deleteFieldSetAction(formConfigIndex, fieldSetIndex) {
    return {
      type: DELETE_FORM_FIELDSET_ACTION,
      formConfigIndex,
      fieldSetIndex
    }
  },
  editFieldSetAction({ formConfigIndex, fieldSetIndex, fieldName, fieldValue }) {
    return {
      type: EDIT_FORM_FIELDSET_ACTION,
      formConfigIndex,
      fieldSetIndex,
      fieldName,
      fieldValue
    }
  },
  deleteFieldAction(formConfigIndex, fieldSetIndex, fieldIndex) {
    return {
      type: DELETE_FORM_FIELD_ACTION,
      formConfigIndex,
      fieldSetIndex,
      fieldIndex
    }
  },
  editFieldAction({ formConfigIndex, fieldSetIndex, fieldIndex, fieldName, fieldValue }) {
    return {
      type: EDIT_FORM_FIELD_ACTION,
      formConfigIndex,
      fieldSetIndex,
      fieldIndex,
      fieldName,
      fieldValue
    }
  }
};


/* @TODO Try with immutable.js where is applicable */
export function reducer(state = initialState, action) {
  let resultState;
  switch (action.type) {
    case BACK_TO_LIST_PAGE: {
      resultState = {
        ...state,
        'mode': 'list'
      };
      break;
    }
    case ADD_NEW_FORM_CONFIG_PAGE: {
      resultState = {
        ...state,
        'mode': 'add'
      };
      break;
    }
    case CLEAR_FORM_CONFIG_MATRIX_ACTION: {
      const formConfigMatrix = {...state.formConfigMatrix};
      formConfigMatrix.formName = '';
      formConfigMatrix.formType = '';
      formConfigMatrix.fieldSets = [];
      resultState = {
        ...state,
        'formConfigMatrix': formConfigMatrix
      };
      break;
    }
    case SHOW_POPUP_WINDOW_ACTION: {
      resultState = {
        ...state,
        'showPopup': true,
        'popupWindowTitle' : action.popupWindowTitle,
        'popupWindowContent' : action.popupWindowContent
      };
      break;
    }
    case HIDE_POPUP_WINDOW_ACTION: {
      resultState = {
        ...state,
        'showPopup': false,
        'popupWindowTitle' : '',
        'popupWindowContent' : ''
      };
      break;
    }
    case EDIT_FORM_CONFIG_PAGE: {
      resultState = {
        ...state,
        'mode': 'edit',
        'formConfigIndex' : action.formConfigIndex
      };
      break;
    }
    case DELETE_FORM_CONFIG_ACTION: {
      const formConfigs = [...state.formConfigs];
      formConfigs.splice(action.formConfigIndex, 1);
      resultState = {
        ...state,
        'mode': 'list',
        'showPopup': true,
        'formConfigs': formConfigs
      };
      break;
    }
    case ADD_FORM_ACTION: {
      resultState = {
        ...state,
        'mode': 'list',
        'formConfigs': [...state.formConfigs, action.formConfig]
      };
      break;
    }
    case EDIT_FORM_ACTION: {
      const formConfigs = [...state.formConfigs],
          formConfigMatrix = {...state.formConfigMatrix};
      if (action.formConfigIndex === -1) {
        formConfigMatrix[action.fieldName] = action.fieldValue;
      } else {
        formConfigs[action.formConfigIndex][action.fieldName] = action.fieldValue;
      }
      resultState = {
        ...state,
        'formConfigMatrix': formConfigMatrix,
        'formConfigs': formConfigs
      };
      break;
    }
    case ADD_FORM_FIELDSET_ACTION: {
      const formConfigIndex = action.formConfigIndex,
          fieldsetTitle = action.fieldsetTitle;
      let formConfigs = [...state.formConfigs],
          formConfigMatrix = {...state.formConfigMatrix},
        newFieldSet = {
          'title': fieldsetTitle,
          'fields': []
        };
      if (formConfigIndex === -1) {
        formConfigMatrix.fieldSets.push(newFieldSet);
      } else {
        formConfigs[formConfigIndex].fieldSets.push(newFieldSet);
      }
      resultState = {
        ...state,
        'formConfigs': formConfigs,
        'formConfigMatrix': formConfigMatrix
      };
      break;
    }
    case DELETE_FORM_FIELDSET_ACTION: {
      /* @TODO Try with immutable.js */
      const /*{ fromJS } = require('immutable'),*/
          formConfigIndex = action.formConfigIndex,
          fieldSetIndex = action.fieldSetIndex,
          // formConfigs = fromJS(state.formConfigs),
          // formConfigMatrix = fromJS(state.formConfigMatrix);
          formConfigs = [...state.formConfigs],
          formConfigMatrix = {...state.formConfigMatrix};
      if (formConfigIndex === -1) {
        formConfigMatrix.fieldSets.splice(fieldSetIndex, 1);
        // formConfigMatrix.updateIn(['fieldSets'], fieldSets => fieldSets.splice(fieldSetIndex, 1));
      } else {
        formConfigs[formConfigIndex].fieldSets.splice(fieldSetIndex, 1);
        // formConfigs.updateIn([formConfigIndex, 'fieldSets'], fieldSets => fieldSets.splice(fieldSetIndex, 1));
      }
      resultState = {
        ...state,
        'formConfigs': formConfigs,
        'formConfigMatrix': formConfigMatrix
      };
      break;
    }
    case EDIT_FORM_FIELDSET_ACTION: {
      const formConfigIndex = action.formConfigIndex,
          fieldSetIndex = action.fieldSetIndex,
          fieldName = action.fieldName,
          fieldValue = action.fieldValue,
          formConfigs = [...state.formConfigs],
          formConfigMatrix = {...state.formConfigMatrix};
      if (formConfigIndex === -1) {
        formConfigMatrix.fieldSets[fieldSetIndex][fieldName] = fieldValue;
      } else {
        formConfigs[formConfigIndex].fieldSets[fieldSetIndex][fieldName] = fieldValue;
      }
      resultState = {
        ...state,
        'formConfigs': formConfigs,
        'formConfigMatrix': formConfigMatrix
      };
      break;
    }
    case DELETE_FORM_FIELD_ACTION: {
      const formConfigIndex = action.formConfigIndex,
          fieldSetIndex = action.fieldSetIndex,
          fieldIndex = action.fieldIndex,
          formConfigs = [...state.formConfigs],
          formConfigMatrix = {...state.formConfigMatrix};
      if (formConfigIndex === -1) {
        formConfigMatrix.fieldSets[fieldSetIndex].fields.splice(fieldIndex, 1);
      } else {
        formConfigs[formConfigIndex].fieldSets[fieldSetIndex].fields.splice(fieldIndex, 1);
      }
      resultState = {
        ...state,
        'formConfigs': formConfigs,
        'formConfigMatrix': formConfigMatrix
      };
      break;
    }
    default: {
      resultState = state;
      break;
    }
  }
  return resultState;
}
