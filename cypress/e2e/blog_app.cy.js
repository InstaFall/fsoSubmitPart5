describe('Blog app', function() {
  beforeEach( function() {
    const user = {
      name: 'Phenomenal',
      username: 'phenomenal',
      password: 'uncrackable'
    }

    cy.request('POST','http://localhost:3003/api/testing/reset')
      .then(() => {
        cy.request('POST','http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')})
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
      cy.login({ username:'phenomenal', password: 'uncrackable' })
    })
    const newBlog = {
      title: 'This blog is added by test',
      author: 'Test Author',
      url: 'http://example.org'
    }

    it('a blog can be added', () => {
      cy.contains('add').click()
      cy.get('input[name="title"]').type(newBlog.title)
      cy.get('input[name="author"]').type(newBlog.author)
      cy.get('input[name="url"]').type(newBlog.url)
      cy.contains('create').click()

      cy.contains('This blog is added by test')
    })

    describe('and a blog is present', () => {
      beforeEach(() => {
        cy.addBlog(newBlog)
      })
      it('delete button is present when user is correct', () => {
        cy.contains('view').click()
        cy.contains('delete')
      })

      it('delete button is not present when user is different', () => {
        cy.request('POST', 'http://localhost:3003/api/users', { username: 'second', password: 'password' })
        cy.contains('log out').click()
        cy.request('POST', 'http://localhost:3003/api/login', { username: 'second', password: 'password' })
          .then((res) => {
            localStorage.setItem('loggedUser', JSON.stringify(res.body))
            cy.visit('http://localhost:3000')
          })
        cy.contains('view').click()
        cy.contains('delete').should('not.exist')
      })

      it('blog can be liked', () => {
        cy.contains('This blog is added by test')
          .parent().contains('view').click()
        cy.contains('This blog is added by test').parent().contains('Likes: 0')
        cy.contains('This blog is added by test').parent().contains('like').click()
        cy.contains('This blog is added by test').parent().contains('Likes: 1')
      })

      it('blog can be deleted', () => {
        cy.contains('This blog is added by test')
          .parent().contains('view').click()
        cy.contains('This blog is added by test').parent().contains('delete').click()
        cy.contains(' is deleted!')
        cy.contains('li','This blog is added by test').should('not.exist')
      })
    })

    it.only('blogs are sorted by likes', () => {
      const secondBlog = {
        title: 'This will move up after liking',
        author: 'Author Second',
        url: 'http://example.org'
      }
      cy.addBlog(newBlog)
      cy.addBlog(secondBlog)
      cy.get('.simpleview').eq(0).contains('view').click()
      cy.contains('view').click()
      cy.get('.fullview').eq(0).contains('like').click() //First blog has 1 likes
      cy.wait(300)
      cy.get('.fullview').eq(1).contains('like').click() //Second blog has 1 likes
      cy.wait(300)
      cy.get('.fullview').eq(1).contains('like').click() //Second blog has 2 likes
      cy.wait(300)
      cy.get('.fullview').eq(0).should('contain','This will move up after liking')
      cy.get('.fullview').eq(1).should('contain','This blog is added by test')
    })
  })


})