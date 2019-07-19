import React from 'react';

const RadioField = (props) => {

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
          type="radio"
          placeholder={fieldPlaceholder}
          id={fieldId}
          name={fieldName}
          readOnly={fieldReadOnly}
          disabled={fieldDisabled}
      />&nbsp;&nbsp;{fieldTitle}
    </div>
  </React.Fragment>;

};

export default RadioField;