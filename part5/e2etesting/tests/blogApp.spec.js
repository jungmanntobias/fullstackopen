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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('testusername')
      await page.getByLabel('password').fill('password')
      await page.getByRole('button').click()
    })

    test('a new blog can be created', async ({ page }) => {
      
      await page.getByRole('button', { name: 'create new blog' }).click()

      // Modify inputs
      await page.getByLabel('title').fill('new title')
      await page.getByLabel('author').fill('new author')
      await page.getByLabel('url').fill('new url')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('a new blog new title', { exact: false })).toBeVisible()
    })
  })

    describe('When logged in and a blog exists', () => {
      beforeEach(async ({ page }) => {
        // Login
        await page.getByLabel('username').fill('testusername')
        await page.getByLabel('password').fill('password')
        await page.getByRole('button').click()

        // Add blog
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByLabel('title').fill('new title')
        await page.getByLabel('author').fill('new author')
        await page.getByLabel('url').fill('new url')
        await page.getByRole('button', { name: 'create' }).click()
        await page.getByText('new title: new author').waitFor()
      })

      test('a blog can be liked', async ({ page }) => {
        // click view
        await page.getByRole('button', { name: 'view' }).first().click()

        // check that likes turn from 0 to 1
        const likes = page.getByText('likes:', { exact: false })
        await expect(likes).toBeVisible()
        await expect(likes).toContainText('likes: 0')

        await page.getByRole('button', { name: 'like' }).click()
        await expect(likes).toContainText('likes: 1')
      })

      test('a blog can be deleted by its owner', async ({ page }) => {
        // click view
        await page.getByRole('button', { name: 'view' }).first().click()

        // click delete (and accept the dialog)
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'delete' }).first().click()

        // check that likes turn from 0 to 1
        await expect(page.getByText('new title: new author', { exact: false })).not.toBeVisible()
      })
    })
})