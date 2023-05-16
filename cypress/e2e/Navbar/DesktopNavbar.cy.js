/// <reference types="cypress" />

// https://on.cypress.io/introduction-to-cypress

describe('Navbar', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('displays default Navbar', () => {
    cy.contains('Home')
    cy.contains('Profile')
    cy.contains('Game List') 
    cy.contains('Sign In')
  })
  
  it('displays Navbar profile popover when signed in', () => {
      cy.setCookie('token', Cypress.env('VITE_TOKEN_TEST'))
      cy.setLocalStorage('token', Cypress.env('VITE_TOKEN_TEST'))
      cy.reload()

      cy.contains('Settings').should('not.exist')
      cy.contains('Logout').should('not.exist')

      cy.get(`.ant-image-img`).click()
      
      cy.contains('Settings') 
      cy.contains('Logout')
  })
})
