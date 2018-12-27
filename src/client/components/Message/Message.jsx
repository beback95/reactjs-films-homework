import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import styles from './Message.scss';

export default class Message extends Component {
  componentWillReceiveProps = (newProps, newState) => {
    if (newProps.message.open) {
      setTimeout(() => this.props.closeMessage(), 4000);
    }
  }

  render() {
    const { text, open } = this.props.message;

    return (
      <div
        className={
          classNames(
            styles.message,
            { [styles.open]: open },
          )
        }
        onClick={ this.props.closeMessage }
      >
        { text }
      </div>
    );
  }
}

Message.defaultProps = {
  open: false,
  text: '',
};

Message.propTypes = {
  open: PropTypes.bool,
  text: PropTypes.string,
};
