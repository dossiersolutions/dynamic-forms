import React from 'react';
import PropTypes from "prop-types";

function FieldEditPopup(props) {

  const onChangeAction = (event) => {
    const { onChangeFieldAction } = {...props};
    onChangeFieldAction(props.fieldIndex, event.target.name, event.target.value);
  };

  const {
    field: {
      type,
      title,
      placeholder,
      defaultValue
    },
    fieldIndex,
    onSubmitEditField
  } = {...props};

  return <div>
    <form onSubmit={(event) => onSubmitEditField(event)}>

      <input
          type="hidden"
          className="form-control"
          id="fieldIndex"
          name="fieldIndex"
          defaultValue={fieldIndex !== undefined ? parseInt(fieldIndex) : -1}
      />

      <div className="form-group required">
        <label className="control-label" htmlFor="title"><strong>Field title</strong></label>
        <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            defaultValue={title}
            placeholder="Enter field title..."
            required
            onChange={onChangeAction}
        />
      </div>

      <div className="form-group required">
        <label className="control-label" htmlFor="fieldType">
          <strong>Field title</strong>
        </label>
        <select
            className="form-control"
            id="type"
            name="type"
            defaultValue={type}
            disabled={fieldIndex !== -1}
            onChange={onChangeAction}
        >
          <option value="">--</option>
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="radio">Radio</option>
          <option value="select">Select</option>
          <option value="checkbox">Checkbox</option>
          <option value="textarea">Textarea</option>
        </select>
      </div>

      <div className={['text', 'email', 'textarea'].indexOf(type) !== -1 ? 'form-group' : 'form-group d-none'}>
        <label className="control-label" htmlFor="placeholder"><strong>Placeholder</strong></label>
        <input
            type="text"
            className="form-control"
            id="placeholder"
            name="placeholder"
            defaultValue={placeholder}
            placeholder="Enter field placeholder..."
            onChange={onChangeAction}
        />
      </div>

      <div className={['text', 'email', 'textarea'].indexOf(type) !== -1 ? 'form-group' : 'form-group d-none'}>
        <label className="control-label" htmlFor="defaultValue"><strong>Default value</strong></label>
        <input
            type="text"
            className="form-control"
            id="defaultValue"
            name="defaultValue"
            defaultValue={defaultValue}
            placeholder="Enter field default value..."
            onChange={onChangeAction}
        />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-success">Save</button>
      </div>

    </form>
  </div>;
}

FieldEditPopup.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string
  }),
  fieldIndex: PropTypes.number,
  onSubmitEditField: PropTypes.func,
  onChangeFieldAction: PropTypes.func
};

FieldEditPopup.defaultProps = {
  field: {
    type: "",
    title: "",
    placeholder: "",
    defaultValue: "",
  },
  fieldIndex: null
};

export default FieldEditPopup;