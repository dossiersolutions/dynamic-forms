import React from 'react';
import FormListItem from "./FormListItem";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const FormList = (props) => {

  const {
    forms,
    onAddNewFormPageAction,
    onDeleteFormConfigAction,
    onEditFormConfigPageAction
  } = {...props};

  return <div className="content-wrapper content-wrapper-form-list">
    <div className="control-buttons">
      <button className="btn btn-success" onClick={() => onAddNewFormPageAction()}>Add Form <FontAwesomeIcon icon={faPlusCircle}/></button>
    </div>
    <div className="form-list">

      <table className="table table-dark table-striped ">
        <thead className="thead-dark">
        <tr>
          <th>Form name</th>
          <th>Form type</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {forms.map((element, index) => {
          return <FormListItem
              key={index}
              formConfigIndex={index}
              form={element}
              onDeleteFormConfigAction={onDeleteFormConfigAction}
              onEditFormConfigPageAction={onEditFormConfigPageAction}
          />
        })}
        </tbody>
      </table>
    </div>
  </div>;
};

FormList.propTypes = {
  onAddNewFormPageAction: PropTypes.func,
  onDeleteFormConfigAction: PropTypes.func,
  onEditFormConfigPageAction: PropTypes.func
};

export default FormList;