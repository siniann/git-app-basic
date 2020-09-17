import React from 'react';
import { shallow } from 'enzyme';
import GitComponents from './GitComponents';

describe('Git components', () => {
  let mockFunction;
  let gitComponentShallow;
  beforeEach(() => {
    jest.clearAllMocks();
    mockFunction = jest.fn();
    gitComponentShallow = shallow(<GitComponents />);
  });

  it('should render properly ', () => {
    expect(gitComponentShallow).toMatchSnapshot();
  });
});
