
import React from 'react';
import { shallow } from 'enzyme';
import { remote } from 'electron';
import chokidar, { FSWatcher } from 'chokidar';
import fse from 'fs-extra';

import FileWatcherComponent from './FileWatcherComponent';
import Description from './Description';
import VersionSelector from './VersionSelector';


const historyEntryArray = [
  {
    description: ' Watching started  ',
    fileCopyLink: './.temp/watchfolderVersions/Version1.txt',
    timestamp: 'Date: 2019-11-8 Time: 13:2:9',
    version: 1,
  },
  {
    description: ' update started  ',
    fileCopyLink: './.temp/watchfolderVersions/Version2.txt',
    timestamp: 'Date: 2019-11-8 Time: 13:2:10',
    version: 2,
  },
  {
    description: ' update started  ',
    fileCopyLink: './.temp/watchfolderVersions/Version3.txt',
    timestamp: 'Date: 2019-11-8 Time: 13:2:11',
    version: 3,
  },
];

const historyEntryMock = {
  description: ' Custom update  ',
  fileCopyLink: '/Users/macbook/Desktop/watchfolderVersions/Version55.txt',
  timestamp: 'Date: 2099-11-8 Time: 13:2:9',
  version: 55,
};

describe('File Watcher', () => {
  const fileWatcherShallow = shallow(<FileWatcherComponent />);
  const fileWatcherInstance = fileWatcherShallow.instance();

  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    console.log = jest.fn();
    jest.mock('fs-extra');
    jest.mock('chokidar');

    jest.mock('chokidar', () => ({
      watch: jest.fn(() => ({
        on: jest.fn(function (this: any) {
          return this;
        }),
      })),
    }));

    fileWatcherInstance.setState({
      latestVersion: 1,
      filepath: '',
      history: [],
      isWatching: false,
      showDescription: false,
      selectedVersion: -1,
    });
  });

  it('should match snapshot', () => {
    expect(fileWatcherShallow).toMatchSnapshot();
    expect(fileWatcherShallow.find(Description).length).toBe(0);
    expect(fileWatcherShallow.find('#actual-file').length).toBe(0);
    expect(fileWatcherShallow.find(VersionSelector).length).toBe(0);
  });

  it('should have no filepath rendered ', () => {
    fileWatcherInstance.setState({ filepath: '' });
    expect(fileWatcherShallow).toMatchSnapshot();
    expect(fileWatcherShallow.find('#actual-file').length).toBe(0);
  });

  it('should have file path rendered', () => {
    fileWatcherInstance.setState({
      filepath: '/Users/macbook/Desktop/gitRepoCopy/Untitled.txt',
    });
    expect(fileWatcherShallow).toMatchSnapshot();
    expect(fileWatcherShallow.find('#actual-file').length).toBe(1);
  });

  it('should have description component rendered', () => {
    fileWatcherInstance.setState({
      showDescription: true,
    });
    expect(fileWatcherShallow).toMatchSnapshot();
    expect(fileWatcherShallow.find(Description).length).toBe(1);
  });


  it('should have versionSelector rendered ', () => {
    fileWatcherInstance.setState({
      history: historyEntryArray,
      isWatching: true,

    });
    expect(fileWatcherShallow.find(VersionSelector).length).toBe(1);
  });


  it('should test onWatcherReady ', async (done) => {
    await fileWatcherInstance.onWatcherReady();
    expect(fileWatcherInstance.state.isWatching).toBeTruthy();
    done();
  });

  it('should test resolved chooseFilepath', async (done) => {
    remote.dialog.showOpenDialog = jest.fn().mockResolvedValue({ filePaths: '/Users/macbook/Desktop/gitRepoCopy/Untitled.txt' });
    await fileWatcherInstance.chooseFilepath();
    expect(remote.dialog.showOpenDialog).toHaveBeenCalled();
    done();
  });


  it('should  test resolved  chooseFilepath', async (done) => {
    remote.dialog.showOpenDialog = jest.fn().mockResolvedValue({ filePaths: [] });
    await fileWatcherInstance.chooseFilepath();

    expect(remote.dialog.showOpenDialog).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('No file path received');
    expect(fileWatcherInstance.state.filepath).toEqual('');
    done();
  });


  it('should  test valid restoreVersion', async (done) => {
    jest.spyOn(fse, 'copySync');
    fileWatcherInstance.setState({
      filepath: '/Users/macbook/Desktop/gitRepocopy/Untitled.txt',
      history: historyEntryArray,
      isWatching: true,
      selectedVersion: 2,
    });
    await fileWatcherInstance.restoreVersion();
    expect(fse.copySync).toHaveBeenCalled();
    done();
  });

  it('should  test invalid restoreVersion', async (done) => {
    jest.spyOn(fse, 'copySync');

    await fileWatcherInstance.restoreVersion();
    done();

    expect(window.alert).toHaveBeenCalledWith('Please choose a version to restore!');
    expect(fse.copySync).not.toHaveBeenCalled();
  });


  it('should test startWatcher with no filepath ', async (done) => {
    await fileWatcherInstance.startWatcher();
    expect(window.alert).toHaveBeenCalledWith('No filepath available');
    done();
  });

  it('should test startWatcher with filepath ', async (done) => {
    fileWatcherInstance.setState({
      filepath: '/Users/macbook/Desktop/gitRepocopy/Untitled.txt',
      isWatching: false,
    });
    fse.readFileSync = jest.fn();
    jest.spyOn(fileWatcherInstance, 'addNewEntry');

    await fileWatcherInstance.startWatcher();
    done();

    expect(fileWatcherInstance.state.filepath).toEqual('/Users/macbook/Desktop/gitRepocopy/Untitled.txt');
  });


  it('should test saveDescription with valid description ', () => {
    fileWatcherInstance.setState({
      filepath: '/Users/macbook/Desktop/gitRepocopy/Untitled.txt',
      history: historyEntryArray,
      isWatching: true,
      showDescription: true,
      latestVersion: 3,

    });
    jest.spyOn(fileWatcherInstance, 'addNewEntry');
    fileWatcherInstance.saveDescription('Add valid des');
    expect(fileWatcherInstance.addNewEntry).toHaveBeenCalled();
    expect(fileWatcherInstance.state.showDescription).toEqual(false);
  });


  it('should test dropdownChange with valid input ', () => {
    fileWatcherInstance.dropdownChange(4);

    expect(fileWatcherInstance.state.selectedVersion).toEqual(4);
  });

  it('should test filepathHandle with event input', () => {
    const eventMock = {
      target: { value: 'some file path' },
    };
    fileWatcherInstance.filepathHandle(eventMock);

    expect(fileWatcherInstance.state.filepath).toBe('some file path');
  });


  it('should test resolved addNewEntry with valid input historyEntry ', async (done) => {
    fileWatcherInstance.setState({
      history: historyEntryArray,
      isWatching: true,
      latestVersion: 3,

    });
    fse.copy = jest.fn().mockResolvedValue({});
    await fileWatcherInstance.addNewEntry(historyEntryMock).then(() => {
      expect(console.log).toHaveBeenCalledWith('added a new entry!');
      expect(fileWatcherInstance.state.latestVersion).toBe(4);
    });

    done();
  });

  it('should test addNewEntry rejected promise ', async (done) => {
    fse.copy = jest.fn().mockRejectedValue({ message: 'error' });
    fileWatcherInstance.setState({
      history: historyEntryArray,
      isWatching: true,
      latestVersion: 3,

    });
    await fileWatcherInstance.addNewEntry(historyEntryMock).then(() => {
      expect(fileWatcherInstance.state.latestVersion).toBe(3);
    });
    done();
  });
});
