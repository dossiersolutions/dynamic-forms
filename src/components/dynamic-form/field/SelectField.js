import React from 'react';

const SelectField = (props) => {

  const {
    fieldId,
    fieldName,
    fieldTitle,
    fieldOptions,
    fieldDisabled,
  } = {...props};

  return <React.Fragment>
    <label className="control-label" htmlFor={fieldId}><strong>{fieldTitle}</strong></label>
    <select
        className="form-control"
        id={fieldId}
        name={fieldName}
        disabled={fieldDisabled}
    >
      {fieldOptions.options && fieldOptions.options.map((option, index) => {
        return <option key={index} value={option.value}>{option.caption}</option>
      })}
    </select>
  </React.Fragment>;

};

export default SelectField;