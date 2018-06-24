<p align="center">
  <a href="http://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjohndatserakis%2Fkoa-react-notes-web&text=Check%20out%20koa-react-notes-web%20on%20GitHub&via=innermonkdesign">
  <img src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-react-notes-web.svg?style=social" alt="Tweet"></a>
</p>

# Koa-React-Notes-Web

This is a simple SPA built using [Koa](http://koajs.com/) (2.5.1) as the backend and [React](https://reactjs.org/) (16.4.1) as the frontend. Click [here](https://github.com/johndatserakis/koa-vue-notes-api) to see the backend Koa code. Click [here](https://koa-vue-notes-web.innermonkdesign.com/) to view the app live. You can also check out the [koa-vue-notes-project](https://github.com/johndatserakis/koa-vue-notes-project) repo if you like to have both your frontend and backend living within the same folder. Also, you can check out [koa-vue-notes-web](https://github.com/johndatserakis/koa-vue-notes-web) for the Vue implementation of this project.

### Features
- React 16.4.1 (Initialized by create-react-app)
- Redux 4.0.0
- React-Router 4.3.1
- Redux-Thunks
- Styled Components
- Axios
- ReactStrap
- Bootstrap 4.1.1
- And more...

### Installing / Getting started

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run watch

# build for production
npm run build
```

### General Information

For information on this project you can check out [koa-vue-notes-api](https://github.com/johndatserakis/koa-vue-notes-api) or [koa-vue-notes-web](https://github.com/johndatserakis/koa-vue-notes-web). The project's general concept is to create a simple notes in using modern technologies. Initially, Koa-Vue-Notes was an app that used Koa on the backend and Vue on the frontend.

This project changes that up a bit - and is the same `koa-vue-notes-web` app, but written in React. This is perfect for someone who wants to take a good look at both frameworks a little bit more in depth than the usually tutoral blog posts.

### Notes

You'll want to take the example of each of the `.env` files to get started. The main theme settings are going to be in `src/themes/global.js` - that's where I defind the main components and colors to be used throughout the program.

This app uses Redux to hold the state - take a look at the `store`, `actions`, and `reducers` in the store folder.

Note the `.env` file in the root of the project - the `NODE_PATH=src` is there to provide an alias to the root folder - so when you're importing you own components you don't have to fuss with the path.

### TODO

- Add tests

### Hit Me Up

Go ahead and fork the project! Message me here if you have questions or submit an issue if needed. I'll be making touch-ups as time goes on. Have fun with this!

### License

Copywrite 2018 John Datserakis

[MIT](http://opensource.org/licenses/MIT)