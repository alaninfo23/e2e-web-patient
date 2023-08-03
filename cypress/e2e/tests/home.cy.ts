import * as homeHelpers from "../helpers/homeHelpers";

describe("Home page", () => {
  it("should open Surveys correctly", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.wait(3000);
    cy.contains("h5.MuiTypography-h5", "Surveys").click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/surveys");
    cy.contains(
      "This is how your Coach can stay in the loop, all information is confidential between the two of you."
    );
  });
  it("should open Chat correctly", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.wait(3000);
    cy.contains("h5.MuiTypography-h5", "Chat").click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/chat");
    cy.contains("Conversations");
  });
  it("should open Activities correctly", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.wait(3000);
    cy.contains("h5.MuiTypography-h5", "Activities").click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/activities");
    cy.contains("Activities");
  });
  it("should open Community correctly", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.wait(3000);
    cy.contains("h5.MuiTypography-h5", "Community").click();
    cy.url().should(
      "eq",
      "https://qa.faethdigitalhealth.com/community-agreement"
    );
    cy.contains(
      "A safe and supportive Community to connect with others on their journey."
    );
  });
  it("should open Learning correctly", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.wait(3000);
    cy.contains("h5.MuiTypography-h5", "Learning").click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/learning");
    cy.contains("Courses");
  });
  it("should open Meals correctly", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.wait(3000);
    cy.contains("h5.MuiTypography-h5", "Meals").click();
    cy.url().should(
      "eq",
      "https://qa.faethdigitalhealth.com/advertising-meals"
    );
    cy.contains(
      "Interested in joining a Faeth Clinical Trial? We may be able to deliver meals to your door if you qualify."
    );
  });
});

describe("Home page menu", () => {
  it("should be possible to do logoff", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.wait(4000);
    cy.getByDataTestID(homeHelpers.BUTTON_OPEN_MENU_ICON).click();
    cy.getByDataTestID(homeHelpers.BUTTON_OPEN_LOG_OUT_OPTION).click();
    cy.url().should("eq", "https://qa.faethdigitalhealth.com/");
  });
});
