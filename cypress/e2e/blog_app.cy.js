describe('Blog app', function() {
  beforeEach( function() {
    const user = {
      name: 'Phenomenal',
      username: 'phenomenal',
      password: 'uncrackable'
    }
    cy.request('POST','http://localhost:3003/api/testing/reset')
      .then(() => cy.request('POST','http://localhost:3003/api/users', user))
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('log in')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  describe('Login', async () => {
    it('succeeds with valid user credentials', () => {
      cy.contains('log in').click()
      cy.get('#username').type('phenomenal')
      cy.get('#password').type('uncrackable')
      cy.get('#login-button').click()
      cy.contains('phenomenal logged in')
    })

    it('fails with wrong credentials ', function() {
      cy.contains('log in').click()
      cy.get('#username').type('phenomenal')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain','Invalid credentials')
        .and('have.css','color','rgb(216, 0, 12)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('phenomenal')
      cy.get('#password').type('uncrackable')
      cy.get('#login-button').click()
    })

    it('a blog can be added', () => {
      const newBlog = {
        title: 'This blog is added by test',
        author: 'Test Author',
        url: 'http://example.org'
      }
      cy.contains('add').click()
      cy.get('input[name="title"]').type(newBlog.title)
      cy.get('input[name="author"]').type(newBlog.author)
      cy.get('input[name="url"]').type(newBlog.url)
      cy.contains('create').click()

      cy.contains('This blog is added by test')
    })
  })
})