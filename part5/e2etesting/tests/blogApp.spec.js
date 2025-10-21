const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    // Check that the Login-header is visible
    const locator = page.getByText('Login', {exact: true})
    // console.log(locator)
    await expect(locator).toBeVisible()
  })
})