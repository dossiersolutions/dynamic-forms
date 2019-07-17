import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actions} from '../store';
import FormList from "../components/list/FormList";
import FormEdit from "../components/dynamic-form/FormEdit";
import FormFill from "../components/FormFill";
import PopupWindow from "./popup/PopupWindow";

class Main extends Component {

  onNewFormConfigSubmit = (event) => {
    event.preventDefault();
    const formConfig = this.props.formConfigMatrix;
    this.props.onAddFormAction(formConfig);
    this.props.onClearFormConfigMatrix();
  };

  onFormConfigSubmit = (event) => {
    event.preventDefault();
    this.props.onClearFormConfigMatrix();
    this.props.onBackToListPage();
  };

  buildAddFormComponent = () => {
    return <FormEdit
        formConfig={this.props.formConfigMatrix}
        formConfigIndex={-1}
        formConfigSubmit={this.onNewFormConfigSubmit.bind(this)}
        backToListAction={this.props.onBackToListPage}
        handleFormChanged={this.props.onEditFormAction}
        addFormFieldSetAction={this.props.onAddFormFieldSetAction}
    />;
  };

  buildEditFormComponent = () => {
    let formConfigs = [...this.props.formConfigs],
        formConfig = formConfigs[this.props.formConfigIndex];
    return <FormEdit
        formConfig={formConfig}
        formConfigIndex={this.props.formConfigIndex}
        formConfigSubmit={this.onFormConfigSubmit.bind(this)}
        backToListAction={this.props.onBackToListPage}
        handleFormChanged={this.props.onEditFormAction}
        addFormFieldSetAction={this.props.onAddFormFieldSetAction}
    />;
  };

  buildFillFormComponent = () =>{
    return <FormFill/>;
  }

  buildListFormComponent = () => {
    return <FormList
        addNewFormAction={this.props.onAddNewFormPage}
        forms={this.props.formConfigs}
        deleteFormConfigAction={this.props.onDeleteFormConfigAction}
        editFormConfigAction={this.props.onEditFormConfigPage}
    />;
  };

  render() {
    let mainPart, pageName;
    switch (this.props.mode) {
      case 'add': {
        pageName = 'Add new form';
        mainPart = this.buildAddFormComponent();
        break;
      }
      case 'edit': {
        pageName = 'Edit form';
        mainPart = this.buildEditFormComponent();
        break;
      }
      case 'fill': {
        pageName = 'Fill form';
        mainPart = this.buildFillFormComponent();
        break;
      }
      default: {
        pageName = 'Created forms';
        mainPart = this.buildListFormComponent();
        break;
      }
    }
    return <React.Fragment>
          <div className="main-container container">
            <nav className="navbar navbar-light bg-light page-name">
              <h2>{pageName}</h2>
            </nav>
            <div className="main-content">{mainPart}</div>
            <PopupWindow
                showPopup={this.props.showPopup}
                title={this.props.popupWindowTitle}
                content={this.props.popupWindowContent}
            />
          </div>
        </React.Fragment>;
  };
}

function mapStateToProps(state) {
  return {
    mode: state.mode,
    showPopup: state.showPopup,
    popupWindowTitle: state.popupWindowTitle,
    popupWindowContent: state.popupWindowContent,
    formConfigIndex: state.formConfigIndex,
    formConfigMatrix: state.formConfigMatrix,
    formConfigs: state.formConfigs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onBackToListPage() {
      dispatch(actions.backToListPage());
    },
    onAddNewFormPage() {
      dispatch(actions.addNewFormPage());
    },
    onClearFormConfigMatrix() {
      dispatch(actions.clearFormConfigMatrix());
    },
    onEditFormConfigPage(formConfigIndex) {
      dispatch(actions.editFormConfigPage(formConfigIndex));
    },
    onDeleteFormConfigAction(formConfigIndex) {
      dispatch(actions.deleteFormConfigAction(formConfigIndex));
    },
    onAddFormAction(formConfig) {
      dispatch(actions.addFormAction(formConfig));
    },
    onEditFormAction(formConfig, fieldValue, fieldName) {
      dispatch(actions.editFormAction(formConfig, fieldValue, fieldName));
    },
    onAddFormFieldSetAction(formConfigIndex, fieldsetTitle) {
      dispatch(actions.addFormFieldSetAction(formConfigIndex, fieldsetTitle));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
