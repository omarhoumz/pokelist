context('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads 20 elements on first load', () => {
    cy.wait(2000)
    cy.get('[data-testid=cards-wrapper]').children().should('have.length', 20)
  })

  it('loads 20 more elements when clicking on the "load more" button', async () => {
    cy.wait(2000)
    cy.get('[data-testid=btn-next]').click()
    cy.wait(2000)
    // TODO: get this as a fixture
    // Normally we get this from the api
    const firstPokemon = 'spearow'

    cy.get('[data-testid=cards-wrapper]')
      .children()
      .first()
      .should('have.text', firstPokemon)
  })
})
