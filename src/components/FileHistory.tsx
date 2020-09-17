import React from 'react';
import { HistoryEntry } from './FileWatcherComponent';
/*

export interface FileHistoryEntry {
  version: number;
  description: string;
  timestamp: string;
  file: string;
  previousContent: string;
  newContent: string;
}
*/

interface FileHistoryProps {
  fileHistory: HistoryEntry[];
}

const FileHistory = (props: FileHistoryProps) => {
  const { fileHistory } = props;
  return (
    <div>
      history
      {fileHistory.length === 0 ? null : (
        <div id="div-history">
          <h3>
              Change History
          </h3>
          {fileHistory.slice(0).reverse().map((item) => (
            <li key={item.version}>
              {`${item.version}  | ${item.description} | ${item.timestamp}`}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
export default FileHistory;
