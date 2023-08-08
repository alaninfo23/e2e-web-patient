import * as loginHelper from "../e2e/helpers/loginHelper";

Cypress.Commands.add("getByDataTestID", (seletor: string) => {
  return cy.get(`[data-testid=${seletor}]`);
});

Cypress.Commands.add("loginWebPatient", (email: string, senha: string) => {
  cy.visit("https://qa.faethdigitalhealth.com/");
  cy.get(loginHelper.INPUT_LOGIN_EMAIL).type(email);
  cy.get(loginHelper.INPUT_LOGIN_PASSWORD).type(senha);
  cy.get(loginHelper.LINK_REMEMBER_ME).check();
  cy.get(loginHelper.BUTTON_LOGIN).click();
});

let loggedIn = false; // Variável para controlar o estado do login

Cypress.Commands.add("loginWebAdmin", (email: string, senha: string) => {
  if (!loggedIn) {
    cy.visit("https://qa.care.faethdigitalhealth.com/");
    cy.get(loginHelper.INPUT_LOGIN_EMAIL).type(email);
    cy.get(loginHelper.INPUT_LOGIN_PASSWORD).type(senha);
    cy.get(loginHelper.BUTTON_LOGIN).click();
    loggedIn = true; // Definir a variável loggedIn como true após fazer o login
  } else {
    // Se já estiver logado, apenas vá para a página inicial
    cy.visit("https://qa.care.faethdigitalhealth.com/");
  }
});