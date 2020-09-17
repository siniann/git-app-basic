import React from 'react';
import { Button } from '@material-ui/core';

const { shell } = require('electron');

interface DefaultEditorProps {
  filepath: string;
}

const DefaultEditor = (props: DefaultEditorProps) => {
  const { filepath = 'No file path available' } = props;
  const openEditor = () => {
    if (filepath !== 'No file path available' && filepath !== '') {
      shell.openItem(filepath);
    }
  };
  return (
    <Button
      fullWidth
      id="btn-openEditor"
      onClick={openEditor}
      variant="contained"
      size="medium"
    >
      {' '}
Open in Editor
    </Button>
  );
};

export default DefaultEditor;
