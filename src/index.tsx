import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const renderDom = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};
window.onload = renderDom;

export default renderDom;
