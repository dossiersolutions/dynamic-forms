import React from 'react';

function FieldSetEditPopup(props) {

  const {
    fieldSet: {
      title
    }
  } = {...props};

  return <div>
    <form onSubmit={(event) => props.onSubmitEditFieldSet(event)}>
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

export default FieldSetEditPopup;