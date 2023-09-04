import React from 'react';

import Filter from '../Filter/Filter';
import Tabs from '../Tabs/Tabs';
import TicketList from '../TicketList/TicketList';

import classes from './App.module.scss';
import logo from './logo.svg';

function App() {
  return (
    <section className={classes.App}>
      <div className={classes['main']}>
        <div className={classes['main__logo']}>
          <img src={logo} alt="logo" />
        </div>
        <div className={classes['main_container']}>
          <aside className={classes['main__panel']}>
            <Filter />
          </aside>
          <nav className={classes['main__nav']}>
            <Tabs />
          </nav>
          <div className={classes['main__tickets']}>
            <TicketList />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
