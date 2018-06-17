jest.mock('node-fetch');
import fetch from 'node-fetch';
import { currentAppVersion, getLatestAppVersion, appHasNewerVersion, showNewerVersionWarning } from './app-version';
import { inc } from 'semver';

describe('AppVersion service', () => {

    const mockLatestVersionResult = (version: string) => (fetch as jest.Mock)
        .mockReturnValueOnce(Promise.resolve({ json: () => Promise.resolve({ version }) }));

    it('currentAppVersion returns the version from the package.json', () =>
        expect(currentAppVersion()).toEqual(require('../../package.json').version));

    it('getLatestAppVersion returns the latest version of EstiMate from the NPM registry', async () => {
        mockLatestVersionResult('1.2.3');
        const result = await getLatestAppVersion();
        expect(result).toBe('1.2.3');
    });

    it('appHasNewerVersion returns false if the app is up to date', async () => {
        mockLatestVersionResult(currentAppVersion());
        expect(await appHasNewerVersion()).toBeFalsy();
    });

    it('appHasNewerVersion returns true if there are a newer version in the NPM registry', async () => {
        mockLatestVersionResult(inc(currentAppVersion(), 'major') || '');
        expect(await appHasNewerVersion()).toBeTruthy();
    });

    it('appHasNewerVersion returns false if there was an error getting the latest version', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce('Error');
        expect(await appHasNewerVersion()).toBeFalsy();
    });

    it('showNewerVersionWarning puts out warning messsage to the console', () => {
        console.warn = jest.fn();
        showNewerVersionWarning();
        expect(console.warn).toHaveBeenCalled();
    });
});