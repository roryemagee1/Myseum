/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('http://localhost:3000/')

  cy.intercept('GET', `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&q=sunflower`, {
    fixture: 'search-id-results.json'
  }).as('getIDs')
})

describe('HomePage Tests', () => {
  it('should display the home url when the webpage loads', () => {
    cy.url()
      .should('eq', 'http://localhost:3000/');
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

  it('Should have an input field that updates to reflect what is typed in it', () => {
    cy.get('input')
      .type('sunflower')
      .should('have.value', 'sunflower')
  })

  it('The input submission button should not execute the search function unless the input is not empty', () => {
    cy.get('input')
      .should('have.value', '')
      .click()

    cy.get('spinner').should('not.exist')
  })

  it('Should update the url path to include the search query upon search submission', () => {
    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()
    
    cy.url()
      .should('eq', 'http://localhost:3000/search/sunflower')
  })

  it('Should show a grid of paintings equal to the number of IDs returned with paintings associated with them', () => {
    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()

    cy.get('.image')
      .should('have.attr', 'src')
    
    cy.get('.grid')
      .children()
      .should('have.length', 14)
  })

})