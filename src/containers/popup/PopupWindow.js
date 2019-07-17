import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const PopupWindow = (props) => {

  let [showPopup, setShowPopup] = React.useState(props.showPopup);
  let [title, setTitle] = React.useState(props.title);
  let [content, setContent] = React.useState(props.content);

  React.useEffect(() => {
    setShowPopup(props.showPopup);
    setTitle(props.title);
    setContent(props.content);
  }, [props]);

  const closePopupWindow = () => {
    setShowPopup(false);
    setTitle('');
    setContent('');
  };

  let resultContent = <div>&nbsp;</div>;
  if (showPopup) {
      resultContent =
          <div className="popup-window react-confirm-alert-wrapper">
            <div className="react-confirm-alert-overlay">
              <div className="react-confirm-alert">
                <div className="react-confirm-alert-header">
                  <div className="react-confirm-alert-header-title">{title}</div>
                  <div className="react-confirm-alert-header-buttons">
                    <button className="inline-action-button">
                      <FontAwesomeIcon
                          icon={faTimes}
                          className="action-icon icon-red"
                          onClick={(event) => {
                            event.preventDefault();
                            closePopupWindow();
                          }}
                      />
                    </button>
                  </div>
                </div>
                <div className="react-confirm-alert-body">
                  <div>{content}</div>
                </div>
              </div>
            </div>
          </div>;
  }
  return resultContent;
};

export default PopupWindow;
