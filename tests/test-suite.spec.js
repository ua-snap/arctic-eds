import { test, expect } from '@playwright/test'

const url = 'http://localhost:3000'

// Navigate, then wait until Nuxt has finished hydrating before interacting.
// page.goto resolves on the load event, but the dev server's unbundled
// modules can hydrate after that. Interacting earlier loses events: a click
// on the community search box before hydration means the autocomplete never
// registers focus, so its dropdown never opens. This is the same check as
// @nuxt/test-utils' `waitUntil: 'hydration'`.
const gotoHydrated = async (page, target) => {
  await page.goto(target)
  await page.waitForFunction(
    () => window.useNuxtApp?.().isHydrating === false,
    null,
    { timeout: 60000 }
  )
}

const sectionFunctions = {
  elevation: 'checkForElevation',
  totalPrecipitation: 'checkForTotalPrecipitation',
  precipitationFrequency: 'checkForPrecipitationFrequency',
  snowfall: 'checkForSnowfall',
  hydrology: 'checkForHydrology',
  temperature: 'checkForTemperature',
  temperatureIndices: 'checkForTemperatureIndices',
  permafrost: 'checkForPermafrost',
}

// Each report section has a chart and, in its "Show the numbers" table,
// at least `cells` values.
const checkSection = async (page, id, cells) => {
  await expect(page.locator(`#${id} svg.chart`).first()).toBeVisible()
  const count = await page.locator(`#${id} table td`).count()
  expect(count).toBeGreaterThanOrEqual(cells)
}

const checkForElevation = async page => {
  await expect(page.locator('.report-meta')).toContainText(/elevation \d/i)
}

const checkForTotalPrecipitation = async page => {
  await checkSection(page, 'annual-precipitation', 12)
}

const checkForPrecipitationFrequency = async page => {
  await checkSection(page, 'precipitation-frequency', 270)
}

const checkForSnowfall = async page => {
  await checkSection(page, 'snowfall', 6)
}

const checkForHydrology = async page => {
  await checkSection(page, 'hydrology', 24)
}

const checkForTemperature = async page => {
  await checkSection(page, 'temperature', 36)
}

const checkForTemperatureIndices = async page => {
  await checkSection(page, 'temperature-indices', 36)
}

const checkForPermafrost = async page => {
  await checkSection(page, 'permafrost', 30)
}

test('Check header links', async ({ page }) => {
  await gotoHydrated(page, url)
  await page.setViewportSize({ width: 1728, height: 1078 })

  // Each page has exactly one h1.
  const pages = [
    ['About', 'About this tool'],
    ['Guidance', 'Guidance: using and interpreting Arctic-EDS data'],
    ['Data sources', 'Data sources'],
  ]
  for (const [link, heading] of pages) {
    await page.click(`.navbar-menu a:has-text("${link}")`)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toContainText(heading)
  }

  // The logo leads back home.
  await page.click('.navbar-brand a')
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toContainText(
    'See how far your design parameters shift'
  )
})

test('Check maps', async ({ page }) => {
  const mapUrl = url + '/maps'
  await gotoHydrated(page, mapUrl)
  await page.setViewportSize({ width: 1728, height: 1078 })

  // Wait to ensure all map tiles are loaded.
  await page.waitForTimeout(30000)

  let elements = await page.$$('#precipitation .leaflet-tile-loaded')
  let count = elements.length
  expect(count).toBeGreaterThan(40)

  elements = await page.$$('#permafrost .leaflet-tile-loaded')
  count = elements.length
  expect(count).toBeGreaterThan(40)

  elements = await page.$$('#temperature .leaflet-tile-loaded')
  count = elements.length
  expect(count).toBeGreaterThan(40)
})

test('Select Anchorage and load report', async ({ page }) => {
  test.setTimeout(600000)
  await gotoHydrated(page, url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Anchorage')
  await page.waitForSelector(
    '.dropdown-item > .search-item:has-text("Anchorage")'
  )
  await page.click('.dropdown-item > .search-item:has-text("Anchorage")')
  await expect(page.locator('#results')).toBeVisible({
    timeout: 600000,
  })
  await expect(page.locator('h1')).toHaveText('Anchorage (Dgheyaytnu)', {
    timeout: 600000,
  })

  const sections = [
    'elevation',
    'totalPrecipitation',
    'precipitationFrequency',
    'snowfall',
    'hydrology',
    'temperature',
    'temperatureIndices',
    'permafrost',
  ]
  for (const section of sections) {
    if (sectionFunctions[section]) {
      const sectionFunction = sectionFunctions[section]
      console.log(`Checking section: ${section}`)
      await eval(sectionFunction)(page)
    }
  }
})

test('Select Elmendorf Air Force Base and load report', async ({ page }) => {
  test.setTimeout(600000)
  await gotoHydrated(page, url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Elmendorf Air Force Base')
  await page.waitForSelector(
    '.dropdown-item > .search-item:has-text("Elmendorf Air Force Base")'
  )
  await page.click(
    '.dropdown-item > .search-item:has-text("Elmendorf Air Force Base")'
  )
  await expect(page.locator('#results')).toBeVisible({
    timeout: 600000,
  })
  await expect(page.locator('h1')).toHaveText('Elmendorf Air Force Base', {
    timeout: 600000,
  })

  const sections = [
    'elevation',
    'totalPrecipitation',
    'precipitationFrequency',
    'snowfall',
    'hydrology',
    'temperature',
    'temperatureIndices',
    'permafrost',
  ]
  for (const section of sections) {
    if (sectionFunctions[section]) {
      const sectionFunction = sectionFunctions[section]
      console.log(`Checking section: ${section}`)
      await eval(sectionFunction)(page)
    }
  }
})

test('Select Fairbanks and load report', async ({ page }) => {
  test.setTimeout(600000)
  await gotoHydrated(page, url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Fairbanks')
  await page.waitForSelector(
    '.dropdown-item > .search-item:has-text("Fairbanks")'
  )
  await page.click('.dropdown-item > .search-item:has-text("Fairbanks")')
  await expect(page.locator('#results')).toBeVisible({
    timeout: 600000,
  })
  await expect(page.locator('h1')).toHaveText('Fairbanks', {
    timeout: 600000,
  })

  const sections = [
    'elevation',
    'totalPrecipitation',
    'precipitationFrequency',
    'snowfall',
    'hydrology',
    'temperature',
    'temperatureIndices',
    'permafrost',
  ]
  for (const section of sections) {
    if (sectionFunctions[section]) {
      const sectionFunction = sectionFunctions[section]
      console.log(`Checking section: ${section}`)
      await eval(sectionFunction)(page)
    }
  }
})

test('Select Juneau and load report', async ({ page }) => {
  test.setTimeout(600000)
  await gotoHydrated(page, url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Juneau')
  await page.waitForSelector('.dropdown-item > .search-item:has-text("Juneau")')
  await page.click('.dropdown-item > .search-item:has-text("Juneau")')
  await expect(page.locator('#results')).toBeVisible({
    timeout: 600000,
  })
  await expect(page.locator('h1')).toHaveText("Juneau (Dzánti K'ihéeni)", {
    timeout: 600000,
  })

  const sections = [
    'elevation',
    'totalPrecipitation',
    'precipitationFrequency',
    'snowfall',
    'hydrology',
    'temperature',
    'temperatureIndices',
  ]
  for (const section of sections) {
    if (sectionFunctions[section]) {
      const sectionFunction = sectionFunctions[section]
      console.log(`Checking section: ${section}`)
      await eval(sectionFunction)(page)
    }
  }
})

test('Select Nike Alaska Mike and load report', async ({ page }) => {
  test.setTimeout(600000)
  await gotoHydrated(page, url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Nike Alaska Mike')
  await page.waitForSelector(
    '.dropdown-item > .search-item:has-text("Nike Alaska Mike")'
  )
  await page.click('.dropdown-item > .search-item:has-text("Nike Alaska Mike")')
  await expect(page.locator('#results')).toBeVisible({
    timeout: 600000,
  })
  await expect(page.locator('h1')).toHaveText('Nike Alaska Mike', {
    timeout: 600000,
  })

  const sections = [
    'elevation',
    'totalPrecipitation',
    'precipitationFrequency',
    'snowfall',
    'hydrology',
    'temperature',
    'temperatureIndices',
  ]
  for (const section of sections) {
    if (sectionFunctions[section]) {
      const sectionFunction = sectionFunctions[section]
      console.log(`Checking section: ${section}`)
      await eval(sectionFunction)(page)
    }
  }
})

test('Select Utqiaġvik (Barrow) and load report', async ({ page }) => {
  test.setTimeout(600000)
  await gotoHydrated(page, url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Utqiaġvik')
  await page.waitForSelector(
    '.dropdown-item > .search-item:has-text("Utqiaġvik")'
  )
  await page.click('.dropdown-item > .search-item:has-text("Utqiaġvik")')
  await expect(page.locator('#results')).toBeVisible({
    timeout: 600000,
  })
  await expect(page.locator('h1')).toHaveText('Utqiaġvik (Barrow)', {
    timeout: 600000,
  })

  const sections = [
    'elevation',
    'totalPrecipitation',
    'precipitationFrequency',
    'snowfall',
    'hydrology',
    'temperature',
    'temperatureIndices',
  ]
  for (const section of sections) {
    if (sectionFunctions[section]) {
      const sectionFunction = sectionFunctions[section]
      console.log(`Checking section: ${section}`)
      await eval(sectionFunction)(page)
    }
  }
})

test('Enter 58.1234, -156.1234 and load report', async ({ page }) => {
  test.setTimeout(600000)
  await gotoHydrated(page, url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  // The same search box takes places and coordinates.
  await page.waitForSelector('.place-search .input')
  await page.click('.place-search .input')
  await page.fill('.place-search .input', '58.1234, -156.1234')
  await page.keyboard.press('Enter')

  await expect(page.locator('#results')).toBeVisible({
    timeout: 600000,
  })

  await expect(page.locator('h1')).toHaveText('58.1234°N, 156.1234°W', {
    timeout: 600000,
  })

  const sections = [
    'elevation',
    'totalPrecipitation',
    'precipitationFrequency',
    'snowfall',
    'hydrology',
    'temperature',
    'temperatureIndices',
    'permafrost',
  ]
  for (const section of sections) {
    if (sectionFunctions[section]) {
      const sectionFunction = sectionFunctions[section]
      console.log(`Checking section: ${section}`)
      await eval(sectionFunction)(page)
    }
  }
})

test('Test permalink for Bethel', async ({ page }) => {
  test.setTimeout(600000)
  const permalinkUrl = url + '/report/community/AK36'
  await gotoHydrated(page, permalinkUrl)
  await page.setViewportSize({ width: 1728, height: 1078 })

  await expect(page.locator('#results')).toBeVisible({
    timeout: 600000,
  })

  const sections = [
    'elevation',
    'totalPrecipitation',
    'precipitationFrequency',
    'snowfall',
    'hydrology',
    'temperature',
    'temperatureIndices',
    'permafrost',
  ]
  for (const section of sections) {
    if (sectionFunctions[section]) {
      const sectionFunction = sectionFunctions[section]
      console.log(`Checking section: ${section}`)
      await eval(sectionFunction)(page)
    }
  }
})

// Resilience against unexpected API returns (issues #351, #361). These fake
// the /eds/all response with page.route, using the mock fixture as a known
// good payload, so they don't depend on the live Data API.
const reportFixture = require('../app/assets/mock.json')
const resilienceReportUrl = url + '/report/64.8378/-147.7164'
const systemProblemText =
  'something’s wrong on our end and the app isn’t working right now'

const fulfillReport = (page, body, options = {}) =>
  page.route('**/eds/all/**', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: typeof body === 'string' ? body : JSON.stringify(body),
      ...options,
    })
  )

test('Malformed JSON shows an error instead of breaking the app', async ({
  page,
}) => {
  await fulfillReport(page, '<html>Bad gateway</html>')
  await gotoHydrated(page, resilienceReportUrl)

  await expect(page.locator('text=couldn’t be loaded')).toBeVisible()
  await expect(page.locator(`text=${systemProblemText}`)).toBeVisible()
  await expect(
    page.locator('a[href="mailto:uaf-snap-data-tools@alaska.edu"]').first()
  ).toBeVisible()
  await expect(page.locator('#results')).toHaveCount(0)
  await expect(page.locator('footer')).toBeVisible()
})

test('Server error can be retried', async ({ page }) => {
  await fulfillReport(page, 'Internal Server Error', {
    status: 500,
    contentType: 'text/plain',
  })
  await gotoHydrated(page, resilienceReportUrl)

  await expect(page.locator(`text=${systemProblemText}`)).toBeVisible()

  await page.unroute('**/eds/all/**')
  await fulfillReport(page, reportFixture)
  await page.click('button:has-text("Try again")')

  await expect(page.locator('#results')).toBeVisible()
})

test('Missing report section is skipped', async ({ page }) => {
  const { temperature, ...withoutTemperature } = reportFixture
  await fulfillReport(page, withoutTemperature)
  await gotoHydrated(page, resilienceReportUrl)

  await expect(page.locator('#results')).toBeVisible()
  await expect(page.locator('section#temperature')).toHaveCount(0)
  await expect(page.locator('.report-toc a[href="#temperature"]')).toHaveCount(
    0
  )
  await checkForTotalPrecipitation(page)
})

test('Missing nested key only breaks its own section', async ({ page }) => {
  const results = {
    ...reportFixture,
    temperature: { preview: reportFixture.temperature.preview },
  }
  await fulfillReport(page, results)
  await gotoHydrated(page, resilienceReportUrl)

  await expect(page.locator('#results')).toBeVisible()
  await expect(
    page
      .locator('.section-error', { hasText: 'Air temperature' })
      .locator('text=couldn’t be displayed')
  ).toBeVisible()
  await expect(page.locator('.report-toc a[href="#temperature"]')).toHaveCount(
    0
  )
  // The summary keeps its other rows.
  await expect(page.locator('#summary')).toContainText('Freezing index')
  await checkForTotalPrecipitation(page)
})

test('Place with no data shows a no-data message', async ({ page }) => {
  // What the API returns for a point in the ocean.
  const empty = Object.fromEntries(
    Object.keys(reportFixture).map(key => [key, {}])
  )
  empty.elevation = { max: null, mean: null, min: null }
  await fulfillReport(page, empty)
  await gotoHydrated(page, url + '/report/51.5000/-146.0000')

  await expect(page.locator('text=No data available for')).toBeVisible()
  await expect(page.locator(`text=${systemProblemText}`)).toBeVisible()
  await expect(page.locator('.report-toc')).toHaveCount(0)
  await expect(page.locator('button:has-text("Try again")')).toHaveCount(0)
})

test('Unknown community shows a not-found message', async ({ page }) => {
  await gotoHydrated(page, url + '/report/community/NOPE')

  await expect(page.locator('text=couldn’t find this place')).toBeVisible()
})

test('Community list failure hides the autocomplete', async ({ page }) => {
  await page.route('**/places/communities**', route => route.abort())
  await gotoHydrated(page, url)

  await expect(
    page.locator('text=the community list cannot be loaded')
  ).toBeVisible()
  await expect(page.locator('text=Alaska community name')).toHaveCount(0)
  // The lat/lng search is the remaining way in, so it has to stay.
  await expect(page.locator('.right .input')).toBeVisible()
})
