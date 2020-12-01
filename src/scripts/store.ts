import createStore from 'pure-store/react'
import { Page } from './enums';

interface State {
  activePage: Page;
  height: number;
  width: number;
}

const state: State = {
  activePage: Page.Home,
  height: window.innerHeight,
  width: window.innerWidth,
}

const store = createStore(state);

export default store;