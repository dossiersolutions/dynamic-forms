import React from 'react';
import PropTypes from "prop-types";

function FieldSetEditPopup(props) {

  const {
    fieldSet: {
      title
    },
    onSubmitEditFieldSet
  } = {...props};

  return <div>
    <form onSubmit={(event) => onSubmitEditFieldSet(event)}>
      <div className="form-group required">
        <label className="control-label" htmlFor="title"><strong>Field set title</strong></label>
        <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            defaultValue={title}
            placeholder="Enter field set title..."
            required
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-success">Save</button>
      </div>
    </form>
  </div>;
}

FieldSetEditPopup.propTypes = {
  field: PropTypes.shape({
    title: PropTypes.string
  }),
  onSubmitEditFieldSet: PropTypes.func
};

FieldSetEditPopup.defaultProps = {
  fieldSet: {
    title: ""
  }
};

export default FieldSetEditPopup;