import {initialState} from "../initial-state";
import Immutable from "immutable";
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
} from '../actions/action-types';

export function reducer(state = initialState, action) {
  let im_state = Immutable.Map(state);
  switch (action.type) {
    case BACK_TO_LIST_PAGE_ACTION: {
      return im_state.set('mode', 'list')
          .set('showPopup', false)
          .set('popupWindowTitle', '')
          .set('popupWindowContent', '');
    }
    case ADD_NEW_FORM_CONFIG_PAGE_ACTION: {
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
      let { popupWindowTitle, popupWindowContent } = {...action.payload};
      return im_state.set('showPopup', true)
          .set('popupWindowTitle', popupWindowTitle)
          .set('popupWindowContent', popupWindowContent);
    }
    case HIDE_POPUP_WINDOW_ACTION: {
      return im_state.set('showPopup', false)
          .set('popupWindowTitle', '')
          .set('popupWindowContent', '');
    }
    case EDIT_FORM_CONFIG_PAGE_ACTION: {
      let { formConfigIndex } = {...action.payload};
      return im_state.set('mode', 'edit')
          .set('showPopup', false)
          .set('popupWindowTitle', '')
          .set('popupWindowContent', '')
          .set('formConfigIndex', formConfigIndex);
    }
    case DELETE_FORM_CONFIG_ACTION: {
      let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
      let { formConfigIndex } = {...action.payload};
      return im_state.set('mode', 'list')
          .set('showPopup', false)
          .set('popupWindowTitle', '')
          .set('popupWindowContent', '')
          .set('formConfigs', im_formConfigs.delete(formConfigIndex));
    }
    case ADD_FORM_ACTION: {
      let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
      let { formConfig } = {...action.payload};
      return im_state.set('mode', 'list')
          .set('formConfigs', im_formConfigs.push(formConfig));
    }
    case EDIT_FORM_ACTION: {
      let { formConfigIndex, fieldName, fieldValue } = {...action.payload};
      if (formConfigIndex === -1) {
        let im_formConfigMatrix = Immutable.Map(im_state.get('formConfigMatrix'));
        im_formConfigMatrix = im_formConfigMatrix.set(fieldName, fieldValue);
        im_state = im_state.set('formConfigMatrix', im_formConfigMatrix.toJS());
      } else {
        let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
        im_formConfigs = im_formConfigs.setIn([formConfigIndex, fieldName], fieldValue);
        im_state = im_state.set('formConfigs', im_formConfigs);
      }
      return im_state;
    }
    case ADD_FORM_FIELDSET_ACTION: {
      const { formConfigIndex, fieldsetTitle}  = {...action.payload},
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
      const { formConfigIndex, fieldSetIndex } = {...action.payload};
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
      const { formConfigIndex, fieldSetIndex, fieldValue, fieldName } = {...action.payload};
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
      const { formConfigIndex, fieldSetIndex, fieldIndex } = {...action.payload};
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
      const { formConfigIndex, fieldSetIndex } = {...action.payload},
          fieldConfigMatrix = Immutable.Map(im_state.get('fieldConfigMatrix'));
      if (formConfigIndex === -1) {
        let im_formConfigMatrix = Immutable.Map(im_state.get('formConfigMatrix'));
        im_formConfigMatrix = im_formConfigMatrix.updateIn(['fieldSets', fieldSetIndex, 'fields'], fields => Immutable.List(fields).push(fieldConfigMatrix.toJS()));
        im_state = im_state.set('formConfigMatrix', im_formConfigMatrix.toJS());
      } else {
        let im_formConfigs = Immutable.List(im_state.get('formConfigs'));
        im_formConfigs = im_formConfigs.updateIn([formConfigIndex, 'fieldSets', fieldSetIndex, 'fields'], fields => Immutable.List(fields).push(fieldConfigMatrix.toJS()));
        im_state = im_state.set('formConfigs', im_formConfigs);
      }
      return im_state;
    }
    case EDIT_FORM_FIELD_ACTION: {
      const { formConfigIndex, fieldSetIndex, fieldIndex, fieldValue, fieldName } = {...action.payload};
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