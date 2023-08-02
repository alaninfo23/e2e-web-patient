import * as loginHelper from "../e2e/login/helpers/loginHelper";

Cypress.Commands.add("getByData", (seletor) => {
  return cy.get(`[data-test=${seletor}]`);
});

Cypress.Commands.add("login", (email, senha) => {
  cy.visit("https://qa.faethdigitalhealth.com/");
  cy.get(loginHelper.INPUT_LOGIN_EMAIL).type(email);
  cy.get(loginHelper.INPUT_LOGIN_PASSWORD).type(senha);
  cy.get(loginHelper.LINK_REMEMBER_ME).check();
  cy.get(loginHelper.BUTTON_LOGIN).click();
  cy.wait(1000);
});
