import React from 'react';
import PropTypes from "prop-types";

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

RadioField.propTypes = {
  fieldId: PropTypes.string,
  fieldName: PropTypes.string,
  fieldTitle: PropTypes.string,
  fieldReadOnly: PropTypes.bool,
  fieldDisabled: PropTypes.bool,
  fieldPlaceholder: PropTypes.string
};

RadioField.defaultProps = {
  fieldId: "",
  fieldName: "",
  fieldTitle: "",
  fieldReadOnly: "",
  fieldDisabled: "",
  fieldPlaceholder: ""
};

export default RadioField;