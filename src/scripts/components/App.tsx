import React from 'react';
import { Page } from '../enums';
import About from '../pages/About';
import Blog from '../pages/Blog';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import store from '../store';
import Header from './Header';

export default function App() {
  const [state] = store.usePureStore();

  function getPage() {
    switch (state.activePage) {
      case Page.About:
        return <About />;
      case Page.Blog:
        return <Blog />;
      case Page.Projects:
        return <Projects />;
      default:
        return <Home />;
    }
  }
  return (
    <div className='container'>
      <Header />
      {getPage()}
    </div>
  );
}