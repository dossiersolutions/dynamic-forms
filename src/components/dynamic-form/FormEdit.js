import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import FieldSet from "../../containers/dynamic-form/FieldSet";

const FormEdit = (props) => {

  const {
    formConfig: {
      formName,
      formType,
      fieldSets
    },
    formConfigIndex
  } = {...props};

  return <div className="content-wrapper content-wrapper-dynamic-form content-wrapper-edit-form">
    <div className="control-buttons">
      <button className="btn btn btn-secondary" onClick={props.backToListAction}>
        <FontAwesomeIcon icon={faArrowLeft}/> BACK TO LIST
      </button>
    </div>

    <form onSubmit={props.formConfigSubmit}>
      <div className="form-group required">
        <label className="control-label" htmlFor="formName"><strong>Form name</strong></label>
        <input
            type="text"
            className="form-control required"
            id="formName"
            name="formName"
            value={formName}
            onChange={(event) => props.handleFormChanged(formConfigIndex, event.target.value, event.target.name)}
            placeholder="Enter form name..."
            required
        />
      </div>
      <div className="form-group">
        <label className="control-label" htmlFor="formType"><strong>Form type</strong></label>
        <input
            type="text"
            className="form-control"
            id="formType"
            name="formType"
            value={formType}
            onChange={(event) => props.handleFormChanged(formConfigIndex, event.target.value, event.target.name)}
            placeholder="Enter form type..."
        />
      </div>

      <fieldset className="dynamic-form-wrapper">

        <legend>Form config</legend>

        {fieldSets.map((fieldSet, index) => {
          return <FieldSet
              key={index}
              fieldSetIndex={index}
              fieldSet={fieldSet}
          />
        })}

        <div className="form-group text-right">
          <button
              type="button"
              className="btn btn-primary"
              onClick={() => props.addFormFieldSetAction(formConfigIndex, 'FIELD SET TITLE')}
          >
            <FontAwesomeIcon icon={faPlusCircle}/> Add fieldset
          </button>
        </div>

      </fieldset>

      <div className="form-group">
        <button type="submit" className="btn btn-success">Submit</button>
      </div>
    </form>
  </div>;

};

export default FormEdit;