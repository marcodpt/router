# [DEPRECATED]
This repository contains interesting ideas but has been replaced by [wand](https://github.com/marcodpt/wand), a project that carries the good ideas here.

If it is useful to you, fork it and continue development, it is kept here while I have software that depends on this repository.

# Router
A minimalistic url router for browser, server and whatever use you imagine!

[Tests](https://marcodpt.github.io/router/)

## Motivation
Most of routers do too much, and they become useful only in very specific situations. This is bad specially because you don't want to learn a new library for every use case. 

So I create what I thing is the most general use case for a url router. And you can connect with any library to achieve the desired functionality.

Most of routers are very over optimized! And regex are slow! This router don't use regex at all. The code base is about 50 lines of code and any one can understand it.

Most routers are difficult to master it! This one you just see the examples and you understand exactly what it does!

## Example
```js
import router from 'https://cdn.jsdelivr.net/gh/marcodpt/router/index.js'

const showResult = {route, params} => {
  console.log('match: '+route)
  console.log(params)
}

router('/users', showResult)
router('/user/:id', showResult)
router('/books/:name/*', showResult)
router('*', showResult)

router('/users')
// match: /users
// {}

router('/user/3')
// match: /user/:id
// {id: "3"}

router('/books/moby-dick')
// match: *
// {}

router('/books/moby-dick/')
// match: /books/:name/*
// {name: "moby-dick"}

router('/books/moby-dick/page3')
// match: /books/:name/*
// {name: "moby-dick"}

router('/other/3')
// match: *
// {}

router('/')
// match: *
// {}

router('')
// match: *
// {}
```

## A Hash Router
```js
import router from 'https://cdn.jsdelivr.net/gh/marcodpt/router/index.js'

router('/users', showPageUsers)
router('/user/:id', showPageUser)
router('/books/:name/*', showPageBooks)
router('*', showNotFound)

window.addEventListener('hashchange', () => {
  router(location.hash.substr(1))
})
```

## A Server Router
```js
import router from 'https://cdn.jsdelivr.net/gh/marcodpt/router/index.js'
import {server} from '/path/to/some/server.js'

router('GET /users', showPageUsers)
router('POST /users', createUser)
router('GET /user/:id', showPageUser)
router('PUT /user/:id', editUser)
router('DELETE /user/:id', deleteUser)
router('*', showNotFound)

server.onRequest(req => router(`${req.method} ${req.path}`))
```

## A Middleware Example
```js
import router from 'https://cdn.jsdelivr.net/gh/marcodpt/router/index.js'
import query from 'https://cdn.jsdelivr.net/gh/marcodpt/query/index.js'

const showQuery = ({query}) => {
  console.log(query)
}

const queryParserMiddleware = action => ctx => {
  ctx.query = query(ctx.query)
  action(ctx)
}

router('/users', showQuery)
router('/users?display=thumbnail&showComments=true')
//display=thumbnail&showComments=true

router('/users', queryParserMiddleware(showQuery))
router('/users?display=thumbnail&showComments=true')
//{
//  "display": "thumbnail",
//  "showComments": "true"
//}
```

## API
### router(match, action)
Register a `route` that matches `match` with `action` callback
 - string `match`: the match pattern, you can declare params with `:name` and you can use `*` wildcard, no regex support 
 - function `action` (`ctx`): a function that will be called in case of a match, only the first match action will be called, in case of no matches no function will be called but you always can declare the route `*` that match all possible routes.
 - object `ctx` properties:
   - string `route`: the match pattern declared in the route
   - string `url`: the original url that matched against `route`
   - string `path`: the original path associated to `url`
   - object `params`: the params values declared in `route` variables
   - string `query`: the query string associated with `url`

### router(match, null)
Cancel the `route` associated with `match` if it exist.
 - string `match`: The old `route` that will be eliminated!
 - null: You must pass `null` as the second parameter to cancel the route.

### router(url)
Test `url` against all saved routes. The first route that matches it will call action, if no route matches nothing will be done but you always can declare the route `*` that match all possible routes.
 - string `url`: A url that represents the current state of the application, can be extracted from `location.hash` on web browsers, can be extract from the `request` object in servers, or you can make any creative use of the router.

## Contributing
Yes please! It is a very simple project with a single file, no guidelines, any
contribution is greatly appreciated!
