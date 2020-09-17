import git from 'simple-git/promise';
import path from 'path';

const remoteUrl = 'https://github.com/siniann/test.git';
const localRepoPath = '/Users/macbook/Desktop/gitRepocopy';

export const gitClone = () => {
  alert(`cloning from ${remoteUrl}`);
  const gitObject = git();
  return gitObject.clone(remoteUrl, localRepoPath)
    .then((returnValue) => console.log('cloning finished'))
    .catch(() => console.log('error in cloning'));
};


export const gitStatus = () => {
  git(localRepoPath).silent(true).status()
    .then((status) => {
      alert(`status of ${localRepoPath}`);
      console.log(status);
      git(localRepoPath).log()
        .then((log) => console.log(log))
        .catch(() => console.log('some error occurred in log'));
    });
};

export const isGitRepo = (repoPath: string) => {
  let isRepository: boolean;
  return git(repoPath).silent(true).checkIsRepo()
    .then((isRepo) => {
      isRepository = isRepo;
      return isRepository;
    })
    .catch((err) => console.log(err));
};
export const gitAdd = (filepath) => {
  // alert('adding to git in git func');
  const gitObject = git(path.dirname(filepath));

  return gitObject.add(filepath)
    .then(() => {
      console.log('added to git');
    })
    .catch(() => console.log('error in adding to git'));
};

export const gitCommit = (filepath, commitMessage) => {
  const gitObject = git(path.dirname(filepath));

  return gitObject.commit(commitMessage);
};

export const gitAddAndCommit = (filepath, commitMessage) => gitAdd(filepath)
  .then(() => {
    gitCommit(filepath, commitMessage).then(() => {
      console.log('commit  successful');
    });
  })
  .catch(() => {
    console.log('some error occurred');
  });

export const gitCommitLog = () => {
  const gitObject = git(localRepoPath);
  return gitObject.log();
};

export const gitPush = () => {
  const gitObject = git(localRepoPath);

  return gitObject.push(remoteUrl)
    .then(() => {
      alert('Pushed to remote repository ');
    })
    .catch(() => console.log('push encountered some error'));
};
