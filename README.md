<p align="center"><a href="https://koa-vue-notes-web.innermonkdesign.com/" target="_blank"><img width="200" src="./public/koa-react-notes-icon.png"></a></p>

<p align="center">
  <a href="http://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjohndatserakis%2Fkoa-react-notes-web&text=Check%20out%20koa-react-notes-web%20on%20GitHub&via=innermonkdesign">
  <img src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-react-notes-web.svg?style=social" alt="Tweet"></a>
</p>

# Koa-React-Notes-Web

This is a simple SPA built using [Koa](http://koajs.com/) as the backend, [Vue](https://vuejs.org/) as the first frontend, and [React](https://reactjs.org) as the second frontend.

- [Frontend Vue GitHub](https://github.com/johndatserakis/koa-vue-notes-web)
- [Frontend Vue Demo](https://koa-vue-notes-web.innermonkdesign.com/)
- [Frontend React GitHub](https://github.com/johndatserakis/koa-react-notes-web)
- [Frontend React Demo](https://koa-react-notes-web.innermonkdesign.com/)
- [Backend Koa GitHub](https://github.com/johndatserakis/koa-vue-notes-api)

# Features

- React 16.13.1 (Initialized by create-react-app)
- Fully written in TypeScript
- Functional Components
- Storybook
- Redux 4.0.1
- React-Router 5.1.2
- Redux-Thunks
- Axios
- React-Bootstrap
- Eslint
- Formik
- And more...

# Installing / Getting started

``` bash
# Install dependencies
npm i

# Serve with hot reload at localhost:3000
npm run watch

# Build for production
npm run build

# Lint using eslint
npm run lint

# Run Storybook
npm run storybook

# Run tests
npm run test
```

# General Information

For more information on this project you can check out [koa-vue-notes-api](https://github.com/johndatserakis/koa-vue-notes-api) or [koa-vue-notes-web](https://koa-react-notes-web.innermonkdesign.com). The project's general concept is to create a simple notes in using modern technologies. Initially, Koa-Vue-Notes was an app that used Koa on the backend and Vue on the frontend.

This project changes that up a bit - it's the same `koa-vue-notes-web` app, but written in React. This is perfect for someone who wants to take a good look at both frameworks a little bit more in depth than the usually tutoral blog posts.

# Redux

After using `Vuex` for about 2 years now, `Redux` wasn't really to hard to wrap my head around. `Users` and `Notes` each have their own `action` and `reducer` files. I'm utilizing `redux-thunk` in the project to allow action creators to return functions.

## User Authentication Process

As mentioned in the vue/koa code, the user authentication process is this:

- User create an account
- User logs in
- The server sends and `accessToken` and a `refreshToken` back
- We take the `accessToken` and decode it using `jwt-decode`. This gets us the logged in user's information. We stick this in the Vuex/Redux `user` store. Then we store the `refreshToken` and `accessToken` in the user's `localStorage`.
- Each protected endpoint will be expecting you to attach the `accessToken` you have to the call (using `Authentication: Bearer`)
- After a short amount of time, the server will respond with `401 TOKEN EXPIRED`. When you see this - that means you need to send your `refreshToken` and `user.email` to the endpoint that deals with `accessToken` refreshing.
- Once you do that, you'll received a brand new `accessToken` and `refreshToken`
- Repeat the process as needed

# App.js

Here's where a chunk of the app takes place. The routes are declared in the render function. You'll also notice a few routes only allow entry if the user is logged in. That can be useful if you're trying to protect some routes - like we are here with `Dashboard`, `CreateNote`, and `EditNote`.

# More

There's a bunch more in the app:

- `Storybook` support because a lot of times I like to create my components independently from the actual app.
- Fully built in `TypeScript` which hopefully helps others who are looking for a working example of some things.
- `Craco` integration so we can stretch our legs a bit without having to eject from `create-react-app`.
- `netlify.toml` support - you can take a look at how I serve the site on `Netlify`.
- `Formik` integration, plus lots of input components that work directly with `Formik` - of course fully written in `TypeScript` and `Functional Components`.
- Plus more, as I set this up like a real app I'd use in production.

Let me know if there's anything you'd like me to expand on as far as why I chose to use it in the app, glad to explain further.

# Hit Me Up

Go ahead and fork the project! Message me here if you have questions or submit an issue if needed. I'll be making touch-ups as time goes on. Have fun with this!

# License

Copyright 2018 John Datserakis

[MIT](http://opensource.org/licenses/MIT)
