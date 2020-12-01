import React from 'react';
import { Page } from '../enums';
import store from '../store';

function getActiveClass(page: Page, activePage: Page) {
  return `navigation-item ${page === activePage ? 'active' : ''}`;
}

// TODO: Add a small navigation graph at top left that allows navigating back
export default function Header() {
  const [state, update] = store.usePureStore();
  const { activePage } = state;

  return (
    <>
      {
        activePage !== Page.Home &&
        <div className='header'>
          <div className='arrow-back' onClick={() => update({ activePage: Page.Home })}>Back</div>
          <nav>
            <a className='navigation-item' onClick={() => update({ activePage: Page.Home })}>Home</a>
            <a className={getActiveClass(Page.About, activePage)} onClick={() => update({ activePage: Page.About })}>About</a>
            <a className={getActiveClass(Page.Blog, activePage)} onClick={() => update({ activePage: Page.Blog })}>Blog</a>
            <a className={getActiveClass(Page.Projects, activePage)} onClick={() => update({ activePage: Page.Projects })}>Projects</a>
          </nav>
        </div>
      }
    </>
  )
}