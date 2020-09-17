import React from 'react';
import { mount } from 'enzyme';
import VersionSelector from './VersionSelector';

const oneEntryFileHistoryMock = [
  {
    description: 'Create Document',
    fileCopyLink: '/Users/macbook/Desktop/watchfolder/ttttttttt.txt',
    timestamp: 'Date: 2019-10-22 Time: 11:4:31',
    version: 1,
  },
];

const twoEntryFileHistoryMock = [
  ...oneEntryFileHistoryMock,
  {
    description: 'Add line',
    fileCopyLink: '/Users/macbook/Desktop/watchfolder/ttttttttt.txt',
    timestamp: 'Date: 2019-10-22 Time: 11:4:39',
    version: 2,
  },
];

const threeEntryFileHistoryMock = [
  ...twoEntryFileHistoryMock,
  {
    description: 'Add another line',
    fileCopyLink: '/Users/macbook/Desktop/watchfolder/ttttttttt.txt',
    timestamp: 'Date: 2019-10-22 Time: 11:4:41',
    version: 3,
  },
];

describe('VersionSelector component', () => {
  const selectHandleChange = jest.fn();
  const restoreVersion = jest.fn();

  beforeEach(() => {
    selectHandleChange.mockClear();
    restoreVersion.mockClear();
  });

  it.each([
    [oneEntryFileHistoryMock],
    [twoEntryFileHistoryMock],
    [threeEntryFileHistoryMock],
  ])('should render properly', (fileHistoryMock) => {
    const versionSelector = mount(
      <VersionSelector
        fileHistory={fileHistoryMock}
        latestVersion={2}
        dropdownChange={selectHandleChange}
        restoreVersion={restoreVersion}
      />,
    );

    expect(versionSelector).toBeDefined();
  });

  it('should not call restoreVersion when reset button is clicked', () => {
    const versionSelector = mount(
      <VersionSelector
        fileHistory={oneEntryFileHistoryMock}
        latestVersion={2}
        dropdownChange={selectHandleChange}
        restoreVersion={restoreVersion}
      />,
    );

    versionSelector.find('#btn-restore').at(1).simulate('click');

    expect(selectHandleChange).toHaveBeenCalled();
  });

  it('should call selectHandleChange when dropdown is changed', () => {
    const versionSelector = mount(
      <VersionSelector
        fileHistory={oneEntryFileHistoryMock}
        latestVersion={2}
        dropdownChange={selectHandleChange}
        restoreVersion={restoreVersion}
      />,
    );

    versionSelector.find('#versionDropdown').simulate('change', { target: { value: '1' } });

    expect(selectHandleChange).toHaveBeenCalled();
  });
});
