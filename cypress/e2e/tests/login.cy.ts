import { faker } from "@faker-js/faker";
import * as loginHelper from "../helpers/loginHelper";

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

  it("should display text label: Email", () => {
    cy.getByDataTestID("EMAIL_TEXT_FIELD").contains("Email");
  });

  it("should display text: Don't have an account yet?", () => {
    cy.contains("Don't have an account yet?");
  });

  it("should display text: Keep me logged in?", () => {
    cy.contains("Keep me logged in");
  });
  it("should check if selection box 'Keep me logged in' is unchecked", () => {
    cy.get(loginHelper.LINK_REMEMBER_ME).should("not.be.checked");
  });

  it("should display fields email visible.", () => {
    cy.get(loginHelper.INPUT_LOGIN_EMAIL).should("be.visible");
  });

  it("should display fields password visible.", () => {
    cy.get(loginHelper.INPUT_LOGIN_PASSWORD).should("be.visible");
  });

  it("should display login button visible.", () => {
    cy.get(loginHelper.BUTTON_LOGIN).should("be.visible");
  });

  it("should display link Forgot password? is visible.", () => {
    cy.get(loginHelper.LINK_CREATE_NEW_ACCOUNT).should("be.visible");
  });

  it("should display link Create new account? is visible.", () => {
    cy.get(loginHelper.LINK_REMEMBER_ME).should("exist");
  });

  it("should to do login with success", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.contains("Where do you want to go next?");
  });

  it("should show error message when login and user is incorrect", () => {
    cy.login(Cypress.env("emailIncorrect"), Cypress.env("passwordIncorrect"));
    cy.get(".MuiAlert-message")
      .should("be.visible")
      .contains("Incorrect username or password.");
  });

  it("should show error if login without username and password", () => {
    cy.login(Cypress.env("emailEmpty"), Cypress.env("passwordEmpty"));
    cy.contains("Email is a required field");
    cy.contains("Password is a required field");
  });

  it("should show password when user click in button show password.", () => {
    const passwordTest = "@Abc123";
    cy.get(loginHelper.INPUT_LOGIN_PASSWORD).type(passwordTest);
    cy.get(loginHelper.BUTTON_SHOW_HIDDEN).click();
    cy.get(loginHelper.INPUT_LOGIN_PASSWORD).should(
      "have.attr",
      "type",
      "text"
    );
  });

  it("should hidden password when user click in button hidden password.", () => {
    const passwordTest = "@Abc123";
    cy.get(loginHelper.INPUT_LOGIN_PASSWORD).type(passwordTest);
    cy.get(loginHelper.INPUT_LOGIN_PASSWORD).should(
      "have.attr",
      "type",
      "password"
    );
  });
});

describe("Forgot password page", () => {
  it("should check if the page 'Forgot password?' open correctly", () => {
    cy.visit("/");
    cy.get(loginHelper.LINK_FORGOT_PASSWORD).click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/forgot-password");
    cy.contains("Reset Password");
    cy.contains(
      "Please complete the field below with your email address associated to your Faeth account"
    );
    cy.get('input[name="email"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should show error message when email is empty", () => {
    cy.visit("https://qa.faethdigitalhealth.com/forgot-password");
    cy.get('button[type="submit"]').click();
    cy.contains("Please type a valid email format.");
  });

  it("should show error message when email is invalid", () => {
    cy.visit("https://qa.faethdigitalhealth.com/forgot-password");
    cy.get('input[name="email"]').type("test@@test.com");
    cy.get('button[type="submit"]').click();
    cy.contains("Please type a valid email format.");
  });

  it("should open the reset-password page after typing email and clicking confirm", () => {
    cy.visit("https://qa.faethdigitalhealth.com/forgot-password");
    const emailFake = faker.internet.email();

    // Captura a parte inicial e final do email gerado, cortando a parte ".com"
    const [username, domain] = emailFake.split("@");
    const domainWithoutCom = domain.replace(".com", "");
    const emailPart = `${username.substr(0, 1)}***@${domainWithoutCom.substr(
      0,
      1
    )}***`;
    cy.get('input[name="email"]').type(emailFake);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/reset-password");
    cy.contains("We sent you a code via email");
    cy.contains(`Please enter the 6 digit code sent to ${emailPart}`);
    cy.contains("Enter your new password");
    cy.contains("Confirm New Password");
  });

  it("should show message 'We sent you a code via email'", () => {});
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
    cy.get('button[type="button"]').contains("I am a Patient.").should("exist");
    cy.get('button[type="button"]')
      .contains("I am a Caretaker.")
      .should("exist");
  });
});
