import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

const PopupWindow = (props) => {

  let [showPopup, setShowPopupWindow] = React.useState(props.showPopup);
  let [title, setTitle] = React.useState(props.title);
  let [content, setContent] = React.useState(props.content);

  React.useEffect(() => {
    setShowPopupWindow(props.showPopup);
    setTitle(props.title);
    setContent(props.content);
  }, [props]);

  const closePopupWindow = () => {
    setShowPopupWindow(false);
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
                    <button className="inline-action-button" onClick={(event) => {event.preventDefault(); closePopupWindow();}}>
                      <FontAwesomeIcon icon={faTimes} className="action-icon icon-red"/>
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

PopupWindow.propTypes = {
  showPopup: PropTypes.bool.isRequired,
  title: PropTypes.string,
  content: PropTypes.any
};

PopupWindow.defaultProps = {
  showPopup: false
};

export default PopupWindow;
