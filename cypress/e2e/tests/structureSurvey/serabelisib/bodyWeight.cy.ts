import moment from "moment";
import "moment/min/locales";

import * as adminHelpers from "../../../helpers/adminHelper/adminHelper";
import * as surveyHelpers from "../../../helpers/surveyHelper";
import * as loginHelpers from "../../../helpers/loginHelper";
import * as homeHelpers from "../../../helpers/homeHelper";
import * as surveyStrings from "../../../strings/surveyStrings";

describe("Serabelisib - Body Weight", () => {
  beforeEach(() => {
    adminHelpers.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin"),
    );
    adminHelpers.assignSurveyToPatient(
      "Alan Patient 20",
      surveyStrings.SERISD001_BODY_WEIGHT,
    );
    adminHelpers.logoutWebAdmin();

    loginHelpers.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient"),
    );

    cy.get(homeHelpers.SURVEY_CARD_BUTTON("Surveys"), { timeout: 10000 })
      .should("be.visible")
      .click();
  });

  afterEach(() => {
    loginHelpers.logoutWebPatient();

    adminHelpers.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin"),
    );
    adminHelpers.unassignSurveyToPatient(
      "Alan Patient 20",
      surveyStrings.SERISD001_BODY_WEIGHT,
    );
    adminHelpers.logoutWebAdmin();
  });

  it("Patient should be able to answer SER-ISD-001 - Body Weight survey", () => {
    const weightInLbs = "165.0";
    const currentDate = moment().format("MMM D");

    surveyHelpers.verifySurveyCard(
      surveyStrings.SERISD001_BODY_WEIGHT,
      surveyStrings.ONCE,
      surveyHelpers.SCHEDULE_ONCE(currentDate, adminHelpers.calculatedTime),
    );

    cy.get(surveyHelpers.SERISD001_BODY_WEIGHT_ID).click();

    surveyHelpers.verifyWeightScreenContent();
    cy.get(surveyHelpers.VALUE_LBS_INPUT).clear().type(weightInLbs);

    surveyHelpers.verifyBodyWeightConfirmScreen(weightInLbs);
    surveyHelpers.submitSurvey();
  });

  it('Label error should be displayed when user clicks on "Next" without entering a valid value weight', () => {
    cy.get(surveyHelpers.SERISD001_BODY_WEIGHT_ID).click();

    const lowValue = "64.0";
    const mediumValue = "165.0";
    const highValue = "701.0";

    cy.get(surveyHelpers.VALUE_LBS_INPUT).clear().type(lowValue);
    cy.get(surveyHelpers.PRIMARY_BUTTON).contains("Next").click();
    surveyHelpers.verifyWeightIntervalMsgError(true);

    cy.get(surveyHelpers.VALUE_LBS_INPUT).clear().type(highValue);
    cy.get(surveyHelpers.PRIMARY_BUTTON).contains("Next").click();
    surveyHelpers.verifyWeightIntervalMsgError(true);

    cy.get(surveyHelpers.VALUE_LBS_INPUT).clear();
    cy.get(surveyHelpers.PRIMARY_BUTTON).contains("Next").click();
    surveyHelpers.verifyWeightIntervalMsgError(true);

    cy.get(surveyHelpers.VALUE_LBS_INPUT).clear().type(mediumValue);
    cy.get(surveyHelpers.PRIMARY_BUTTON).contains("Next").click();
    surveyHelpers.verifyWeightIntervalMsgError(false);
  });
});
