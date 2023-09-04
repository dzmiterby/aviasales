import React from 'react';
import { useDispatch } from 'react-redux';

import { switchByTabs } from '../../store/storeaviasales';

import classes from './Tabs.module.scss';

function Tabs() {
  const dispatch = useDispatch();

  function changeTab(event) {
    let buttons = document.querySelectorAll('[data-b="tabs"]');
    for (let elem of buttons) {
      elem.setAttribute('class', `${classes['nav__but']}`);
    }
    event.target.setAttribute('class', `${classes['nav__but-active']}`);
    dispatch(switchByTabs(event.target.dataset.t));
  }
  return (
    <div className={classes.Tabs}>
      <div className={classes['nav__container']}>
        <button data-b="tabs" data-t="cheap" className={classes['nav__but-active']} onClick={(e) => changeTab(e)}>
          Самый дешевый
        </button>
        <button
          data-b="tabs"
          data-t="fast"
          className={classes['nav__but']}
          style={{ borderLeft: '1px solid #DFE5EC', borderRight: '1px solid #DFE5EC' }}
          onClick={(e) => changeTab(e)}
        >
          Самый быстрый
        </button>
        <button data-b="tabs" data-t="optimal" className={classes['nav__but']} onClick={(e) => changeTab(e)}>
          Оптимальный
        </button>
      </div>
    </div>
  );
}

export default Tabs;
