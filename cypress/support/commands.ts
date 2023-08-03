import * as loginHelper from "../e2e/helpers/loginHelper";

Cypress.Commands.add("getByDataTestID", (seletor: string) => {
  return cy.get(`[data-testid=${seletor}]`);
});

Cypress.Commands.add("login", (email: string, senha: string) => {
  cy.visit("https://qa.faethdigitalhealth.com/");
  cy.get(loginHelper.INPUT_LOGIN_EMAIL).type(email);
  cy.get(loginHelper.INPUT_LOGIN_PASSWORD).type(senha);
  cy.get(loginHelper.LINK_REMEMBER_ME).check();
  cy.get(loginHelper.BUTTON_LOGIN).click();
  cy.wait(1000);
});
