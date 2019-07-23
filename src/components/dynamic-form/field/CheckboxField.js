import React from 'react';
import PropTypes from 'prop-types';

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

CheckboxField.propTypes = {
  fieldId: PropTypes.string,
  fieldName: PropTypes.string,
  fieldTitle: PropTypes.string,
  fieldReadOnly: PropTypes.bool,
  fieldDisabled: PropTypes.bool,
  fieldPlaceholder: PropTypes.string
};

CheckboxField.defaultProps = {
  fieldId: "",
  fieldName: "",
  fieldTitle: "",
  fieldReadOnly: "",
  fieldDisabled: "",
  fieldPlaceholder: ""
};

export default CheckboxField;