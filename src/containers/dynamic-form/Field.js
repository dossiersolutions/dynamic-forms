import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { confirmAlert } from "react-confirm-alert";
import { doDeleteFieldAction } from "../../actions";
import TextField from "../../components/dynamic-form/field/TextField";
import EmailField from "../../components/dynamic-form/field/EmailField";
import TextareaField from "../../components/dynamic-form/field/TextareaField";
import CheckboxField from "../../components/dynamic-form/field/CheckboxField";
import RadioField from "../../components/dynamic-form/field/RadioField";
import SelectField from "../../components/dynamic-form/field/SelectField";


class Field extends Component {

  confirmDeleteField = (event) => {

    const {
      fieldIndex,
      fieldSetIndex,
      formConfigIndex,
      doDeleteFieldAction
    } = {...this.props};

    console.log({
      formConfigIndex,
      fieldSetIndex,
      fieldIndex
    });

    event.preventDefault();
    confirmAlert({
      title: 'Are you sure ??',
      message: 'Are you sure you want to delete this field ??',
      buttons: [
        {
          label: 'Yes',
          onClick: () => doDeleteFieldAction(formConfigIndex, fieldSetIndex, fieldIndex)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };


  render() {

    const {
      field,
      field: {
        id: fieldId,
        name: fieldName,
        type: fieldType,
        title: fieldTitle,
        options: fieldOptions,
        placeholder: fieldPlaceholder
      },
      fieldIndex,
      fieldReadOnly,
      fieldDisabled,
      onShowEditFieldPopupWindow
    } = {...this.props};

    let fieldTemplate;
    switch (fieldType) {
      case 'select': {
        fieldTemplate = <SelectField
            fieldId={fieldId}
            fieldName={fieldName}
            fieldTitle={fieldTitle}
            fieldOptions={fieldOptions}
            fieldReadOnly={fieldReadOnly}
            fieldDisabled={fieldDisabled}
            fieldPlaceholder={fieldPlaceholder}
        />;
        break;
      }
      case 'radio': {
        fieldTemplate = <RadioField
            fieldId={fieldId}
            fieldName={fieldName}
            fieldTitle={fieldTitle}
            fieldOptions={fieldOptions}
            fieldReadOnly={fieldReadOnly}
            fieldDisabled={fieldDisabled}
            fieldPlaceholder={fieldPlaceholder}
        />;
        break;
      }
      case 'checkbox': {
        fieldTemplate = <CheckboxField
            fieldId={fieldId}
            fieldName={fieldName}
            fieldTitle={fieldTitle}
            fieldOptions={fieldOptions}
            fieldReadOnly={fieldReadOnly}
            fieldDisabled={fieldDisabled}
            fieldPlaceholder={fieldPlaceholder}
        />;
        break;
      }
      case 'textarea': {
        fieldTemplate = <TextareaField
            fieldId={fieldId}
            fieldName={fieldName}
            fieldTitle={fieldTitle}
            fieldOptions={fieldOptions}
            fieldReadOnly={fieldReadOnly}
            fieldDisabled={fieldDisabled}
            fieldPlaceholder={fieldPlaceholder}
        />;
        break;
      }
      case 'email': {
        fieldTemplate = <EmailField
            fieldId={fieldId}
            fieldName={fieldName}
            fieldTitle={fieldTitle}
            fieldOptions={fieldOptions}
            fieldReadOnly={fieldReadOnly}
            fieldDisabled={fieldDisabled}
            fieldPlaceholder={fieldPlaceholder}
        />;
        break;
      }
      default: {
        fieldTemplate = <TextField
            fieldId={fieldId}
            fieldName={fieldName}
            fieldTitle={fieldTitle}
            fieldOptions={fieldOptions}
            fieldReadOnly={fieldReadOnly}
            fieldDisabled={fieldDisabled}
            fieldPlaceholder={fieldPlaceholder}
        />;
        break;
      }
    }

    return <div className={'form-group form-group-' + fieldType}>
        {fieldTemplate}
        <span className="inline-action-button-wrapper">
            <button className="inline-action-button" onClick={(event) => onShowEditFieldPopupWindow(event, field, fieldIndex, true)}>
              <FontAwesomeIcon icon={faEdit} className="action-icon"/>
            </button>
          </span>
        <span className="inline-action-button-wrapper">
            <button className="inline-action-button" onClick={(event) => this.confirmDeleteField(event)}>
              <FontAwesomeIcon icon={faTrash} className="action-icon icon-red"/>
            </button>
          </span>
      </div>;
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doDeleteFieldAction
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Field);