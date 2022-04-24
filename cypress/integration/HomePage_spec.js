/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('http://localhost:3000/')
})

describe('Basic Tests', () => {
  it('should display the home url when the webpage loads', () => {
    cy.url().should('eq', 'http://localhost:3000/');
  })
  it('Should contain a blank canvas image', () => {
    cy.get()
  })
})