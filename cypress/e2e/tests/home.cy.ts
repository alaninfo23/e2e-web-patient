import * as homeHelpers from "../helpers/homeHelpers";
import moment from "moment";
import { faker } from "@faker-js/faker";

describe("Home page", () => {
  context("Surveys", () => {
    it("should open Surveys correctly", () => {
      cy.loginWebPatient(
        Cypress.env("emailWebPatient"),
        Cypress.env("passwordWebPatient")
      );
      cy.get(homeHelpers.BUTTON_SURVEY_CARD("Surveys"))
        .should("be.visible")
        .click();
      cy.url().should("eq", "https://qa.faethdigitalhealth.com/surveys");
      cy.contains(
        "This is how your Coach can stay in the loop, all information is confidential between the two of you."
      );
    });

    it("should show the Welcome Survey", () => {
      cy.loginWebPatient(
        Cypress.env("emailWebPatient"),
        Cypress.env("passwordWebPatient")
      );
      cy.get(homeHelpers.BUTTON_SURVEY_CARD("Surveys"))
        .should("be.visible")
        .click();
      cy.getByDataTestID("SURVEY_CARD_Welcome").click();
      cy.contains("Welcome to the Faeth Community");
      cy.get("button[type='submit']").click();
    });
  });

  it("should open Chat correctly", () => {
    cy.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );
    cy.get(homeHelpers.BUTTON_SURVEY_CARD("Chat")).should("be.visible").click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/chat");
    cy.contains("Conversations");
  });

  it("should open Activities correctly", () => {
    cy.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );
    cy.get(homeHelpers.BUTTON_SURVEY_CARD("Activities"))
      .should("be.visible")
      .click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/activities");
    cy.contains("Activities");
    cy.contains(moment().format("MMMM DD, YYYY")).should("be.visible");
  });

  it("should open Community correctly", () => {
    cy.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );
    cy.get(homeHelpers.BUTTON_SURVEY_CARD("Community"))
      .should("be.visible")
      .click();
    cy.url().should(
      "eq",
      "https://qa.faethdigitalhealth.com/community-agreement"
    );
    cy.contains(
      "A safe and supportive Community to connect with others on their journey."
    );
  });

  it("should open Learning correctly", () => {
    cy.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );
    cy.get(homeHelpers.BUTTON_SURVEY_CARD("Learning"))
      .should("be.visible")
      .click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/learning");
    cy.contains("Courses");
  });

  it("should open Meals correctly", () => {
    cy.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );
    cy.get(homeHelpers.BUTTON_SURVEY_CARD("Meals"))
      .should("be.visible")
      .click();
    cy.url().should(
      "eq",
      "https://qa.faethdigitalhealth.com/advertising-meals"
    );
    cy.contains(
      "Interested in joining a Faeth Clinical Trial? We may be able to deliver meals to your door if you qualify."
    );
  });

  it("should open Profile correctly", () => {
    cy.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );
    cy.get(homeHelpers.BUTTON_USER_PROFILE).should("be.visible").click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/profile");
    cy.contains("Profile");
  });
});

describe("Home page profile", () => {
  beforeEach(() => {
    cy.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );
    cy.getByDataTestID(homeHelpers.BUTTON_OPEN_MENU_ICON)
      .should("be.visible")
      .click();
  });

  it("should be possible to logoff from the menu.", () => {
    cy.getByDataTestID(homeHelpers.BUTTON_OPEN_LOG_OUT_OPTION).click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/");
  });

  it("should be possible to open Your Account", () => {
    cy.getByDataTestID("YOUR_ACCOUNT_OPTION").click();
    cy.contains("Your Account");
    cy.url().should(
      "eq",
      "https://qa.faethdigitalhealth.com/profile/your-account"
    );
  });

  it("should be possible to change profile name", () => {
    const nameFaker = faker.name.firstName();
    cy.getByDataTestID("YOUR_ACCOUNT_OPTION").click();
    cy.get("input[name=name]").clear().type(nameFaker);
    cy.get("button[type='submit']").click();
    cy.get("input[name=name]").should("have.value", nameFaker);
    cy.get(".MuiAlert-root.MuiAlert-filledSuccess .MuiAlert-message")
      .should("be.visible")
      .and("contain", "Changes Saved");
  });

  it("should be possible to open Documents page", () => {
    cy.url().should(
      "eq",
      "https://qa.faethdigitalhealth.com/profile/documents"
    );
  });
});
