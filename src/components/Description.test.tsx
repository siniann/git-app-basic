import React from 'react';
import { shallow } from 'enzyme';
import Description from './Description';

describe('Description component', () => {
  const mockFunction = jest.fn();

  let descriptionInstance;
  let descriptionShallow;

  beforeEach(() => {
    jest.clearAllMocks();
    descriptionShallow = shallow(<Description saveDescription={mockFunction} />);
  });

  it('should render properly ', () => {
    expect(descriptionShallow).toMatchSnapshot();
  });

  it('should render properly ', () => {
    descriptionShallow.setState({ descriptionError: 'Some error message' });

    expect(descriptionShallow.state().descriptionError).toEqual('Some error message');
    expect(descriptionShallow.state().description).toEqual('');
    expect(descriptionShallow).toMatchSnapshot();
  });

  it('should not render description error div when no description error is passes ', () => {
    descriptionShallow.setState({
      description: 'Add some valid desc',
      descriptionError: 'Error message: some invalid desc',
    });

    expect(descriptionShallow).toBeDefined();
    expect(descriptionShallow.find('#description-error')).toHaveLength(1);
  });

  it('should render description error div ', () => {
    descriptionShallow.setState({
      description: 'invalid decsc',
      descriptionError: 'some error',
    });
    expect(descriptionShallow.find('#description-error')).toHaveLength(1);
  });
  it('should click the button', () => {
    descriptionShallow.find('#btn-saveDescription').simulate('click');

    expect(mockFunction).toHaveBeenCalled();
  });
  it('should handle changes in description', () => {
    descriptionShallow.find('#change-description').simulate('change', { target: { value: 'Hello Annika' } });
    expect(descriptionShallow.state().descriptionError).toEqual('Description should start with either Add,Correct,Change,Remove or Delete');
  });
  it('should handle changes in description', () => {
    descriptionShallow.find('#change-description').simulate('change', { target: { value: 'Add valid desc' } });
    expect(descriptionShallow.state().descriptionError).toEqual('');
  });

  it('should handle length in description', () => {
    descriptionShallow.find('#change-description').simulate('change', { target: { value: 'Add valid desc valid desc valid desc valid desc valid desc valid desc valid desc valid desc valid desc valid desc valid desc valid desc' } });
    expect(descriptionShallow.state().descriptionError).toEqual('Length should not exceed 100 characters');
  });
});
