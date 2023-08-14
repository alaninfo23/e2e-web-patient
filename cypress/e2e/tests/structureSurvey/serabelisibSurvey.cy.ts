import * as assignSurvey from "../../helpers/adminHelpers/assignSurvey";
import * as answerSurvey from "../../helpers/answerSurvey";
import * as loginHelper from "../../helpers/loginHelper";
import * as homeHelpers from "../../helpers/homeHelpers";
import { assign } from "cypress/types/lodash";

describe("Serabelisib - Body Weight", () => {
  beforeEach(() => {
    loginHelper.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin")
    );
    assignSurvey.assignSurveyToPatient(
      "Alan Patient 20",
      "SER-ISD-001 - Body Weight"
    );
    assignSurvey.logoutWebAdmin();

    loginHelper.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );

    cy.get(homeHelpers.BUTTON_SURVEY_CARD("Surveys"))
      .should("be.visible")
      .click();
  });

  afterEach(() => {
    cy.wait(4000);
    assignSurvey.logoutWebPatient();
    loginHelper.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin")
    );
    assignSurvey.unassignSurveyToPatient(
      "Alan Patient 20",
      "SER-ISD-001 - Body Weight"
    );
    assignSurvey.logoutWebAdmin();
  });

  it("Patient should be able to answer SER-ISD-001 - Body Weight survey", () => {
    const weightInLbs = "165.0";

    answerSurvey.verifySurveyCard();
    cy.get('[data-testid="SURVEY_CARD_SER-ISD-001 - Body Weight"]').click();

    answerSurvey.verifyWeightScreenContent();
    cy.get(answerSurvey.INPUT_VALUE_LBS).clear().type(weightInLbs);

    answerSurvey.verifyWeightScreenContentConfirm(weightInLbs);
    answerSurvey.submitSurvey();
  });

  it('Label error should be displayed when user clicks on "Next" without entering a valid value on "What is your weight today?" screen', () => {
    cy.get('[data-testid="SURVEY_CARD_SER-ISD-001 - Body Weight"]').click();

    const lowValue = "64.0";
    const mediumValue = "165.0";
    const highValue = "701.0";

    cy.get(answerSurvey.INPUT_VALUE_LBS).clear().type(lowValue);
    cy.get(answerSurvey.BUTTON_NEXT).contains("Next").click();
    answerSurvey.verifyMsgWeightScreenContent(true);

    cy.get(answerSurvey.INPUT_VALUE_LBS).clear().type(mediumValue);
    cy.get(answerSurvey.BUTTON_NEXT).contains("Next").click();
    answerSurvey.verifyMsgWeightScreenContent(false);

    cy.get(answerSurvey.INPUT_VALUE_LBS).clear().type(highValue);
    cy.get(answerSurvey.BUTTON_NEXT).contains("Next").click();
    answerSurvey.verifyMsgWeightScreenContent(true);
  });
});
