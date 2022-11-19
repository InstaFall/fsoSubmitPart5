describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Phenomenal',
      username: 'phenomenal',
      password: 'uncrackable'
    }
    cy.request('POST','http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('log in')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can login', function() {
    cy.contains('log in').click()
    cy.get('#username').type('phenomenal')
    cy.get('#password').type('uncrackable')
    cy.get('#login-button').click()

    cy.contains('phenomenal logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('phenomenal')
      cy.get('#password').type('uncrackable')
      cy.get('#login-button').click()
    })
  })
})