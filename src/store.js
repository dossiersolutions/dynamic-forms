import { initialState } from './initial-state';
import Immutable from "immutable";

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
const ADD_FORM_FIELD_ACTION = 'ADD_FORM_FIELD_ACTION';
const EDIT_FORM_FIELD_ACTION = 'EDIT_FORM_FIELD_ACTION';
const CLEAR_FIELD_CONFIG_MATRIX_ACTION = 'CLEAR_FIELD_CONFIG_MATRIX_ACTION';

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
  editFieldAction(formConfigIndex, fieldSetIndex, fieldIndex, fieldName, fieldValue) {
    return {
      type: EDIT_FORM_FIELD_ACTION,
      formConfigIndex,
      fieldSetIndex,
      fieldIndex,
      fieldName,
      fieldValue
    }
  },
  addFieldAction(formConfigIndex, fieldSetIndex) {
    return {
      type: ADD_FORM_FIELD_ACTION,
      formConfigIndex,
      fieldSetIndex
    }
  },
  clearFieldConfigMatrixAction() {
    return {
      type: CLEAR_FIELD_CONFIG_MATRIX_ACTION,
    }
  }
};

export function reducer(state = initialState, action) {
  console.log(action.type);
  let im_state = Immutable.Map(state);
  switch (action.type) {
    case BACK_TO_LIST_PAGE: {
      return im_state.set('mode', 'list')
          .set('showPopup', false)
          .set('popupWindowTitle', '')
          .set('popupWindowContent', '');
    }
    case ADD_NEW_FORM_CONFIG_PAGE: {
      return im_state.set('mode', 'add')
          .set('showPopup', false)
          .set('popupWindowTitle', '')
          .set('popupWindowContent', '');
    }
    case CLEAR_FORM_CONFIG_MATRIX_ACTION: {
      return im_state.set('showPopup', false)
          .set('popupWindowTitle', '')
          .set('popupWindowContent', '')
          .setIn(['formConfigMatrix', 'formName'], '')
          .setIn(['formConfigMatrix', 'formType'], '')
          .setIn(['formConfigMatrix', 'fieldSets'], []);
    }
    case SHOW_POPUP_WINDOW_ACTION: {
      return im_state.set('showPopup', true)
          .set('popupWindowTitle', action.popupWindowTitle)
          .set('popupWindowContent', action.popupWindowContent);
    }
    case HIDE_POPUP_WINDOW_ACTION: {
      return im_state.set('showPopup', false)
          .set('popupWindowTitle', '')
          .set('popupWindowContent', '');
    }
    case EDIT_FORM_CONFIG_PAGE: {
      return im_state.set('mode', 'edit')
          .set('showPopup', false)
          .set('popupWindowTitle', '')
          .set('popupWindowContent', '')
          .set('formConfigIndex', action.formConfigIndex);
    }
    case DELETE_FORM_CONFIG_ACTION: {
      let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
      return im_state.set('mode', 'list')
          .set('showPopup', false)
          .set('popupWindowTitle', '')
          .set('popupWindowContent', '')
          .set('formConfigs', im_formConfigs.delete(action.formConfigIndex));
    }
    case ADD_FORM_ACTION: {
      let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
      return im_state.set('mode', 'list')
          .set('formConfigs', im_formConfigs.push(action.formConfig));
    }
    case EDIT_FORM_ACTION: {
      if (action.formConfigIndex === -1) {
        let im_formConfigMatrix = Immutable.Map(im_state.get('formConfigMatrix'));
        im_formConfigMatrix = im_formConfigMatrix.set(action.fieldName, action.fieldValue);
        im_state = im_state.set('formConfigMatrix', im_formConfigMatrix.toJS());
      } else {
        let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
        im_formConfigs = im_formConfigs.setIn([action.formConfigIndex, action.fieldName], action.fieldValue);
        im_state = im_state.set('formConfigs', im_formConfigs);
      }
      return im_state;
    }
    case ADD_FORM_FIELDSET_ACTION: {
      const formConfigIndex = action.formConfigIndex,
          fieldsetTitle = action.fieldsetTitle,
          newFieldSet = Immutable.Map({'title': fieldsetTitle, 'fields': []});
      if (formConfigIndex === -1) {
        let im_formConfigMatrix = Immutable.Map(im_state.get('formConfigMatrix'));
        im_formConfigMatrix.update('fieldSets', fieldSets => fieldSets.push(newFieldSet));
        im_state = im_state.set('formConfigMatrix', im_formConfigMatrix.toJS());
      } else {
        let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
        im_formConfigs.updateIn([formConfigIndex, 'fieldSets'], fieldSets => fieldSets.push(newFieldSet));
        im_state = im_state.set('formConfigs', im_formConfigs.toJS());
      }
      return im_state;
    }
    case DELETE_FORM_FIELDSET_ACTION: {
      const formConfigIndex = action.formConfigIndex,
          fieldSetIndex = action.fieldSetIndex;
      if (formConfigIndex === -1) {
        let im_formConfigMatrix = Immutable.Map(im_state.get('formConfigMatrix'));
        im_formConfigMatrix = im_formConfigMatrix.update('fieldSets', fieldSets => Immutable.List(fieldSets).delete(fieldSetIndex));
        im_state = im_state.set('formConfigMatrix', im_formConfigMatrix);
      } else {
        let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
        im_formConfigs = im_formConfigs.updateIn([formConfigIndex, 'fieldSets'], fieldSets => Immutable.List(fieldSets).delete(fieldSetIndex));
        im_state = im_state.set('formConfigs', im_formConfigs);
      }
      return im_state;
    }
    case EDIT_FORM_FIELDSET_ACTION: {
      const formConfigIndex = action.formConfigIndex,
          fieldSetIndex = action.fieldSetIndex,
          fieldName = action.fieldName,
          fieldValue = action.fieldValue;
      if (formConfigIndex === -1) {
        let im_formConfigMatrix = Immutable.Map(im_state.get('formConfigMatrix'));
        im_formConfigMatrix = im_formConfigMatrix.setIn(['fieldSets', fieldSetIndex, fieldName], fieldValue);
        im_state = im_state.set('formConfigMatrix', im_formConfigMatrix);
      } else {
        let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
        im_formConfigs = im_formConfigs.setIn([formConfigIndex, 'fieldSets', fieldSetIndex, fieldName], fieldValue);
        im_state = im_state.set('formConfigs', im_formConfigs);
      }
      return im_state;
    }
    case DELETE_FORM_FIELD_ACTION: {
      const formConfigIndex = action.formConfigIndex,
          fieldSetIndex = action.fieldSetIndex,
          fieldIndex = action.fieldIndex;
      if (formConfigIndex === -1) {
        let im_formConfigMatrix = Immutable.Map(im_state.get('formConfigMatrix'));
        im_formConfigMatrix = im_formConfigMatrix.updateIn(['fieldSets', fieldSetIndex, 'fields'], fields => Immutable.List(fields).delete(fieldIndex));
        im_state = im_state.set('formConfigMatrix', im_formConfigMatrix);
      } else {
        let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
        im_formConfigs = im_formConfigs.updateIn([formConfigIndex, 'fieldSets', fieldSetIndex, 'fields'], fields => Immutable.List(fields).delete(fieldIndex));
        im_state = im_state.set('formConfigs', im_formConfigs);
      }
      return im_state;
    }
    case CLEAR_FIELD_CONFIG_MATRIX_ACTION: {
      return im_state.set('fieldConfigMatrix', {})
          .setIn(['fieldConfigMatrix', 'id'], '')
          .setIn(['fieldConfigMatrix', 'title'], '')
          .setIn(['fieldConfigMatrix', 'fieldName'], '')
          .setIn(['fieldConfigMatrix', 'fieldType'], '')
          .setIn(['fieldConfigMatrix', 'placeholder'], '')
          .setIn(['fieldConfigMatrix', 'defaultValue'], '')
          .setIn(['fieldConfigMatrix', 'options'], {});
    }
    case ADD_FORM_FIELD_ACTION: {
      const formConfigIndex = action.formConfigIndex,
          fieldSetIndex = action.fieldSetIndex,
          fieldConfigMatrix = Immutable.Map(im_state.get('fieldConfigMatrix'));
      if (formConfigIndex === -1) {
        let im_formConfigMatrix = Immutable.Map(im_state.get('formConfigMatrix'));
        im_formConfigMatrix = im_formConfigMatrix.updateIn(['fieldSets', fieldSetIndex, 'fields'], fields => Immutable.List(fields).push(fieldConfigMatrix.toJS()));
        im_state = im_state.set('formConfigMatrix', im_formConfigMatrix);
      } else {
        let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
        im_formConfigs = im_formConfigs.updateIn([formConfigIndex, 'fieldSets', fieldSetIndex, 'fields'], fields => Immutable.List(fields).push(fieldConfigMatrix.toJS()));
        im_state = im_state.set('formConfigs', im_formConfigs);
      }
      return im_state;
    }
    case EDIT_FORM_FIELD_ACTION: {
      const formConfigIndex = action.formConfigIndex,
          fieldSetIndex = action.fieldSetIndex,
          fieldIndex = action.fieldIndex,
          fieldName = action.fieldName,
          fieldValue = action.fieldValue;
      if (fieldIndex === -1) {
        let fieldConfigMatrix = Immutable.Map(im_state.get('fieldConfigMatrix'));
        fieldConfigMatrix = fieldConfigMatrix.set(fieldName, fieldValue);
        im_state = im_state.set('fieldConfigMatrix', fieldConfigMatrix);
      } else {
        if (formConfigIndex === -1) {
          let im_formConfigMatrix = Immutable.Map(im_state.get('formConfigMatrix'));
          im_formConfigMatrix = im_formConfigMatrix.setIn(['fieldSets', fieldSetIndex, 'fields', fieldIndex, fieldName], fieldValue);
          im_state = im_state.set('formConfigMatrix', im_formConfigMatrix);
        } else {
          let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
          im_formConfigs = im_formConfigs.setIn([formConfigIndex, 'fieldSets', fieldSetIndex, 'fields', fieldIndex, fieldName], fieldValue);
          im_state = im_state.set('formConfigs', im_formConfigs);
        }
      }
      return im_state;
    }
    default: {
      return im_state;
    }
  }
}
