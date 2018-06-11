import inquirer from 'inquirer';
import { chooseProjectMenu } from './menu/choose-project';
import { appHasNewerVersion, showNewerVersionWarning } from './service/app-version';

console.log("Welcome to esti-mate-cli! Let's draft an estimate!");

appHasNewerVersion()
    .then(hasNewerVersion => hasNewerVersion ? showNewerVersionWarning() : null)
    .then(() => chooseProjectMenu());
