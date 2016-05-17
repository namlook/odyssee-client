
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
    const className = this.state.confirmState
      ? `${this.props.className} ${this.props.confirmClassName}`
      : `${this.props.className} ${this.props.displayClassName}`;
    const { props } = this;
    return (
      <button className={className} onClick={(e) => this.clicked(e)}>
        {this.state.confirmState ? props.confirmLabel : props.displayLabel}
      </button>
    );
  }
}

ConfirmButtonUI.propTypes = {
  className: PropTypes.string,
  confirmClassName: PropTypes.string,
  displayClassName: PropTypes.string,
  displayLabel: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmButtonUI;
