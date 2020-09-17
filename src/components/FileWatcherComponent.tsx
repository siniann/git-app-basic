import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { remote } from 'electron';
import TextField from '@material-ui/core/TextField';
import chokidar, { FSWatcher } from 'chokidar';
import fse from 'fs-extra';
import DefaultEditor from './DefaultEditor';
import generateTimestamp from '../helper/generateTimestamp';
import Description from './Description';
import VersionSelector from './VersionSelector';
import {
  gitAddAndCommit, isGitRepo,
} from '../helper/gitFunctions';

const path = require('path');

export interface HistoryEntry {
  version: number;
  description: string;
  timestamp: string;
  fileCopyLink: string;
}

interface FileWatcherState {
  latestVersion: number;
  filepath: string;
  history: HistoryEntry[];
  isWatching: boolean;
  showDescription: boolean;
  selectedVersion: number;

}

let watcher: FSWatcher;

class FileWatcherComponent extends Component<{}, FileWatcherState> {
  constructor(props) {
    super(props);
    this.state = {
      latestVersion: 1,
      filepath: '',
      history: [],
      isWatching: false,
      showDescription: false,
      selectedVersion: -1,
    };
  }


  onWatcherReady = () => {
    const { filepath } = this.state;
    if (fse.existsSync('./.temp')) {
      fse.removeSync('./.temp');
    }
    this.addNewEntry({
      version: this.state.latestVersion,
      description: 'Watching started',
      timestamp: generateTimestamp(),
      fileCopyLink: `./.temp/watchfolderVersions/Version${this.state.latestVersion}.txt`,
    });
    gitAddAndCommit(filepath, 'Watching started');
    console.info('Watching for changes, the initial scan completed.');
    this.setState({ isWatching: true, latestVersion: 1 });
  };

  chooseFilepath = () => {
    const openDialogReturnValuePromise = remote.dialog.showOpenDialog({ properties: ['openFile'] });
    openDialogReturnValuePromise
      .then((promiseValue) => {
        if (promiseValue.filePaths[0]) {
          const parent = path.dirname(promiseValue.filePaths[0]);
          isGitRepo(parent).then((isRepo) => {
            if (isRepo) {
              this.setState({ filepath: promiseValue.filePaths[0] });
            } else {
              this.setState({ filepath: '' });

              alert('Please choose a git repo');
            }
          });
        } else {
          console.log('No file path received');
        }
      });
  }

  startWatcher = () => {
    const {
      filepath, history, isWatching,
    } = this.state;
    if (filepath) {
      watcher = chokidar.watch(filepath, {
        ignored: /[\\]\./,
        persistent: true,
      });

      watcher
        .on('add', (pathDetail) => {
          if (isWatching) {
          // Add log
            console.log(`File added (add) : ${pathDetail}`, 'new');
          }
        })
        .on('addDir', (pathDetail) => {
          if (isWatching) {
          // Add log
            console.log(`Folder added (addDir) : ${pathDetail}`, 'new');
          }
        })
        .on('change', (pathDetail) => {
          if (isWatching) {
          // Add log
            console.log(`A change ocurred (change)  : ${pathDetail}`, 'change');
          }
        })
        .on('unlink', (pathDetail) => {
          if (isWatching) {
          // Add log
            console.log(`A file was deleted (unlink) : ${pathDetail}`, 'delete');
          }
        })
        .on('unlinkDir', (pathDetail) => {
          if (isWatching) {
          // Add log
            console.log(`A folder was deleted (unlinkdir) : ${pathDetail}`, 'delete');
          }
        })
        .on('error', (error) => {
          if (isWatching) {
            console.log('An error ocurred (error): ', 'delete');
            console.log(error);
          }
        })
        .on('ready', this.onWatcherReady)
        .on('raw', (event, path1, details) => {
          // This event should be triggered every time something happens.
          console.log('\n******-------------******\n');
          console.log('Raw event info:', event, path1, details);
          if (details.flags === 98304 && details.event === 'unknown') {
            // file opened
            if (history.length === 0) {
              alert('no entry available');
            }
          } else if (fse.existsSync('./.temp/')) {
            const { latestVersion } = this.state;

            const file1 = fse.readFileSync(`./.temp/watchfolderVersions/Version${latestVersion - 1}.txt`);
            const file2 = fse.readFileSync(filepath);
            const sameFiles = (file1.equals(file2));

            if (details.flags === 100352 && details.event === 'moved') {
              // made changes in file, but not yet saved
              if (!sameFiles) {
                this.setState({ showDescription: true });
              }
              // alert(`file up to date!${details.flags}`);
            }
            if ((details.flags === 4294656 || details.flags === 98304 || details.flags === 4295680)
                  && details.event === 'moved') {
              if (!sameFiles) {
                this.setState({ showDescription: false });
                this.addNewEntry({
                  version: latestVersion,
                  description: 'Document Updated automatically',
                  timestamp: generateTimestamp(),
                  fileCopyLink:
                        `./.temp/watchfolderVersions/Version${latestVersion}.txt`,
                });

                gitAddAndCommit(filepath, 'Document Updated automatically');
              } else {
                console.log('File is up to date.');
              }
              // console.log(this.state.history);
            }
          }
        });
    } else alert('No filepath available');
  }

  stopWatcher = () => {
    if (!watcher) {
      console.log('You need to start first the watcher');
    } else {
      watcher.close();
      // showLogFlag = false;
      this.setState({
        isWatching: false, filepath: '', history: [], showDescription: false, latestVersion: 1,
      });
      if (fse.existsSync('./.temp')) {
        fse.removeSync('./.temp');
      }
    }
  }

  filepathHandle = (event) => {
    this.setState({
      filepath: event.target.value,
    });
  }

  saveDescription = (description: string) => {
    const { filepath, latestVersion } = this.state;
    this.addNewEntry({
      version: this.state.latestVersion,
      description,
      timestamp: generateTimestamp(),
      fileCopyLink: `./.temp/watchfolderVersions/Version${latestVersion}.txt`,
    });
    this.setState({ showDescription: false });
    gitAddAndCommit(filepath, description);
  }

  dropdownChange = (selectedVersion) => {
    this.setState({
      selectedVersion,
    });
  };

  restoreVersion = () => {
    const {
      filepath, history, selectedVersion, latestVersion,
    } = this.state;
    if (selectedVersion !== -1 && selectedVersion !== undefined) {
      const versionDetailsArray = history.filter(
        (historyEntry) => String(historyEntry.version) === String(selectedVersion),
      );

      const versionDetails = versionDetailsArray[0];
      const source = versionDetails.fileCopyLink;

      try {
        fse.copySync(source, filepath);
        console.log('success replaced !');
      } catch (err) {
        console.log(err.message);
      }
      // todo: replace filepath content with the restore version content from versionDetails
      const entry = {
        version: latestVersion,
        description: `Restore version:${selectedVersion}`,
        timestamp: generateTimestamp(),
        fileCopyLink: `./.temp/watchfolderVersions/Version${latestVersion}.txt`,
      };
      this.addNewEntry(entry);
      gitAddAndCommit(filepath, entry.description);
    } else {
      alert('Please choose a version to restore!');
    }
  }


  async addNewEntry(entry: HistoryEntry) {
    const { filepath, history, latestVersion } = this.state;
    await fse.copy(filepath, `./.temp/watchfolderVersions/Version${latestVersion}.txt`)
      .then(() => {
        history.push(entry);
        const newVersion = latestVersion + 1;
        this.setState({ latestVersion: newVersion, history });
        console.log('added a new entry!');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    const {
      filepath, history, isWatching, showDescription, latestVersion,
    } = this.state;
    return (
      <div>
        {filepath ? (
          <TextField
            disabled
            fullWidth
            id="actual-file"
            label="Selected File"
            value={filepath}
            margin="normal"
            variant="outlined"
            onChange={this.filepathHandle}
          />
        ) : null}

        <Button
          fullWidth
          disabled={isWatching}
          id="btn-chooseFilepath"
          variant="contained"
          color="default"
          onClick={this.chooseFilepath}
        >
          Choose File
        </Button>
        {
          filepath ? (
            <div>
              <hr />
              <Button
                fullWidth
                disabled={isWatching}
                id="btn-startWatch"
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
                onClick={this.startWatcher}
              >
                  Start file watching
              </Button>
              <hr />
              <Button
                fullWidth
                disabled={!isWatching}
                id="btn-stopWatch"
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
                onClick={this.stopWatcher}
              >
                  Stop file watching
              </Button>
              <hr />
              <DefaultEditor
                filepath={filepath}
              />
            </div>
          )
            : null
        }
        {showDescription ? (<Description saveDescription={this.saveDescription} />) : null}

        <hr />
        {history.length === 0 ? null : (
          <div>
            <h3>
                Change History
            </h3>
            {history.slice(0).reverse().map((item) => (
              <li key={item.version}>
                {`${item.version}  | ${item.description} | ${item.timestamp}`}
              </li>
            ))}
          </div>
        )}


        {history.length > 2
          ? (
            <VersionSelector
              fileHistory={history}
              latestVersion={latestVersion - 1}
              dropdownChange={this.dropdownChange}
              restoreVersion={this.restoreVersion}
            />
          )
          : null}
      </div>

    );
  }
}
export default FileWatcherComponent;
