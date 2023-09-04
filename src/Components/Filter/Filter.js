import React from 'react';
import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { switchByFilter } from '../../store/storeaviasales';

import classes from './Filter.module.scss';

function Filter() {
  const dispatch = useDispatch();
  const chechStatus = useSelector((state) => state.avia.chechStatus);

  function onChange(e) {
    let arrCheck = chechStatus;
    switch (e.target.value) {
      case 'all':
        if (e.target.checked === false) {
          dispatch(switchByFilter([false, false, false, false, false]));
        } else if (e.target.checked === true) {
          dispatch(switchByFilter([true, true, true, true, true]));
        }
        break;
      case '0':
        if (e.target.checked === false) {
          if (arrCheck[0] === true) arrCheck[0] = false;
          arrCheck[1] = false;
        } else if (e.target.checked === true) {
          if (arrCheck[0] === false && arrCheck[2] === true && arrCheck[3] === true && arrCheck[4] === true)
            arrCheck[0] = true;
          arrCheck[1] = true;
        }
        dispatch(switchByFilter(arrCheck));
        break;
      case '1':
        if (e.target.checked === false) {
          if (arrCheck[0] === true) arrCheck[0] = false;
          arrCheck[2] = false;
        } else if (e.target.checked === true) {
          if (arrCheck[0] === false && arrCheck[1] === true && arrCheck[3] === true && arrCheck[4] === true)
            arrCheck[0] = true;
          arrCheck[2] = true;
        }
        dispatch(switchByFilter(arrCheck));
        break;
      case '2':
        if (e.target.checked === false) {
          if (arrCheck[0] === true) arrCheck[0] = false;
          arrCheck[3] = false;
        } else if (e.target.checked === true) {
          if (arrCheck[0] === false && arrCheck[1] === true && arrCheck[2] === true && arrCheck[4] === true)
            arrCheck[0] = true;
          arrCheck[3] = true;
        }
        dispatch(switchByFilter(arrCheck));
        break;
      case '3':
        if (e.target.checked === false) {
          if (arrCheck[0] === true) arrCheck[0] = false;
          arrCheck[4] = false;
        } else if (e.target.checked === true) {
          if (arrCheck[0] === false && arrCheck[1] === true && arrCheck[2] === true && arrCheck[3] === true)
            arrCheck[0] = true;
          arrCheck[4] = true;
        }
        dispatch(switchByFilter(arrCheck));
        break;
      default:
        return dispatch(switchByFilter(arrCheck));
    }
  }

  return (
    <div className={classes.Filter}>
      <div className={classes['panel__container']}>
        <p>Количество пересадок</p>
        <div className={classes['panel__checkboxs']}>
          <Checkbox className={classes['panel__check']} value="all" checked={chechStatus[0]} onChange={onChange}>
            Все
          </Checkbox>
          <Checkbox className={classes['panel__check']} value="0" checked={chechStatus[1]} onChange={onChange}>
            Без пересадок
          </Checkbox>
          <Checkbox className={classes['panel__check']} value="1" checked={chechStatus[2]} onChange={onChange}>
            1 пересадка
          </Checkbox>
          <Checkbox className={classes['panel__check']} value="2" checked={chechStatus[3]} onChange={onChange}>
            2 пересадки
          </Checkbox>
          <Checkbox className={classes['panel__check']} value="3" checked={chechStatus[4]} onChange={onChange}>
            3 пересадки
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

export default Filter;
