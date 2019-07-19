import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

class FormListItem extends Component {

  confirmDelete = (formConfigIndex) => {
    confirmAlert({
      title: 'Are you sure ??',
      message: 'Are you sure you want to delete this record ??',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.deleteFormConfigAction(formConfigIndex)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  render() {

    const {
      form: {
        formName, formType
      },
      formConfigIndex
    } = {...this.props};
    return <tr>
      <td>{formName}</td>
      <td>{formType}</td>
      <td className="action-col">
        <button className="action-button" onClick={() => this.props.editFormConfigAction(formConfigIndex)}>
          <FontAwesomeIcon icon={faEdit} className="table-icon"/>
        </button>
        <button className="action-button" onClick={() => this.confirmDelete(formConfigIndex)}>
          <FontAwesomeIcon icon={faTrash} className="table-icon table-icon-red"/>
        </button>
      </td>
    </tr>;
  }

}

export default FormListItem;