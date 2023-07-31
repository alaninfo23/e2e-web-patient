describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display text: Welcome Back", () => {
    cy.contains("Welcome Back");
  });

  it("should display text: Please enter your account information", () => {
    cy.contains("Please enter your account information");
  });

  it("should display text: Don't have an account yet?", () => {
    cy.contains("Don't have an account yet?");
  });

  it("should check if selection box 'Keep me logged in' is unchecked", () => {
    cy.get('input[name="rememberMe"]').should("not.be.checked");
  });

  it("should display fields email, password and login button.", () => {
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should to do login with success", () => {
    cy.login(Cypress.env("email"), Cypress.env("senha"));
  });
});

describe("Forgot password page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display text: Don't have an account yet?", () => {
    // Obter a URL atual da página antes de clicar no link
    cy.url().then((currentURL) => {
      // Use cy.contains para selecionar o link pelo texto do link
      cy.contains("Forgot password?").click();
      // Verificar se a URL atual após clicar no link corresponde à URL esperada
      cy.url().should(
        "eq",
        "https://qa.faethdigitalhealth.com/forgot-password"
      );
    });
  });

  it("should check if the page 'Forgot password?' open correctly", () => {
    cy.get('a[href="/forgot-password"]').click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/forgot-password");
    cy.contains("Reset Password");
    cy.contains(
      "Please complete the field below with your email address associated to your Faeth account"
    );
    cy.get('input[name="email"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });
});

describe("Create new account page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should check if the page 'Forgot password?' open correctly", () => {
    cy.get('a[href="/create-account"]').click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/create-account");
    cy.contains("What describes you best?");
    cy.contains("Step 1 of 7");
    cy.get('button[type="button"]').contains("I am a Patient.").should('exist');
    cy.get('button[type="button"]').contains("I am a Caretaker.").should('exist');
  });
});
