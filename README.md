# hellobistro

## Development Guide

### Starting the Server

We have created a simple start script that:
1. Builds the React client in -w (watch) mode using Webpack and
2. Runs server/app.js via nodemon

To start this script, type `npm run dev`.

### Using ESLint

For this project we will aim to use the Airbnb Javascript Style Guide (https://github.com/airbnb/javascript, with the configuration bundle at https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), enforced via ESLint. 

ESLint has already been setup and configured. Please make sure that you have run `npm install` to install all necessary packages.

#### With Visual Studio Code

1. After running `npm install` from the root directory, open Visual Studio Code.
2. Navigate to the Extensions manager (CMD + Shift + X) and install 'ESLint'. 
3. Reload Visual Studio Code. 
4. After reloading Visual Studio Code, you should see linting errors and suggestions appear in-editor.

#### With Sublime Text 3

(These directions are adapted from the guidance available at https://codeburst.io/eslint-with-airbnb-standard-js-sublime-text-965a1db58793):

1. In Sublime Text, open the Command Palette (CMD + Shift + P).
2. Select/enter `Package Control: Install Package`
3. Install SublimeLinter
4. Install SublimeLinter-eslint
5. Restart Sublime Text.
6. After restarting Sublime Text, you should see linting errors appear in-editor.

*Note: You may see that some SublimeLinter setups require setting paths inside the SublimeLinter settings. Since you are installing ESLint as a dev dependency in this project, that is not needed. 

### Running Tests

#### Server-side tests

1. In the root directory , run `npm run test-server`.
2. Depending on your Mocha configuration, you may need to manually exit Mocha (CTRL + C) after the tests have completed.

#### Client tests

[Forthcoming]

#### Deploying
Set upstream to https://github.com/hellobistro/hellobistro.git and push to upstream master (must have admin priviliges). This will trigger testing and deployment via Travis CI.

