import ReactDOM from 'react-dom';
import React from 'react';
import renderDom from '.';
import App from './App';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

describe('window.onload', () => {
  it('should call ReactDOM.render', () => {
    renderDom();
    expect(ReactDOM.render).toHaveBeenCalledWith(<App />, document.getElementById('root'));
  });
});
