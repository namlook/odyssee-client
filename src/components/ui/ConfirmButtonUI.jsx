
import React, { PropTypes } from 'react';

/* eslint-disable react/no-set-state */

export class ConfirmButtonUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = { confirmState: false, timer: null };
  }

  clicked(event) {
    event.preventDefault();
    if (this.state.confirmState) {
      clearTimeout(this.state.timer);
      this.setState({ confirmState: false, timer: null });
      this.props.onConfirm();
    } else {
      const timer = setTimeout(() => {
        this.setState({ timer: null, confirmState: false });
      }, 1500);
      this.setState({ confirmState: true, timer });
    }
  }

  render() {
    const {
      color = '',
      confirmLabel = '',
      displayLabel = '',
      confirmIcon = '',
      displayIcon = '',
      className = '',
      displayClassName = '',
      confirmClassName = '',
    } = this.props;

    const buttonClassName = this.state.confirmState
      ? `${className} ${confirmClassName}`
      : `${className} ${displayClassName}`;

    const label = this.state.confirmState ? confirmLabel : displayLabel;
    const icon = this.state.confirmState ? confirmIcon : displayIcon;
    return (
      <a className={buttonClassName} onClick={(e) => this.clicked(e)}>
        {icon ? <i className={`ui ${icon} ${color} icon`}></i> : null}
        {label}
      </a>
    );
  }
}

ConfirmButtonUI.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  confirmClassName: PropTypes.string,
  displayClassName: PropTypes.string,
  displayLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  displayIcon: PropTypes.string,
  confirmIcon: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmButtonUI;
