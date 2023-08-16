Cypress.Commands.add("getByDataTestID", (seletor: string) => {
  return cy.get(`[data-testid=${seletor}]`);
});