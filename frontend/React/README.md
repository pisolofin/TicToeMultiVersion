# React

## Configuration

Run `npm i` to install al dependencies.
Run `npm start` to run application.

### Using shared models and services

React ( in default confifuration ) compile only files inside `src` folder for default configuration.
To use files inside `shared` folder outside React project I used `copyfiles` [npm package](https://www.npmjs.com/package/copyfiles) to copy outside `shared` folder inside `src` folder.

### Testing Observable in React

Testing other state manager in React. In `/tic-toe-observable` there is same tic-toe application but with Observable state manager.
Use hook `useObservableState` from [observable-hooks](https://observable-hooks.js.org/) to have state from an Observable.

### Testing Redux Toolkit

Testing other state manager in React. In `/tic-toe-redux` there is same tic-toe application but with Redux Toolkit state manager.
[Redux Toolkit](https://redux-toolkit.js.org/).
In that folder I used Redux without middleware. All lagic is in service.

### Routing feature

Routing feature is implemented by [React Router](https://reactrouter.com/).

## Create new app

`npx create-react-app <app-name> --template typescript`
