import React from 'react';
import Header from './components/Header/Header.component';
import FileWatcherComponent from './components/FileWatcherComponent';
import GitComponents from './components/GitComponents';

function App() {
  return (
    <div>
      <Header />
      <GitComponents />
      <hr />
      <FileWatcherComponent />

    </div>
  );
}

export default App;
