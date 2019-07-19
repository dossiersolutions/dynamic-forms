import React, { Component } from 'react';
import { actions } from "../../store";
import { connect } from "react-redux";
import Field from "./Field";
import { confirmAlert } from "react-confirm-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import FieldSetEditPopup from "../../components/dynamic-form/FieldSetEditPopup";
import FieldEditPopup from "../../components/dynamic-form/FieldEditPopup";


class FieldSet extends Component {

  onSubmitEditField = (event) => {
    event.preventDefault();
    if (parseInt(event.target.fieldIndex.value) === -1) {
      const { formConfigIndex, fieldSetIndex } = {...this.props};
      this.props.onAddFieldAction(formConfigIndex, fieldSetIndex);
      this.props.onClearFieldConfigMatrixAction();
    }
    this.props.onHidePopupWindowAction();
  };

  onChangeFieldAction = (fieldIndex, fieldName, fieldValue) => {
    const { formConfigIndex, fieldSetIndex } = {...this.props};
    this.props.onEditFieldAction(formConfigIndex, fieldSetIndex, fieldIndex, fieldName, fieldValue);
  };

  showEditFieldPopupWindow = (event, field, fieldIndex, isEditFieldMode) => {
    event.preventDefault();
    const title = isEditFieldMode ? 'Edit field' : 'Add field';
    let content;
    if (isEditFieldMode) {
      content = <FieldEditPopup
          field={field}
          fieldIndex={fieldIndex}
          onSubmitEditField={this.onSubmitEditField}
          changeFieldAction={this.onChangeFieldAction}
      />;
    } else {
      content = <FieldEditPopup
          fieldIndex={-1}
          onSubmitEditField={this.onSubmitEditField}
          changeFieldAction={this.onChangeFieldAction}
      />;
    }
    this.props.onShowPopupWindowAction(title, content);
  };

  onSubmitEditFieldSet = (event) => {
    event.preventDefault();
    const { value, name } = {...event.target.title};
    const { formConfigIndex, fieldSetIndex } = {...this.props };
    this.props.onFieldSetChangedAction(formConfigIndex, fieldSetIndex, value, name);
    this.props.onHidePopupWindowAction();
  };

  showEditFieldSetPopupWindow = (event) => {
    event.preventDefault();
    const title = 'Edit field set';
    const content = <FieldSetEditPopup onSubmitEditFieldSet={this.onSubmitEditFieldSet} fieldSet={this.props.fieldSet} />;
    this.props.onShowPopupWindowAction(title, content);
  };

  confirmDeleteFieldSet = (event) => {
    event.preventDefault();
    const { formConfigIndex, fieldSetIndex } = {...this.props};
    confirmAlert({
      title: 'Are you sure ??',
      message: 'Are you sure you want to delete this field set ??',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteFieldSetAction(formConfigIndex, fieldSetIndex)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  deleteFieldSetAction = (formConfigIndex, fieldSetIndex) => {
    this.props.onDeleteFieldSetAction(formConfigIndex, fieldSetIndex);
    this.props.onEditFormConfigPage(this.props.formConfigIndex);
  };

  render() {
    return <fieldset className="form-group">
      <legend className="field-set-legend" >
        <strong>{this.props.fieldSet.title}</strong>
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
      {this.props.fieldSet.fields.map((field, index) => {
        return <Field
            key={index}
            formConfigIndex={this.props.formConfigIndex}
            fieldSetIndex={this.props.fieldSetIndex}
            fieldIndex={index}
            field={field}
            showEditFieldPopupWindow={this.showEditFieldPopupWindow}
        />
      })}

      <div className="form-group text-right">
        <button type="button" className="btn btn-primary" onClick={(event) => this.showEditFieldPopupWindow(event)}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add field
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
  return {
    onEditFormConfigPage(formConfigIndex) {
      dispatch(actions.editFormConfigPage(formConfigIndex));
    },
    onDeleteFieldSetAction(formConfigIndex, fieldSetIndex) {
      dispatch(actions.deleteFieldSetAction(formConfigIndex, fieldSetIndex));
    },
    onShowPopupWindowAction(popupWindowTitle, popupWindowContent) {
      dispatch(actions.showPopupWindowAction(popupWindowTitle, popupWindowContent));
    },
    onHidePopupWindowAction() {
      dispatch(actions.hidePopupWindowAction());
    },
    onFieldSetChangedAction(formConfigIndex, fieldSetIndex, fieldValue, fieldName) {
      dispatch(actions.editFieldSetAction({formConfigIndex, fieldSetIndex, fieldValue, fieldName}));
    },
    onEditFieldAction(formConfigIndex, fieldSetIndex, fieldIndex, fieldName, fieldValue) {
      dispatch(actions.editFieldAction(formConfigIndex, fieldSetIndex, fieldIndex, fieldName, fieldValue));
    },
    onAddFieldAction(formConfigIndex, fieldSetIndex) {
      dispatch(actions.addFieldAction(formConfigIndex, fieldSetIndex));
    },
    onClearFieldConfigMatrixAction() {
      dispatch(actions.clearFieldConfigMatrixAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSet);
