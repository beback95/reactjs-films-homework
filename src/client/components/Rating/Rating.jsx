import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Icon from 'components/Icon/Icon';

import styles from './Rating.scss';

const Rating = ({ value }) => {
  const activeStars = Math.round(value % 5);

  return (
    <div className={ styles.rating }>
      <div className={ styles.stars }>
        { Array.from({ length: 5 }, (v, k) => (
           <Icon
            key={ k }
            name='star'
            className={ classNames(
              styles.star,
              { [styles.active]: k + 1 <= activeStars },
            ) }
          />
        )) }
      </div>
      <div className={ styles.valueWrap }>
        <div className={ styles.value }>
          { (value % 5).toPrecision(2) }
        </div>
      </div>
    </div>
  );
};

Rating.defaultProps = {
  value: 0,
};

Rating.propTypes = {
  value: PropTypes.number,
};

export default Rating;
