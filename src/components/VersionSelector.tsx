import React, { Component, createRef } from 'react';
import Button from '@material-ui/core/Button';
import { HistoryEntry } from './FileWatcherComponent';

interface VersionSelectorProps {
  fileHistory: HistoryEntry[];
  latestVersion: number;
  dropdownChange: Function;
  restoreVersion: Function;
}

class VersionSelector extends Component<VersionSelectorProps> {
  private dropdownRef = createRef<HTMLSelectElement>();

  versionHandleChange = (event) => {
    const { dropdownChange } = this.props;
    const selectedValue = event.target.value;
    dropdownChange(selectedValue);
  };

  restore = () => {
    const { restoreVersion, dropdownChange } = this.props;
    /* istanbul ignore else */
    if (this.dropdownRef.current) {
      this.dropdownRef.current.value = `${-1}`;
      restoreVersion();
      dropdownChange(-1);
    }
  };

  render() {
    const { fileHistory, latestVersion } = this.props;
    const filteredVersions = fileHistory.filter(
      (fileHistoryEntry) => (
        fileHistoryEntry.version > 0
          && fileHistoryEntry.version !== latestVersion
      ),
    );
    const options = filteredVersions.map((fileHistoryEntry) => (
      <option
        key={fileHistoryEntry.version}
        value={fileHistoryEntry.version}
      >
        {fileHistoryEntry.version}
      </option>
    ));

    return (
      <div>
        <hr />
        Restore version
        {' '}
        <select
          id="versionDropdown"
          onChange={this.versionHandleChange}
          ref={this.dropdownRef}
        >
          <option value={-1}>Select Version</option>
          {options}
        </select>
        <br />
        <Button
          id="btn-restore"
          onClick={this.restore}
          variant="contained"
          size="small"
        >
          Restore
        </Button>

      </div>
    );
  }
}

export default VersionSelector;
