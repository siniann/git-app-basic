import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Header from './Header.component';

describe('Header', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(<Header />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should contain the text Git Office', () => {
    const wrapper = mount(<Header />);

    expect(wrapper.text()).toContain('Git Office');
  });
});
