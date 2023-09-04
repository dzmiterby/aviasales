import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Space, Alert, Spin, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Ticket from '../Ticket/Ticket';
import { increaseCount } from '../../store/storeaviasales';
import { fetchGetBundleTickets } from '../../serviceTickets/serviceTickets';

import classes from './TicketList.module.scss';

function TicketList() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.avia.count);
  const tickets = useSelector((state) => state.avia.tickets);
  const tab = useSelector((state) => state.avia.tabStatus);
  const filter = useSelector((state) => state.avia.chechStatus);
  const error = useSelector((state) => state.avia.error);
  const isLoaded = useSelector((state) => state.avia.isLoaded);
  const noResult = useSelector((state) => state.avia.noResult);

  if (tab === 'cheap') {
    tickets.sort((a, b) => a.price - b.price);
  } else if (tab === 'fast') {
    tickets.sort(
      (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
    );
  } else if (tab === 'optimal') {
    tickets.sort(
      (a, b) =>
        a.price +
        a.segments[0].duration +
        a.segments[1].duration -
        (b.price + b.segments[0].duration + b.segments[1].duration)
    );
  }

  let filterTickets = tickets;

  if (filter[0] === true) {
    filterTickets = tickets;
  } else if (filter[0] === false && filter[1] === true) {
    filterTickets = tickets.filter(
      (item) => item.segments[0].stops.length === 0 || item.segments[1].stops.length === 0
    );
  } else if (filter[0] === false && filter[1] === false && filter[2] === true) {
    filterTickets = tickets.filter(
      (item) => item.segments[0].stops.length === 1 || item.segments[1].stops.length === 1
    );
  } else if (filter[0] === false && filter[1] === false && filter[2] === false && filter[3] === true) {
    filterTickets = tickets.filter(
      (item) => item.segments[0].stops.length === 2 || item.segments[1].stops.length === 2
    );
  } else if (
    filter[0] === false &&
    filter[1] === false &&
    filter[2] === false &&
    filter[3] === false &&
    filter[4] === true
  ) {
    filterTickets = tickets.filter(
      (item) => item.segments[0].stops.length === 3 || item.segments[1].stops.length === 3
    );
  } else if (
    filter[0] === false &&
    filter[1] === false &&
    filter[2] === false &&
    filter[3] === false &&
    filter[4] === false
  ) {
    filterTickets = [];
  }

  function getMoreTickets() {
    dispatch(increaseCount(5));
  }

  useEffect(() => {
    fetchGetBundleTickets(dispatch);
  }, [dispatch]);

  return (
    <div className={classes.TicketList}>
      {!isLoaded && (
        <Space direction="vertical" style={{ width: '100%', margin: '70px 0 50px' }}>
          <Spin size="large">
            <div className="content" />
          </Spin>
        </Space>
      )}
      {error ? (
        <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }}>
          <Alert
            style={{ width: '50%', margin: '0 auto' }}
            message="Ошибка"
            description="Что-то пошло не так..."
            type="error"
            showIcon
          />
        </Space>
      ) : (
        <>
          {noResult ? (
            <Empty style={{ marginTop: '20px' }} />
          ) : (
            <>
              {filterTickets.length === 0 && isLoaded ? (
                <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }}>
                  <Alert
                    style={{ width: '50%', margin: '0 auto' }}
                    description="Рейсов, подходящих под заданные фильтры, не найдено."
                    type="info"
                    showIcon
                  />
                </Space>
              ) : (
                <ul className={classes['tickets__container']}>
                  {filterTickets
                    .filter((item, index) => index < count)
                    .map((item) => (
                      <Ticket key={uuid()} price={item.price} carrier={item.carrier} segments={item.segments} />
                    ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
      <button className={classes['tickets__but-more']} onClick={getMoreTickets}>
        Показать еще 5 билетов!
      </button>
    </div>
  );
}

export default TicketList;
