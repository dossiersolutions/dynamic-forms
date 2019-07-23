import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from "prop-types";

class FormListItem extends Component {

  confirmDelete = (formConfigIndex) => {
    const {
      onDeleteFormConfigAction
    } = {...this.props};

    confirmAlert({
      title: 'Are you sure ??',
      message: 'Are you sure you want to delete this record ??',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDeleteFormConfigAction(formConfigIndex)
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
        formName,
        formType
      },
      formConfigIndex,
      onEditFormConfigPageAction
    } = {...this.props};
    return <tr>
      <td>{formName}</td>
      <td>{formType}</td>
      <td className="action-col">
        <button className="action-button" onClick={() => onEditFormConfigPageAction(formConfigIndex)}>
          <FontAwesomeIcon icon={faEdit} className="table-icon"/>
        </button>
        <button className="action-button" onClick={() => this.confirmDelete(formConfigIndex)}>
          <FontAwesomeIcon icon={faTrash} className="table-icon table-icon-red"/>
        </button>
      </td>
    </tr>;
  }

}

FormListItem.propTypes = {
  form: PropTypes.shape({
    formName: PropTypes.string,
    formType: PropTypes.string
  }),
  formConfigIndex: PropTypes.number,
  confirmDelete: PropTypes.func,
  editFormConfigAction: PropTypes.func
};

FormListItem.defaultProps = {
  form: {
    formName: '',
    formType: ''
  },
  formConfigIndex: 0,
};

export default FormListItem;