import React from 'react';

const CheckboxField = (props) => {

  const {
    fieldId,
    fieldName,
    fieldTitle,
    fieldReadOnly,
    fieldDisabled,
    fieldPlaceholder
  } = {...props};

  return <React.Fragment>
    <label className="control-label" htmlFor={fieldId}>&nbsp;</label>
    <div className="form-control">
      <input
          type="checkbox"
          placeholder={fieldPlaceholder}
          id={fieldId}
          name={fieldName}
          readOnly={fieldReadOnly}
          disabled={fieldDisabled}
      />&nbsp;&nbsp;{fieldTitle}
    </div>
  </React.Fragment>;

};

export default CheckboxField;