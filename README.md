# Knowmark UI

## Tradeoffs

### [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)

Hash based routing simplifies routing and serving frontend a lot, at the cost of being bad for SEO.

- Given that Knowmark is a self-hosted solution, SEO is less important.

## Known issues

- Relies on :has selector for some features, which has to be enabled through `layout.css.has-selector.enabled` flag on firefox.
  - [Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=418039)
