import { test, expect } from '@playwright/test'

const url = 'http://localhost:3000'

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

const checkElementsForSubstring = async (elements, substr) => {
  let text
  for (let i = 0; i < elements.length; i++) {
    text = await elements[i].innerText()
    return text.includes(substr)
  }
  return false
}

const checkForElevation = async page => {
  let elements = await page.$$('#results div:has-text("elevation") strong')
  let element = elements[elements.length - 1]
  let text = await element.textContent()
  expect(text).toMatch(/^\d+/)
}

const checkForTotalPrecipitation = async page => {
  let elements = await page.$$('div:has(> #annual-precipitation) table td')
  let count = elements.length
  expect(count).toBeGreaterThan(40)
}

const checkForPrecipitationFrequency = async page => {
  let elements = await page.$$('div:has(> #precipitation-frequency) table td')
  let count = elements.length
  expect(count).toBeGreaterThan(120)
}

const checkForSnowfall = async page => {
  let elements = await page.$$('div:has(> #snowfall) table td')
  let count = elements.length
  expect(count).toBeGreaterThan(35)
}

const checkForHydrology = async page => {
  let elements = await page.$$('div:has(> #hydrology) table td')
  let count = elements.length
  expect(count).toBeGreaterThan(150)
}

const checkForTemperature = async page => {
  let elements = await page.$$('div:has(> #temperature) table td')
  let count = elements.length
  expect(count).toBeGreaterThan(120)
}

const checkForTemperatureIndices = async page => {
  let elements = await page.$$('div:has(> #temperature-indices) table td')
  let count = elements.length
  expect(count).toBeGreaterThan(130)
}

const checkForPermafrost = async page => {
  let elements = await page.$$('div:has(> div > #permafrost) table td')
  let count = elements.length
  expect(count).toBeGreaterThan(130)
}

test('Check header links', async ({ page }) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })

  let elements
  let substring
  let substringFound

  await page.click('.nav-wrapper ol li:has-text("About")')
  elements = page.locator('.content h2')
  substring = 'About this tool'
  substringFound = checkElementsForSubstring(elements, substring)
  expect(substringFound).toBeTruthy()

  await page.click('.nav-wrapper ol li:has-text("Glossary")')
  elements = page.locator('.content h2')
  substring = 'Glossary of terms'
  substringFound = checkElementsForSubstring(elements, substring)
  expect(substringFound).toBeTruthy()

  await page.click('.nav-wrapper ol li:has-text("Guidance")')
  elements = page.locator('.content h2')
  substring = 'Guidance: using and interpreting Arctic-EDS data'
  substringFound = checkElementsForSubstring(elements, substring)
  expect(substringFound).toBeTruthy()

  await page.click('.nav-wrapper ol li:has-text("Maps")')
  elements = page.locator('.content h2')
  substring = 'Statewide Climate Overview Maps'
  substringFound = checkElementsForSubstring(elements, substring)
  expect(substringFound).toBeTruthy()
})

test('Check maps', async ({ page }) => {
  const mapUrl = url + '/maps'
  await page.goto(mapUrl)
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
  await page.goto(url)
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
  await expect(page.locator('text=Anchorage (Dgheyaytnu)').first()).toBeVisible(
    {
      timeout: 600000,
    }
  )

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
  await page.goto(url)
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
  await expect(
    page.locator('text=Elmendorf Air Force Base, Alaska').first()
  ).toBeVisible({
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
  await page.goto(url)
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
  await expect(page.locator('text=Fairbanks, Alaska').first()).toBeVisible({
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
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Juneau')
  await page.waitForSelector('.dropdown-item > .search-item:has-text("Juneau")')
  await page.click('.dropdown-item > .search-item:has-text("Juneau")')
  await expect(page.locator('#results')).toBeVisible({
    timeout: 600000,
  })
  await expect(
    page.locator("text=Juneau (Dzánti K'ihéeni), Alaska").first()
  ).toBeVisible({
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
  await page.goto(url)
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
  await expect(
    page.locator('text=Nike Alaska Mike, Alaska').first()
  ).toBeVisible({
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
  await page.goto(url)
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
  await expect(
    page.locator('text=Utqiaġvik (Barrow), Alaska').first()
  ).toBeVisible({
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
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.right .input')
  await page.click('.right .input')
  await page.fill('.right .input', '58.1234, -156.1234')
  await page.keyboard.press('Enter')

  await expect(page.locator('#results')).toBeVisible({
    timeout: 600000,
  })

  await expect(page.locator('text=58.1234, -156.1234').first()).toBeVisible({
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
  await page.goto(permalinkUrl)
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
