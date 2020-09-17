import git from 'simple-git/promise';
import * as gitModule from './gitFunctions';
import GitComponents from '../components/GitComponents';


describe('Git functions', () => {
  beforeEach(() => {
    window.alert = jest.fn();
    console.log = jest.fn();
    jest.mock('simple-git/promise');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  /*  works !!!!
  it('should test gitClone ',  () => {
     gitModule.gitClone();
    expect(window.alert).toHaveBeenCalledTimes(1);
  });

   it('should test gitClone ',  async(done) => {
   await  gitModule.gitClone();
   done()
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
it('should test gitClone ', () => {
    gitModule.gitClone();
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('cloning from https://github.com/siniann/test.git');
  });

*/

  it('should test gitClone ', async (done) => {
    await gitModule.gitClone();
    done();
    expect(window.alert).toHaveBeenCalledTimes(1);
  });


  it('should test gitClone resolve mock ', async (done) => {
    const promiseResolve = Promise.resolve('some string value');
    jest.spyOn(git(), 'clone').mockResolvedValue(promiseResolve);

    await gitModule.gitClone().catch(() => {
      expect(git().clone).resolves.toHaveBeenCalled();
    });
    done();
  });


  it('should test gitClone reject mock ', async (done) => {
    // const promiseReject = Promise.reject();

    jest.spyOn(git(), 'clone').mockRejectedValue({});

    await gitModule.gitClone().catch(() => {
      expect(git().clone).rejects.toHaveBeenCalled();
    });
    done();
  });


  it('should test gitStatus ', () => {
    gitModule.gitStatus();
    // expect(window.alert).not.toHaveBeenCalledWith('get status');
  });

  it('should test gitPush ', async (done) => {
    const promiseResolve = Promise.resolve();

    jest.spyOn(git(), 'push').mockResolvedValue(promiseResolve);

    await gitModule.gitPush().catch(() => {
      expect(git().push).resolves.toHaveBeenCalled();
    });
    done();
  });

  it('should test gitCommitLog ', () => {
    gitModule.gitCommitLog();
  });


  it('should test gitAddAndCommit ', async (done) => {
    const promiseResolve = Promise.resolve();
    const gitAddSpy = jest.spyOn(gitModule, 'gitAdd').mockRejectedValue({});

    await gitModule.gitAddAndCommit('invalid filepath', 'some commit message').catch(() => {
      expect(gitModule.gitAdd).rejects.toHaveBeenCalled();
    });
    done();
  });


  it('should test gitAddAndCommit rejects', async (done) => {
    const promiseResolve = Promise.resolve();
    const gitAddSpy = jest.spyOn(gitModule, 'gitAdd').mockRejectedValue({});
    const gitCommitSpy = jest.spyOn(gitModule, 'gitCommit').mockRejectedValue({});

    await gitModule.gitAddAndCommit('invalid filepath', 'some message').catch(() => {
      expect(gitAddSpy).toHaveBeenCalled();
    });
    done();
  });
});
