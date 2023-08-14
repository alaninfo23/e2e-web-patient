import moment from "moment";
import "moment/min/locales";

Cypress.Commands.add("getByDataTestID", (seletor: string) => {
  return cy.get(`[data-testid=${seletor}]`);
});