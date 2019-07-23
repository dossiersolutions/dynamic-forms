import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Immutable from "immutable";
import PopupWindow from "./popup/PopupWindow";
import FormList from "../components/list/FormList";
import FormEdit from "../components/dynamic-form/FormEdit";
import FormFill from "../components/FormFill";
import {
  doAddFormAction,
  doEditFormAction,
  doAddNewFormPageAction,
  doBackToListPageAction,
  doAddFormFieldSetAction,
  doDeleteFormConfigAction,
  doEditFormConfigPageAction,
  doClearFormConfigMatrixAction
} from "../actions";


class Main extends Component {

  onNewFormConfigSubmit = (event) => {
    event.preventDefault();
    const {
      formConfigMatrix: formConfig,
      doAddFormAction,
      doClearFormConfigMatrixAction
    } = {...this.props};
    doAddFormAction(formConfig);
    doClearFormConfigMatrixAction();
  };

  onFormConfigSubmit = (event) => {
    event.preventDefault();
    const {
      doBackToListPageAction,
      doClearFormConfigMatrixAction
    } = {...this.props};
    doClearFormConfigMatrixAction();
    doBackToListPageAction();
  };

  buildAddFormComponent = () => {
    const {
      formConfigMatrix,
      doEditFormAction,
      doBackToListPageAction,
      doAddFormFieldSetAction
    } = {...this.props};
    const formConfig = Immutable.Map(formConfigMatrix).toJS();
    return <FormEdit
        formConfig={formConfig}
        formConfigIndex={-1}
        onFormConfigSubmit={this.onNewFormConfigSubmit.bind(this)}
        onBackToListPageAction={doBackToListPageAction}
        onEditFormAction={doEditFormAction}
        onAddFormFieldSetAction={doAddFormFieldSetAction}
    />;
  };

  buildEditFormComponent = () => {
    const {
      formConfigs,
      formConfigIndex,
      doEditFormAction,
      doBackToListPageAction,
      doAddFormFieldSetAction
    } = {...this.props};
    const formConfig = Immutable.List(formConfigs).get(formConfigIndex);
    return <FormEdit
        formConfig={formConfig}
        formConfigIndex={formConfigIndex}
        onFormConfigSubmit={this.onFormConfigSubmit.bind(this)}
        onBackToListPageAction={doBackToListPageAction}
        onEditFormAction={doEditFormAction}
        onAddFormFieldSetAction={doAddFormFieldSetAction}
    />;
  };

  buildFillFormComponent = () =>{
    return <FormFill/>;
  };

  buildListFormComponent = () => {
    const {
      formConfigs,
      doAddNewFormPageAction,
      doDeleteFormConfigAction,
      doEditFormConfigPageAction
    } = {...this.props};
    return <FormList
        forms={formConfigs}
        onAddNewFormPageAction={doAddNewFormPageAction}
        onDeleteFormConfigAction={doDeleteFormConfigAction}
        onEditFormConfigPageAction={doEditFormConfigPageAction}
    />;
  };

  render() {
    const {
      mode,
      showPopup,
      popupWindowTitle,
      popupWindowContent
    } = {...this.props};
    let mainPart, pageName;
    switch (mode) {
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
                showPopup={showPopup}
                title={popupWindowTitle}
                content={popupWindowContent}
            />
          </div>
        </React.Fragment>;
  };
}

function mapStateToProps(state) {
  return {
    mode: state.get('mode'),
    showPopup: state.get('showPopup'),
    popupWindowTitle: state.get('popupWindowTitle'),
    popupWindowContent: state.get('popupWindowContent'),
    formConfigIndex: state.get('formConfigIndex'),
    formConfigMatrix: state.get('formConfigMatrix'),
    formConfigs: state.get('formConfigs')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doBackToListPageAction,
    doAddNewFormPageAction,
    doClearFormConfigMatrixAction,
    doEditFormConfigPageAction,
    doDeleteFormConfigAction,
    doAddFormAction,
    doEditFormAction,
    doAddFormFieldSetAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
