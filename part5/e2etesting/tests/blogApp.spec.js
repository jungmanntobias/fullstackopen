const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
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
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testusername')
      await page.getByLabel('password').fill('password')
      await page.getByRole('button').click()

      await expect(page.getByText('logged in', { exact: false })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testusername')
      await page.getByLabel('password').fill('wrongpassword')
      await page.getByRole('button').click()

      await expect(page.getByText('wrong credentials', { exact: false })).toBeVisible()
      await expect(page.getByText('logged in', { exact: false })).not.toBeVisible()
    })
  })

})