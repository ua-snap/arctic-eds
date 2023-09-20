// Adapted from:
// https://levelup.gitconnected.com/nuxt-js-how-to-retain-scroll-position-when-returning-to-page-without-navigation-history-7f0250886d27
//
// When loading map modals, save the previous y-axis scroll position so users
// are placed back at the same y-axis position on the front page when they
// close the modal. This also works if a user navigates to a different page
// from a modal link, clicks back, then closes the modal.
export default function ({ route, from }) {
  const scrollPos = from?.meta[0].scrollPos
  if (scrollPos && Object.keys(scrollPos).length > 0) {
    const isFrontPage = route.fullPath == '/'
    const isMapRoute = route.fullPath.substring(0, 2) == '/#'
    if (isMapRoute) {
      scrollPos.y = window.scrollY || 0
      scrollPos.x = window.scrollX || 0
    }
    if (isFrontPage || isMapRoute) {
      setTimeout(function () {
        const previousY = scrollPos.y
        window.scrollTo(0, previousY)
      })
    }
  }
}
