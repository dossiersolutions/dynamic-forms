import React from 'react';

function FieldEditPopup(props) {
    return <div>

      <div>
        <strong style={{color: 'red', fontSize: '20px'}}>!!!! UNDER CONSTRUCTION !!!!</strong>
      </div>

      <form onSubmit={(event) => props.onSubmitEditField(event)}>

        <input
            type="hidden"
            className="form-control"
            id="fieldIndex"
            name="fieldIndex"
            defaultValue={props.field && props.fieldIndex ? props.fieldIndex : '-1'}
        />

        <div className="form-group required">
          <label className="control-label" htmlFor="title"><strong>Field title</strong></label>
          <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              defaultValue={props.field && props.field.title ? props.field.title : ''}
              placeholder="Enter field title..."
              required
          />
        </div>

        <div className="form-group required">
          <label className="control-label" htmlFor="fieldType">
            <strong>Field title</strong>
          </label>
          <select
              className="form-control"
              defaultValue={props.field && props.field.fieldType ? props.field.fieldType : ''}
              disabled={props.fieldIndex !== -1}
          >
            <option value=''>--</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="radio">Radio</option>
            <option value="select">Select</option>
            <option value="textarea">Textarea</option>
          </select>
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="placeholder"><strong>Placeholder</strong></label>
          <input
              type="text"
              className="form-control"
              id="placeholder"
              name="placeholder"
              defaultValue={props.field && props.field.placeholder ? props.field.placeholder : ''}
              placeholder="Enter field placeholder..."
          />
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="defaultValue"><strong>Default value</strong></label>
          <input
              type="text"
              className="form-control"
              id="defaultValue"
              name="placeholder"
              defaultValue={props.field && props.field.defaultValue ? props.field.defaultValue : ''}
              placeholder="Enter field default value..."
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success">Save</button>
        </div>

      </form>
    </div>;
}

export default FieldEditPopup;