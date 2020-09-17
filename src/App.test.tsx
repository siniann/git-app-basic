import React from 'react';
import { createRender } from '@material-ui/core/test-utils';
import App from './App';

describe('App', () => {
  it('should match the snapshot', () => {
    const render = createRender();
    const wrapper = render(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
