import React from 'react';
import FormListItem from "./FormListItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const FormList = (props) => {
  return <div className="content-wrapper content-wrapper-form-list">
    <div className="control-buttons">
      <button className="btn btn-success" onClick={() => props.addNewFormAction()}>Add Form <FontAwesomeIcon icon={faPlusCircle}/></button>
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
        {props.forms.map((element, index) => {
          return <FormListItem
              key={index}
              formConfigIndex={index}
              form={element}
              deleteFormConfigAction={props.deleteFormConfigAction}
              editFormConfigAction={props.editFormConfigAction}
          />
        })}
        </tbody>
      </table>
    </div>
  </div>;
};

export default FormList;