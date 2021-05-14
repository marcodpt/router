import {router} from 'https://cdn.jsdelivr.net/gh/marcodpt/router/index.js'

const str = function (X) {
  return JSON.stringify(X, undefined, 2)
}

QUnit.test("routes", function (assert) {
  var X = null
  var index = 0
  const testRoute = (ctx) => {
    X = ctx
    X.index = ++index
  }

  router('/users', testRoute)
  router('/user/:id', testRoute)
  router('/books/:name/*', testRoute)
  router('*', testRoute)

  router('/users')
  assert.equal(str(X), str({
    route: '/users',
    url: '/users',
    path: '/users',
    params: {},
    query: '',
    index: 1
  }))

  router('/users?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/users',
    url: '/users?display=thumbnail&path?=/some/dir',
    path: '/users',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 2
  }))

  router('/user/3')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3',
    path: '/user/3',
    params: {id: "3"},
    query: '',
    index: 3
  }))

  router('/user/3?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 4
  }))

  router('/books/moby-dick')
  assert.equal(str(X), str({
    route: '*',
    url: '/books/moby-dick',
    path: '/books/moby-dick',
    params: {},
    query: '',
    index: 5
  }))

  router('/books/moby-dick?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '*',
    url: '/books/moby-dick?display=thumbnail&path?=/some/dir',
    path: '/books/moby-dick',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 6
  }))

  router('/books/moby-dick/')
  assert.equal(str(X), str({
    route: '/books/:name/*',
    url: '/books/moby-dick/',
    path: '/books/moby-dick/',
    params: {name: "moby-dick"},
    query: '',
    index: 7
  }))

  router('/books/moby-dick/?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/books/:name/*',
    url: '/books/moby-dick/?display=thumbnail&path?=/some/dir',
    path: '/books/moby-dick/',
    params: {name: "moby-dick"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 8
  }))

  router('/books/moby-dick/page3')
  assert.equal(str(X), str({
    route: '/books/:name/*',
    url: '/books/moby-dick/page3',
    path: '/books/moby-dick/page3',
    params: {name: "moby-dick"},
    query: '',
    index: 9
  }))

  router('/books/moby-dick/page3?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/books/:name/*',
    url: '/books/moby-dick/page3?display=thumbnail&path?=/some/dir',
    path: '/books/moby-dick/page3',
    params: {name: "moby-dick"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 10
  }))

  router('/other/3')
  assert.equal(str(X), str({
    route: '*',
    url: '/other/3',
    path: '/other/3',
    params: {},
    query: '',
    index: 11
  }))

  router('/other/3?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '*',
    url: '/other/3?display=thumbnail&path?=/some/dir',
    path: '/other/3',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 12
  }))

  router('/')
  assert.equal(str(X), str({
    route: '*',
    url: '/',
    path: '/',
    params: {},
    query: '',
    index: 13
  }))

  router('/?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '*',
    url: '/?display=thumbnail&path?=/some/dir',
    path: '/',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 14
  }))

  router('')
  assert.equal(str(X), str({
    route: '*',
    url: '',
    path: '',
    params: {},
    query: '',
    index: 15
  }))

  router('?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '*',
    url: '?display=thumbnail&path?=/some/dir',
    path: '',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 16
  }))

  router('/users', null)
  router('/books/:name/*', null)
  router('/:folder', testRoute)
  router('/', testRoute)
  router('', testRoute)

  router('/users')
  assert.equal(str(X), str({
    route: '/:folder',
    url: '/users',
    path: '/users',
    params: {folder: "users"},
    query: '',
    index: 17
  }))

  router('/users?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/:folder',
    url: '/users?display=thumbnail&path?=/some/dir',
    path: '/users',
    params: {folder: "users"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 18
  }))

  router('/user/3')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3',
    path: '/user/3',
    params: {id: "3"},
    query: '',
    index: 19
  }))

  router('/user/3?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 20
  }))

  router('/books/moby-dick')
  assert.equal(str(X), str({
    route: '*',
    url: '/books/moby-dick',
    path: '/books/moby-dick',
    params: {},
    query: '',
    index: 21
  }))

  router('/books/moby-dick?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '*',
    url: '/books/moby-dick?display=thumbnail&path?=/some/dir',
    path: '/books/moby-dick',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 22
  }))

  router('/books/moby-dick/')
  assert.equal(str(X), str({
    route: '*',
    url: '/books/moby-dick/',
    path: '/books/moby-dick/',
    params: {},
    query: '',
    index: 23
  }))

  router('/books/moby-dick/?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '*',
    url: '/books/moby-dick/?display=thumbnail&path?=/some/dir',
    path: '/books/moby-dick/',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 24
  }))

  router('/books/moby-dick/page3')
  assert.equal(str(X), str({
    route: '*',
    url: '/books/moby-dick/page3',
    path: '/books/moby-dick/page3',
    params: {},
    query: '',
    index: 25
  }))

  router('/books/moby-dick/page3?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '*',
    url: '/books/moby-dick/page3?display=thumbnail&path?=/some/dir',
    path: '/books/moby-dick/page3',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 26
  }))

  router('/other/3')
  assert.equal(str(X), str({
    route: '*',
    url: '/other/3',
    path: '/other/3',
    params: {},
    query: '',
    index: 27
  }))

  router('/other/3?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '*',
    url: '/other/3?display=thumbnail&path?=/some/dir',
    path: '/other/3',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 28
  }))

  router('/')
  assert.equal(str(X), str({
    route: '/',
    url: '/',
    path: '/',
    params: {},
    query: '',
    index: 29
  }))

  router('/?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/',
    url: '/?display=thumbnail&path?=/some/dir',
    path: '/',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 30
  }))

  router('')
  assert.equal(str(X), str({
    route: '',
    url: '',
    path: '',
    params: {},
    query: '',
    index: 31
  }))

  router('?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '',
    url: '?display=thumbnail&path?=/some/dir',
    path: '',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 32
  }))

  router('*', null)

  router('/users')
  assert.equal(str(X), str({
    route: '/:folder',
    url: '/users',
    path: '/users',
    params: {folder: "users"},
    query: '',
    index: 33
  }))

  router('/users?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/:folder',
    url: '/users?display=thumbnail&path?=/some/dir',
    path: '/users',
    params: {folder: "users"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 34
  }))

  router('/user/3')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3',
    path: '/user/3',
    params: {id: "3"},
    query: '',
    index: 35
  }))

  router('/user/3?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 36
  }))

  router('/books/moby-dick')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 36
  }))

  router('/books/moby-dick?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 36
  }))

  router('/books/moby-dick/')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 36
  }))

  router('/books/moby-dick/?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 36
  }))

  router('/books/moby-dick/page3')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 36
  }))

  router('/books/moby-dick/page3?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 36
  }))

  router('/other/3')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 36
  }))

  router('/other/3?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/user/:id',
    url: '/user/3?display=thumbnail&path?=/some/dir',
    path: '/user/3',
    params: {id: "3"},
    query: 'display=thumbnail&path?=/some/dir',
    index: 36
  }))

  router('/')
  assert.equal(str(X), str({
    route: '/',
    url: '/',
    path: '/',
    params: {},
    query: '',
    index: 37
  }))

  router('/?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '/',
    url: '/?display=thumbnail&path?=/some/dir',
    path: '/',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 38
  }))

  router('')
  assert.equal(str(X), str({
    route: '',
    url: '',
    path: '',
    params: {},
    query: '',
    index: 39
  }))

  router('?display=thumbnail&path?=/some/dir')
  assert.equal(str(X), str({
    route: '',
    url: '?display=thumbnail&path?=/some/dir',
    path: '',
    params: {},
    query: 'display=thumbnail&path?=/some/dir',
    index: 40
  }))
})
