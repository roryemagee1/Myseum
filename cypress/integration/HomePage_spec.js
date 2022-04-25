/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('http://localhost:3000/')

  cy.intercept('GET', `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&q=sunflower`, {
    fixture: 'search-id-results.json'
  }).as('getIDs')

  cy.intercept('GET', `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&q=asdfasdf`, {
    fixture: 'search-id-no-results.json'
  }).as('noIDs')

  cy.intercept('GET', `https://collectionapi.metmuseum.org/public/collection/v1/objects/436524`, {
    fixture: 'search-painting-1.json'
  }).as('getPainting1')

  cy.intercept('GET', `https://collectionapi.metmuseum.org/public/collection/v1/objects/816522`, {
    fixture: 'search-painting-2.json'
  }).as('getPainting2')

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

  it('Should contain a form with an input field, a submission button, and a button for showing saved paintings', () => {
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

    cy.wait(2000)
    
    cy.url()
      .should('eq', 'http://localhost:3000/search/sunflower')
  })

  it('Should show a grid of paintings equal to the number of IDs returned with paintings associated with them', () => {
    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()

    cy.wait(2000)

    cy.get('.painting-image')
      .should('have.attr', 'src')
    
    cy.get('.grid')
      .children()
      .should('have.length', 1)
  })

  it('Should display an error message when no paintings match the search criteria', () => {
    cy.get('input')
      .type('asdfasdf')
    
    cy.get('.search-button')
      .click()

    cy.wait(2000)

    cy.get('h1')
      .contains('No paintings match that search.')
  })

  it('Should be able to save a painting when the user clicks on the Save button', () => {
    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()
    
    cy.wait(2000)

    cy.get('.save-button')
      .first()
      .click()

    cy.get('.save-button')
      .first()
      .contains('Saved!')
  })

  it('Should be able to save multiple paintings', () => {
    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()
    
    cy.wait(2000)

    cy.get('.save-button')
      .click({multiple: true})

    cy.get('.save-button')
      .first()
      .contains('Saved!')
  })

  it('Should update the url path when the user clicks View Saved Paintings button', () => {
    cy.get('.view-saves')
      .click()
    
    cy.url()
      .should('eq', 'http://localhost:3000/saves')
  })

  it('Should be able to view a saved painting after clicking on the View Saved Paintings button', () => {
    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()
    
    cy.wait(2000)

    cy.get('.save-button')
      .first()
      .click()

    cy.get('.save-button')
      .first()
      .contains('Saved!')

    cy.get('.view-saves')
      .click()

    cy.get('.painting-image')
      .should('have.attr', 'src')
      .and('eq', 'https://images.metmuseum.org/CRDImages/ep/original/DP-19714-001.jpg')

    cy.get('.grid')
      .children()
      .should('have.length', 1)
  })

  it('Should be able to save multiple paintings', () => {
    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()
    
    cy.wait(2000)

    cy.get('.save-button')
      .click({ multiple: true })
    
    cy.get('.view-saves')
      .click()

    cy.get('.grid')
      .children()
      .should('have.length', 1)
  })

  it('Should be able to delete a saved painting from the Saved Painting View by click the Unsave button', () => {
    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()

    cy.wait(2000)

    cy.get('.save-button')
      .first()
      .click()

    cy.get('.save-button')
      .first()
      .contains('Saved!')

    cy.get('.view-saves')
      .click()

    cy.get('.painting-image')
      .should('have.attr', 'src')
      .and('eq', 'https://images.metmuseum.org/CRDImages/ep/original/DP-19714-001.jpg')

    cy.get('.save-button')
      .click()

    cy.get('.grid')
      .children()
      .should('have.length', 0)
  })

  it('Should be able to return to the previous search results by clicking the Return to Search button on the saves page', () => {
    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()
    
    cy.wait(2000)

    cy.get('.save-button')
      .first()
      .click()

    cy.get('.save-button')
      .first()
      .contains('Saved!')

    cy.get('.view-saves')
      .click()

    cy.url()
    .should('eq', 'http://localhost:3000/saves')

    cy.get('.home-button')
      .click()

    cy.url()
      .should('eq', 'http://localhost:3000/')

    cy.get('.grid')
      .children()
      .should('have.length', 1)
  })

  it('Should not duplicate a painting in the saves section if the painting has already been searched before', () => {
    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()

    cy.wait(2000)

    cy.get('.save-button')
      .first()
      .click()

    cy.get('.save-button')
      .first()
      .contains('Saved!')

    cy.get('.view-saves')
      .click()

    cy.url()
      .should('eq', 'http://localhost:3000/saves')

    cy.get('.home-button')
      .click()

    cy.url()
     .should('eq', 'http://localhost:3000/')

    cy.get('input')
      .type('sunflower')
    
    cy.get('.search-button')
      .click()
    
    cy.wait(2000)

    cy.get('.save-button')
      .first()
      .click()

    cy.get('.save-button')
      .first()
      .contains('Saved!')

    cy.get('.view-saves')
      .click()

    cy.url()
      .should('eq', 'http://localhost:3000/saves')

    cy.get('.grid')
      .children()
      .should('have.length', 1)
  })

  it('Should redirect the user to the home page if they type an invalid url', () => {
    cy.visit('http://localhost:3000/asdfasdf')

    cy.url()
      .should('eq','http://localhost:3000/')
  })

})