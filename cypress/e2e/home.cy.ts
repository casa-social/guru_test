import Hero from '../../src/models/Hero';

describe('Home spec', () => {
  type heroes = Hero[];
  let mockup_heroes: heroes = [];
  beforeEach(() => {
    cy.fixture('heroes.json').then((heroes) => {
      mockup_heroes = heroes.data;
    });
    cy.intercept(
      'POST',
      'http://localhost:3000/heroes',
    ).as('add_hero');
  });
  it('Add hero success test', () => {
    cy.visit('http://localhost:5000/');
    cy.contains('button', 'Add hero');
    cy.get('button#add_hero').click();
    cy.get('input#avatarUrl')
      .type(mockup_heroes[0].avatarUrl)
      .should('have.value', mockup_heroes[0].avatarUrl);
    cy.get('input#fullName')
      .type(mockup_heroes[0].fullName)
      .should('have.value', mockup_heroes[0].fullName);
    cy.get('select#heroType')
      .select(mockup_heroes[0].type.id)
      .should('have.value', mockup_heroes[0].type.id);
    cy.get('textarea#description')
      .type(mockup_heroes[0].description)
      .should('have.value', mockup_heroes[0].description);
    cy.get('button#save').click();
    cy.wait('@add_hero').its('response.statusCode').should('eq', 201)
    });
  });
