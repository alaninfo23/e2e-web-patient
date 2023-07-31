Cypress.Commands.add('getByData', (seletor) => {
    return cy.get(`[data-test=${seletor}]`);
  });

  Cypress.Commands.add("login", (email, senha) => {
    cy.visit("https://qa.faethdigitalhealth.com/");
    cy.get('input[name="username"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('input[name="rememberMe"]').check();
    cy.get('button[type="submit"]').click();
  });