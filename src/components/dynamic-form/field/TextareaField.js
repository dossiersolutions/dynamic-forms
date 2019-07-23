import React from 'react';
import PropTypes from "prop-types";

const TextareaField = (props) => {

  const {
    fieldId,
    fieldName,
    fieldTitle,
    fieldReadOnly,
    fieldDisabled,
    fieldPlaceholder
  } = {...props};

  return <React.Fragment>
    <label className="control-label" htmlFor={fieldId}><strong>{fieldTitle}</strong></label>
    <textarea
        className="form-control"
        placeholder={fieldPlaceholder}
        id={fieldId}
        name={fieldName}
        readOnly={fieldReadOnly}
        disabled={fieldDisabled}
    />
  </React.Fragment>;

};

TextareaField.propTypes = {
  fieldId: PropTypes.string,
  fieldName: PropTypes.string,
  fieldTitle: PropTypes.string,
  fieldReadOnly: PropTypes.bool,
  fieldDisabled: PropTypes.bool,
  fieldPlaceholder: PropTypes.string
};

TextareaField.defaultProps = {
  fieldId: "",
  fieldName: "",
  fieldTitle: "",
  fieldReadOnly: "",
  fieldDisabled: "",
  fieldPlaceholder: ""
};

export default TextareaField;