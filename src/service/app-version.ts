import fetch from 'node-fetch';
import { lt as isOutdated } from 'semver';
import { promisify } from 'util';

const setTimeoutPromise = promisify(setTimeout);

const LATEST_APP_INFO_URL = 'https://registry.npmjs.org/esti-mate-cli/latest';

interface PackageInfo {
    version: string;
}

export function currentAppVersion() {
    const packageInfo: PackageInfo = require('../../package.json');
    return packageInfo.version;
}

export async function getLatestAppVersion() {
    const response = await fetch(LATEST_APP_INFO_URL);
    const latestPackageInfo: PackageInfo = await response.json();
    return latestPackageInfo.version;
}

export async function appHasNewerVersion() {
    const current = currentAppVersion();
    try {
        const latest = await Promise.race([
            getLatestAppVersion(),
            setTimeoutPromise(2000, ''),
        ]);
        return isOutdated(current, latest);
    } catch (err) {
        return false;
    }
}

export function showNewerVersionWarning() {
    console.warn(' ');
    console.warn('*******************************************************');
    console.warn('*');
    console.warn('* There is a newer version of EstiMate available!');
    console.warn('* You can update it by running the following command: ');
    console.warn('* npm i esti-mate-cli -g');
    console.warn('*');
    console.warn('*******************************************************');
    console.warn(' ');
}