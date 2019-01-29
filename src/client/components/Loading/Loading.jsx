import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import styles from './Loading.scss';

const Loading = ({ className }) => (
  <div className={ classNames(styles.loading, className) }>
    <div className={ styles.icons }>
      <div className={ styles.icon }>
        <div className={ styles.circle }/>
      </div>
      <div className={ styles.icon }>
        <div className={ styles.circle }/>
      </div>
      <div className={ styles.icon }>
        <div className={ styles.circle }/>
      </div>
    </div>
    <span className={ styles.text }>Loading</span>
  </div>
);

Loading.defaultProps = {
  className: '',
};

Loading.propTypes = {
  className: PropTypes.string,
};

export default Loading;