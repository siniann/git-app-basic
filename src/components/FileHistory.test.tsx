import { shallow } from 'enzyme';
import React from 'react';
import FileHistory from './FileHistory';

describe('Description component', () => {
  it('should have props ', () => {
    const fileHistoryWrapper = shallow(<FileHistory
      fileHistory={[{
        description: 'Create Document',
        fileCopyLink: '/Users/macbook/Desktop/watchfolder/Untitled.txt',
        timestamp: 'Date: 2019-10-22 Time: 11:4:31',
        version: 1,
      }]}
    />);

    expect(fileHistoryWrapper).toBeDefined();
    expect(fileHistoryWrapper.props().fileHistory).not.toEqual([]);
    expect(fileHistoryWrapper.find('#div-history').length).toEqual(1);
  });

  it('should not render history if empty array is received in props ', () => {
    const fileHistoryWrapper = shallow(<FileHistory
      fileHistory={[]}
    />);
    expect(fileHistoryWrapper.find('#div-history').length).toEqual(0);
  });
});
