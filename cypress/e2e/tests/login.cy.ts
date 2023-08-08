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

  it.only("should to do login with success", () => {
    cy.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );
    cy.contains("Where do you want to go next?").should("be.visible");
  });

  it("should show error message when login and user is incorrect", () => {
    cy.loginWebPatient(
      Cypress.env("emailIncorrect"),
      Cypress.env("passwordIncorrect")
    );
    cy.get(loginHelper.ALERT_MSG_LOGIN_INCORRECT)
      .should("be.visible")
      .contains("Incorrect username or password.");
  });

  it("should show error if login without username and password", () => {
    cy.loginWebPatient(Cypress.env("emailEmpty"), Cypress.env("passwordEmpty"));
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
