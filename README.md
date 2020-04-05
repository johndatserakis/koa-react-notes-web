<p align="center"><a href="https://koa-vue-notes-web.innermonkdesign.com/" target="_blank"><img width="200" src="./public/koa-vue-notes-icon.png"></a></p>

<p align="center">
  <a href="http://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjohndatserakis%2Fkoa-react-notes-web&text=Check%20out%20koa-react-notes-web%20on%20GitHub&via=innermonkdesign">
  <img src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-react-notes-web.svg?style=social" alt="Tweet"></a>
</p>

# Koa-React-Notes-Web

This is a simple SPA built using [Koa](http://koajs.com/) (2.5.1) as the backend and [React](https://reactjs.org/) (16.8.3) as the frontend. Click [here](https://github.com/johndatserakis/koa-vue-notes-api) to see the backend Koa code. Click [here](https://koa-vue-notes-web.innermonkdesign.com/) to view the app live. Also, you can check out [koa-vue-notes-web](https://koa-vue-notes-web.innermonkdesign.com) for the Vue implementation of this exact project! You can also check out the [koa-vue-notes-project](https://github.com/johndatserakis/koa-vue-notes-project) repo if you like to have both your frontend and backend living within the same folder (that one's using the Vue version).

### Features
- React 16.8.3 (Initialized by create-react-app)
- Redux 4.0.1
- React-Router 4.3.1
- Redux-Thunks
- Styled-Components
- Axios
- ReactStrap
- Bootstrap 4.3.1
- And more...

### Installing / Getting started

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run watch

# build for production
npm run build

# run tests
```

### General Information

For information on this project you can check out [koa-vue-notes-api](https://github.com/johndatserakis/koa-vue-notes-api) or [koa-vue-notes-web](https://koa-react-notes-web.innermonkdesign.com). The project's general concept is to create a simple notes in using modern technologies. Initially, Koa-Vue-Notes was an app that used Koa on the backend and Vue on the frontend.

This project changes that up a bit - and is the same `koa-vue-notes-web` app, but written in React. This is perfect for someone who wants to take a good look at both frameworks a little bit more in depth than the usually tutoral blog posts.

### .env Files

When cloning the project you'll want to take each `.env` file and remove `.example` from it. This is where I set a few environmental variables for the project's use. Some highlights are `NODE_PATH=src` in the `.env` file - that let's you easily import files from anywhere in your app using `src` as the root. Another important one is `REACT_APP_API_URL` - that's where I set the base url for `axios` - it's different in development and production. Make sure to do this or the app won't work/build.

### router

React-router is definitely nice - it's just a little tricky to get used to at first. To navigate to another page, use `this.props.history.push('/dashboard')` - and if you're not in a direct decedent of the initial router switch statement setup, you'll need to use the `withRouter` Higher Order Component export that `react-router` offers. Note - actual routes are declared in `App.js`.

### redux

After using Vuex for about 2 years now, redux wasn't really to hard to wrap my head around. `Users` and `Notes` each have their own action and reducer files. I'm utilizing `redux-thunk` in the project to allow action creators to return functions.

#### User Authentication Process

As mentioned in the vue/koa code, the user authentication process is this:

- User create an account
- User logs in
- The server sends and `accessToken` and a `refreshToken` back
- We take the `accessToken` and decoded it using `jwt-decode`. This gets us the logged in user's information. We stick this in the Redux variable `user`. Then we store the `refreshToken`.
- Each protected endpoint will be expecting you to attach the `accessToken` you have to the call (using Authentication: Bearer). After a short amount of time, the server will respond with `401 TOKEN EXPIRED`. When you see this - that means you need to send your `refreshToken` and `user.email` to the endpoint that deals with `accessToken` refreshing. Once you do that, you'll received a brand new `accessToken` and `refreshToken`.
- Repeat the process as needed.

I've utilized the great Axios `axios.interceptors.response` utility to capture the case of an expired `accessToken` and refresh it - all without the user being made aware of the process. The key is to keep the promise-chain alive - this is so the component caller can update it's local state - things like page count, sort - stuff that's important but really doesn't belong in our Redux store because it's only relevant to the calling component. Take a look at the user.js store - that's where the interceptor is set up. If it recognizes this is a refresh situation it calls two Redux actions and then resolves with the resent request.

### App.js

Here's where a chunk of the app takes place. The routes are declared in the render function. You'll also notice a few routes only allow entry if the user is logged in. That can be useful if you're trying to protect some routes - like we are here with `Dashboard`, `CreateNote`, and `EditNote`.

A little bit of setup has to happen when the app loads from a refresh - first we have to check to see if our user is logged in through localStorage. If they are, we'll populate our redux store accordingly. Then, if they're logged in, we'll load any program data that's needed. In this case - that's their notes. All of this is done in `componentWillMount` - and when that's done we set the state variable `loading` to false - so that actual app loads. Note - this program data loading is also done in the user login call.

### theme/global.js

In `global.js` is where you'll find the main styles for the app. All the style is done here actually - except for a few lines of css imported into the Nav.

Here you can get a good look at the styled-components usage for the program. Honestly, my favorite thing about the React ecosystem has been styled-components I think. What an interesting and clean way to style you components. I like it so much I opted to use `grid-styled` for my grid instead of Bootstrap like I usually do. I do still have Bootstrap installed though - along with ReactStrap - mainly for the navbar. It's a nice one, and is super easy to setup and use - check it out in `Nav.js`.

### Hit Me Up

Go ahead and fork the project! Message me here if you have questions or submit an issue if needed. I'll be making touch-ups as time goes on. Have fun with this!

### License

Copywrite 2018 John Datserakis

[MIT](http://opensource.org/licenses/MIT)

https://github.com/unzico/cra3-ts-antd-sass
