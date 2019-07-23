import React, { Component } from 'react';
import { connect } from "react-redux";
import Field from "./Field";
import {
  doAddFieldAction,
  doEditFieldAction,
  doEditFieldSetAction,
  doDeleteFieldSetAction,
  doHidePopupWindowAction,
  doShowPopupWindowAction,
  doEditFormConfigPageAction,
  doClearFieldConfigMatrixAction
} from "../../actions";
import { bindActionCreators } from "redux";
import { confirmAlert } from "react-confirm-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import FieldSetEditPopup from "../../components/dynamic-form/FieldSetEditPopup";
import FieldEditPopup from "../../components/dynamic-form/FieldEditPopup";

class FieldSet extends Component {

  onSubmitEditField = (event) => {
    const {
      fieldSetIndex,
      formConfigIndex,
      doAddFieldAction,
      doHidePopupWindowAction,
      doClearFieldConfigMatrixAction
    } = {...this.props};
    event.preventDefault();
    if (parseInt(event.target.fieldIndex.value) === -1) {
      doAddFieldAction(formConfigIndex, fieldSetIndex);
      doClearFieldConfigMatrixAction();
    }
    doHidePopupWindowAction();
  };

  onChangeFieldAction = (fieldIndex, fieldName, fieldValue) => {
    const {
      fieldSetIndex,
      formConfigIndex,
      doEditFieldAction
    } = {...this.props};
    doEditFieldAction(formConfigIndex, fieldSetIndex, fieldIndex, fieldName, fieldValue);
  };

  onShowEditFieldPopupWindow = (event, field, fieldIndex, isEditFieldMode) => {
    const { doShowPopupWindowAction } = {...this.props};
    event.preventDefault();
    const title = isEditFieldMode ? 'Edit field' : 'Add field';
    let content;
    if (isEditFieldMode) {
      content = <FieldEditPopup
          field={field}
          fieldIndex={fieldIndex}
          onSubmitEditField={this.onSubmitEditField}
          onChangeFieldAction={this.onChangeFieldAction}
      />;
    }
    else {
      content = <FieldEditPopup
          fieldIndex={-1}
          onSubmitEditField={this.onSubmitEditField}
          onChangeFieldAction={this.onChangeFieldAction}
      />;
    }
    doShowPopupWindowAction(title, content);
  };

  onSubmitEditFieldSet = (event) => {
    event.preventDefault();
    const { value, name } = event.target.title;
    const {
      fieldSetIndex,
      formConfigIndex,
      doEditFieldSetAction,
      doHidePopupWindowAction
    } = {...this.props};
    doEditFieldSetAction(formConfigIndex, fieldSetIndex, name, value);
    doHidePopupWindowAction();
  };

  showEditFieldSetPopupWindow = (event) => {
    event.preventDefault();
    const {
      fieldSet,
      doShowPopupWindowAction
    } = {...this.props};
    const title = 'Edit field set';
    const content = <FieldSetEditPopup onSubmitEditFieldSet={this.onSubmitEditFieldSet} fieldSet={fieldSet}/>;
    doShowPopupWindowAction(title, content);
  };

  confirmDeleteFieldSet = (event) => {
    const {
      fieldSetIndex,
      formConfigIndex
    } = {...this.props};
    event.preventDefault();
    confirmAlert({
      title: 'Are you sure ??',
      message: 'Are you sure you want to delete this field set ??',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.doDeleteFieldSetAction(formConfigIndex, fieldSetIndex)
        },
        {
          label: 'No',
          onClick: () => {
          }
        }
      ]
    });
  };

  doDeleteFieldSetAction = (formConfigIndex, fieldSetIndex) => {
    const {
      doDeleteFieldSetAction,
      doEditFormConfigPageAction
    } = {...this.props};
    doDeleteFieldSetAction(formConfigIndex, fieldSetIndex);
    doEditFormConfigPageAction(formConfigIndex);
  };

  render() {

    const {
      fieldSet: {
        title: fieldSetTitle,
        fields: fieldSetFields
      },
      fieldSetIndex,
      formConfigIndex
    } = {...this.props};

    return <fieldset className="form-group">
      <legend className="field-set-legend">
        <strong>{fieldSetTitle}</strong>
        <span className="inline-action-button-wrapper">
          <button className="inline-action-button" onClick={(event) => this.showEditFieldSetPopupWindow(event)}>
            <FontAwesomeIcon icon={faEdit} className="action-icon"/>
          </button>
        </span>
        <span className="inline-action-button-wrapper">
          <button className="inline-action-button" onClick={(event) => this.confirmDeleteFieldSet(event)}>
            <FontAwesomeIcon icon={faTrash} className="action-icon icon-red"/>
          </button>
        </span>
      </legend>
      {fieldSetFields.map((field, index) => {
        return <Field
            key={index}
            field={field}
            fieldIndex={index}
            fieldSetIndex={fieldSetIndex}
            formConfigIndex={formConfigIndex}
            fieldReadOnly={true}
            fieldDisabled={true}
            onShowEditFieldPopupWindow={this.onShowEditFieldPopupWindow}
        />
      })}

      <div className="form-group text-right">
        <button type="button" className="btn btn-primary" onClick={(event) => this.onShowEditFieldPopupWindow(event)}>
          <FontAwesomeIcon icon={faPlusCircle}/> Add field
        </button>
      </div>

    </fieldset>;
  }

}

function mapStateToProps(state) {
  return {
    mode: state.get('mode'),
    formConfigIndex: state.get('formConfigIndex'),
    formConfigMatrix: state.get('formConfigMatrix'),
    formConfigs: state.get('formConfigs')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doAddFieldAction,
    doEditFieldAction,
    doEditFieldSetAction,
    doDeleteFieldSetAction,
    doShowPopupWindowAction,
    doHidePopupWindowAction,
    doEditFormConfigPageAction,
    doClearFieldConfigMatrixAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSet);
