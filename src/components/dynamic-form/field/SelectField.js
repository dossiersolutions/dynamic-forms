import React from 'react';
import PropTypes from "prop-types";

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

SelectField.propTypes = {
  fieldId: PropTypes.string,
  fieldName: PropTypes.string,
  fieldTitle: PropTypes.string,
  fieldReadOnly: PropTypes.bool,
  fieldDisabled: PropTypes.bool,
  fieldPlaceholder: PropTypes.string
};

SelectField.defaultProps = {
  fieldId: "",
  fieldName: "",
  fieldTitle: "",
  fieldReadOnly: "",
  fieldDisabled: "",
  fieldPlaceholder: ""
};

export default SelectField;