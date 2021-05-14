const Routes = {}
const weight = (route) => -100*route.split('/').length +
  route.split('/').reduce((len, item) => len + item.length, 0) +
  10000 * (route.indexOf('*') != -1 ? 1 : 0)

export const router = (url, action) => {
  if (action === undefined) {
    return Object.keys(Routes)
      .sort((a, b) => Routes[a].weight - Routes[b].weight)
      .reduce((match, route) => {
        if (!match) {
          const Route = route.split('/')
          var Url = url.split('?')
          const Path = Url.shift().split('/')
          const Response = {
            route: route,
            url: url,
            path: Path.join('/'),
            params: {},
            query: Url.join('?')
          }

          status = 'okay'
          Route.forEach((r, i) => {
            if (status) {
              if (Path[i] == null) {
                status = ''
              } else if (r === '*') {
                status = '*'
              } else if (r.substr(0, 1) === ':') {
                Response.params[r.substr(1)] = Path[i]
              } else if (r !== Path[i]) {
                status = ''
              }
            }
          })

          if (status == '*' || (status && Route.length == Path.length)) {
            Routes[route].action(Response)
            match = true
          }
        }
        return match
      }, false)
  } else {
    if (typeof action !== 'function') {
      delete Routes[url]
    } else {
      Routes[url] = {
        action: action,
        weight: weight(url)
      }
    }
  }
}
