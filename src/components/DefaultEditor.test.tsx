import { mount } from 'enzyme';
import React from 'react';
import { shell } from 'electron';
import DefaultEditor from './DefaultEditor';

describe('DefaultEditor component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render filepath props ', () => {
    const defaultEditorWrapper = mount(<DefaultEditor
      filepath="some file path"
    />);
    shell.openItem = jest.fn();
    defaultEditorWrapper.find('#btn-openEditor').at(1).simulate('click');
    expect(defaultEditorWrapper).toBeDefined();
    expect(shell.openItem).toHaveBeenCalled();
    expect(defaultEditorWrapper.props().filepath).toEqual('some file path');
  });

  it('should not render default filepath props ', () => {
    const defaultEditorWrapper = mount(<DefaultEditor filepath="No file path available" />);
    defaultEditorWrapper.find('#btn-openEditor').at(1).simulate('click');
    expect(shell.openItem).not.toHaveBeenCalled();
  });

  it('should render no filepath props ', () => {
    const defaultEditorWrapper = mount(<DefaultEditor filepath="" />);
    defaultEditorWrapper.find('#btn-openEditor').at(1).simulate('click');
    expect(shell.openItem).not.toHaveBeenCalled();
  });
});
