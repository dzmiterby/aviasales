import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

import classes from './Ticket.module.scss';

function Ticket({ price, carrier, segments }) {
  return (
    <li className={classes.Ticket}>
      <div className={classes['ticket__container']}>
        <div className={classes['ticket__header']}>
          <p className={classes['header__cost']}>{price.toLocaleString('ru-RU')} Р </p>
          <p className={classes['header__emblem']}>
            <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
          </p>
        </div>
        <ul className={classes['ticket__flight']}>
          {segments.map((item) => (
            <li className={classes['flight__elem']} key={uuid()}>
              <div className={classes['flight__timepoint']}>
                <span>
                  {item.origin} – {item.destination}
                </span>
                <span>
                  {String(new Date(item.date).getHours()).padStart(2, '0')}:
                  {String(new Date(item.date).getMinutes()).padStart(2, '0')} –{' '}
                  {String(new Date(Date.parse(item.date) + item.duration * 60 * 1000).getHours()).padStart(2, '0')}:
                  {String(new Date(Date.parse(item.date) + item.duration * 60 * 1000).getMinutes()).padStart(2, '0')}
                </span>
              </div>
              <div className={classes['flight__duration']}>
                <span>В пути</span>
                <span>
                  {String(Math.floor(item.duration / 60)).padStart(2, '0')}ч{' '}
                  {String(Math.floor(item.duration % 60)).padStart(2, '0')}м
                </span>
              </div>
              <div className={classes['flight__transfer']}>
                {item.stops.length ? (
                  item.stops.length === 1 ? (
                    <span>1 пересадка</span>
                  ) : (
                    <span>{item.stops.length} пересадки</span>
                  )
                ) : (
                  <span>0 пересадок</span>
                )}
                <span>{item.stops.join(', ')}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

Ticket.defaultProps = {
  price: 0,
  carrier: '',
  segments: [],
};
Ticket.propTypes = {
  price: PropTypes.number,
  carrier: PropTypes.string,
  segments: PropTypes.array,
};

export default Ticket;
