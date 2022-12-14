// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username,password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', ({ username, password }))
    .then((res) => {
      localStorage.setItem('loggedUser', JSON.stringify(res.body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('addBlog', (newBlog) => {
  cy.contains('add').click()
  cy.get('input[name="title"]').type(newBlog.title)
  cy.get('input[name="author"]').type(newBlog.author)
  cy.get('input[name="url"]').type(newBlog.url)
  cy.contains('create').click()
})