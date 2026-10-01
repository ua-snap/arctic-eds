// Content for the home page.

// Places offered as one-click examples under the search box.
export const tryPlaces = [
  { name: 'Fort Wainwright', id: 'AK438' },
  { name: 'JBER', id: 'AK439' },
  { name: 'Eielson AFB', id: 'AK442' },
  { name: 'Bethel', id: 'AK36' },
]

// Common short names that don't appear in the community list's name or
// alt_name, mapped to the community id they stand for.
export const placeAliases = {
  jber: 'AK439',
  'eielson afb': 'AK442',
}

// The site pictured in assets/images/sample-report.png. Its values are from
// the /eds/all response that app/assets/mock.json captures (mid-century vs.
// the modeled baseline); retake the picture if those change.
export const exampleSite = {
  name: 'Fairbanks',
  // The point report, so the full report shows the same grid cells.
  path: '/report/64.8378/-147.716',
}
