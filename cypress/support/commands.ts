/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => {  })
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import 'cypress-localstorage-commands';

Cypress.Commands.add('loginWithRequest', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND_URL')}/graphql`,
    body: {
      operationName: 'Login',
      variables: {
        email: 'v@gmail.com',
        password: 'password',
      },
      query: `mutation Login($email: String!, $password: String!) {
        login(input: {email: $email, password: $password}) {
          user {
           username
           __typename
          }
          token
          errors
          __typename
        }
      }`,
    },
  })
    .its('body')
    .then((body) => {
      console.log(body.data.login.token);
      cy.setLocalStorage('token', body.data.login.token);
    });
});

Cypress.Commands.add('loginWithLocalStorage', () => {
  cy.setLocalStorage('token', Cypress.env('VITE_TOKEN_TEST'));
});
