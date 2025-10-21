const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    // reset test database
    await request.post('/api/testing/reset')
    // add user
    await request.post('/api/users', {
      data: {
        username: 'testusername',
        name: 'test name',
        password: 'password'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    // Check that the Login-header is visible
    const locator = page.getByText('Login', {exact: true})
    // console.log(locator)
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test.only('succeeds with correct credentials', async ({ page }) => {
      // ...
    })

    test('fails with wrong credentials', async ({ page }) => {
      // ...
    })
  })

})