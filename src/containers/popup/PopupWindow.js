import React, { Component } from 'react';
import {connect} from "react-redux";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {actions} from "../../store";

class PopupWindow extends Component {

  closePopupWindow = (event) => {
    event.preventDefault();
    this.props.onHidePopupWindowAction();
  };

  render() {
    let resultContent = '';
    if (this.props.showPopup) {
      resultContent =
          <React.Fragment>
            <div className="popup-window react-confirm-alert-wrapper">
              <div className="react-confirm-alert-overlay">
                <div className="react-confirm-alert">
                  <div className="react-confirm-alert-header">
                    <div className="react-confirm-alert-header-title">{this.props.popupWindowTitle}</div>
                    <div className="react-confirm-alert-header-buttons">
                      <button className="inline-action-button">
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="action-icon icon-red"
                            onClick={(event) => this.closePopupWindow(event)}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="react-confirm-alert-body">
                    <div>{this.props.popupWindowContent}</div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>;
    }
    return resultContent;
  }
}

function mapStateToProps(state) {
  return {
    showPopup: state.showPopup,
    popupWindowTitle: state.popupWindowTitle,
    popupWindowContent: state.popupWindowContent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onHidePopupWindowAction() {
      dispatch(actions.hidePopupWindowAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupWindow);
