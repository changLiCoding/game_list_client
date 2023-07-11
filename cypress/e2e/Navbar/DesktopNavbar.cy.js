/// <reference types="cypress" />

// https://on.cypress.io/introduction-to-cypress

describe('Navbar', () => {
  it('displays default Navbar', () => {
    cy.visit('http://localhost:5173/home');
    cy.contains('Home');
    cy.contains('Profile');
    cy.contains('Game List');
    cy.contains('Sign In');
  });

  it('displays Navbar profile popover when signed in', () => {
    cy.login();
    cy.visit('http://localhost:5173/home');

    cy.contains('Settings').should('not.exist');
    cy.contains('Logout').should('not.exist');

    cy.get(`[data-testid="profile-image"]`).click();

    cy.contains('Settings');
    cy.contains('Logout');
  });
});
