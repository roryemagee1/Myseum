/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('http://localhost:3000/')
})

describe('HomePage Tests', () => {
  it('should display the home url when the webpage loads', () => {
    cy.url().should('eq', 'http://localhost:3000/');
  })

  it('Should contain an art exhibit background image, a blank canvas, and a Myseum header', () => {
    cy.get('.background')
      .should('have.attr', 'src')
      .and('contain', '/static/media/ArtExhibit.73a73c5419becb2a9d24.jpeg')

    cy.get('.easel')
    .should('have.attr', 'src')
    .and('contain', '/static/media/easelandcanvas.b7ffcfe6e6fd17ea82e1.png')

    cy.get('h1')
      .contains('Myseum')
  })

  it('Should contain a blank canvas image', () => {
    cy.get('.easel')
      .should('have.attr', 'src')
      .and('contain', '/static/media/easelandcanvas.b7ffcfe6e6fd17ea82e1.png')
  })

  it('Should contain a Myseum header', () => {
    cy.get('h1')
      .contains('Myseum')
  })

  it('Should contain a form with an input field, a submission button, and a button for showing saved paitnings', () => {
    cy.get('form')
      .children()
      .should('have.length', 3)

    cy.get('input')
      .should('have.attr', 'placeholder')
      .and('eq', 'Search')

    cy.get('.search-button')
      .contains('Go')

    cy.get('.view-saves')
      .should('have.attr', 'value')
      .and('eq', 'toSaves')
  })
})