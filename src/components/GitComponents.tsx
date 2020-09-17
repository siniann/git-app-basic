import React from 'react';
import { Button } from '@material-ui/core';
import {
  gitStatus, gitClone, gitPush,
} from '../helper/gitFunctions';

const GitComponents = () => (
  <div>
    <Button onClick={gitClone}> Init git</Button>
    <Button onClick={gitStatus}> Check git status</Button>
    {/*
        <Button onClick={gitCommitLog}>View log</Button>
*/}
    <Button id="btn-push" onClick={gitPush}>Push to Git</Button>
  </div>
);

export default GitComponents;
