import {
  BACK_TO_LIST_PAGE_ACTION,
  ADD_NEW_FORM_CONFIG_PAGE_ACTION,
  CLEAR_FORM_CONFIG_MATRIX_ACTION,
  SHOW_POPUP_WINDOW_ACTION,
  HIDE_POPUP_WINDOW_ACTION,
  DELETE_FORM_CONFIG_ACTION,
  EDIT_FORM_CONFIG_PAGE_ACTION,
  ADD_FORM_ACTION,
  EDIT_FORM_ACTION,
  ADD_FORM_FIELDSET_ACTION,
  DELETE_FORM_FIELDSET_ACTION,
  EDIT_FORM_FIELDSET_ACTION,
  DELETE_FORM_FIELD_ACTION,
  EDIT_FORM_FIELD_ACTION,
  ADD_FORM_FIELD_ACTION,
  CLEAR_FIELD_CONFIG_MATRIX_ACTION
} from './action-types';

export const doBackToListPageAction = () => {
  return {
    type: BACK_TO_LIST_PAGE_ACTION
  }
};

export const doAddNewFormPageAction = () => {
  return {
    type: ADD_NEW_FORM_CONFIG_PAGE_ACTION
  }
};

export const doClearFormConfigMatrixAction = () => {
  return {
    type: CLEAR_FORM_CONFIG_MATRIX_ACTION
  }
};

export const doShowPopupWindowAction = (popupWindowTitle, popupWindowContent) => {
  return {
    type: SHOW_POPUP_WINDOW_ACTION,
    payload: {
      popupWindowTitle,
      popupWindowContent
    }
  }
};

export const doHidePopupWindowAction = () => {
  return {
    type: HIDE_POPUP_WINDOW_ACTION,
  }
};

export const doDeleteFormConfigAction = (formConfigIndex) => {
  return {
    type: DELETE_FORM_CONFIG_ACTION,
    payload: {
      formConfigIndex
    }
  }
};

export const doEditFormConfigPageAction = (formConfigIndex) => {
  return {
    type: EDIT_FORM_CONFIG_PAGE_ACTION,
    payload: {
      formConfigIndex
    }
  }
};

export const doAddFormAction = (formConfig) => {
  return {
    type: ADD_FORM_ACTION,
    payload: {
      formConfig
    }
  }
};

export const doEditFormAction = (formConfigIndex, fieldValue, fieldName) => {
  return {
    type: EDIT_FORM_ACTION,
    payload: {
      formConfigIndex,
      fieldValue,
      fieldName
    }
  }
};

export const doAddFormFieldSetAction = (formConfigIndex, fieldsetTitle) => {
  return {
    type: ADD_FORM_FIELDSET_ACTION,
    payload: {
      formConfigIndex,
      fieldsetTitle
    }
  }
};

export const doDeleteFieldSetAction = (formConfigIndex, fieldSetIndex) => {
  return {
    type: DELETE_FORM_FIELDSET_ACTION,
    payload: {
      formConfigIndex,
      fieldSetIndex
    }
  }
};

export const doEditFieldSetAction = (formConfigIndex, fieldSetIndex, fieldName, fieldValue) => {
  return {
    type: EDIT_FORM_FIELDSET_ACTION,
    payload: {
      formConfigIndex,
      fieldSetIndex,
      fieldName,
      fieldValue
    }
  }
};

export const doDeleteFieldAction = (formConfigIndex, fieldSetIndex, fieldIndex) => {
  return {
    type: DELETE_FORM_FIELD_ACTION,
    payload: {
      formConfigIndex,
      fieldSetIndex,
      fieldIndex
    }
  }
};

export const doEditFieldAction = (formConfigIndex, fieldSetIndex, fieldIndex, fieldName, fieldValue) => {
  return {
    type: EDIT_FORM_FIELD_ACTION,
    payload: {
      formConfigIndex,
      fieldSetIndex,
      fieldIndex,
      fieldName,
      fieldValue
    }
  }
};

export const doAddFieldAction = (formConfigIndex, fieldSetIndex) => {
  return {
    type: ADD_FORM_FIELD_ACTION,
    payload: {
      formConfigIndex,
      fieldSetIndex
    }
  }
};

export const doClearFieldConfigMatrixAction = () => {
  return {
    type: CLEAR_FIELD_CONFIG_MATRIX_ACTION,
  }
};