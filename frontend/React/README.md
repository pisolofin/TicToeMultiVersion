# React

## Configuration

### Using shared models and services

React ( in default confifuration ) compile only files inside `src` folder for default configuration.
To use files inside `shared` folder outside React project I used `copyfiles` [npm package](https://www.npmjs.com/package/copyfiles) to copy outside `shared` folder inside `src` folder.

### Testing Observable in React

Testing other state manager in React. In `/tic-toe-observable` there is same tic-toe application but with Observable state manager.
Use hook `useObservableState` from [observable-hooks](https://observable-hooks.js.org/) to have state from an Observable.


## Create new app

`npx create-react-app <app-name> --template typescript`
