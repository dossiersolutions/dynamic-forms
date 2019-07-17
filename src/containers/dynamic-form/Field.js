import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { actions } from "../../store";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

class Field extends Component {

  confirmDeleteField = (event) => {
    event.preventDefault();
    confirmAlert({
      title: 'Are you sure ??',
      message: 'Are you sure you want to delete this field ??',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.onDeleteFieldAction(this.props.formConfigIndex, this.props.fieldSetIndex, this.props.fieldIndex)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };


  render() {
    return <div className="form-group">

        {/*!!!! UNDER CONSTRUCTION !!!!*/}

        <label className="control-label" htmlFor={this.props.field.id}><strong>{this.props.field.title}</strong></label>
        <input
            type="textarea"
            className="form-control"
            placeholder={this.props.field.placeholder}
            id={this.props.field.id}
            name={this.props.field.name}
            readOnly={true}
            disabled={true}
        />
        <span className="inline-action-button-wrapper">
            <button className="inline-action-button" onClick={
              (event) => this.props.showEditFieldPopupWindow(event, this.props.field, this.props.fieldIndex, true)
            }>
              <FontAwesomeIcon icon={faEdit} className="action-icon"/>
            </button>
          </span>
        <span className="inline-action-button-wrapper">
            <button className="inline-action-button" onClick={(event) => this.confirmDeleteField(event)}>
              <FontAwesomeIcon icon={faTrash} className="action-icon icon-red"/>
            </button>
          </span>
      </div>;
  }

}

function mapStateToProps(state) {
  return {
    mode: state.mode,
    formConfigIndex: state.formConfigIndex,
    formConfigMatrix: state.formConfigMatrix,
    formConfigs: state.formConfigs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDeleteFieldAction(formConfigIndex, fieldSetIndex, fieldIndex) {
      dispatch(actions.deleteFieldAction(formConfigIndex, fieldSetIndex, fieldIndex));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Field);