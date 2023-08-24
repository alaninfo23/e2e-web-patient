import moment from "moment";
import "moment/min/locales";

import * as adminHelper from "../../../helpers/adminHelper/adminHelper";
import * as surveyHelper from "../../../helpers/surveyHelper";
import * as loginHelper from "../../../helpers/loginHelper";
import * as homeHelper from "../../../helpers/homeHelper";
import * as surveyStrings from "../../../strings/surveyStrings";

describe("Serabelisib - Body Weight", () => {
  beforeEach(() => {
    adminHelper.clearCache();
    adminHelper.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin"),
    );
    adminHelper.assignSurveyToPatient(
      "Alan Patient 20",
      surveyStrings.SERISD001_BODY_WEIGHT,
    );
    adminHelper.logoutWebAdmin();

    adminHelper.clearCache();
    loginHelper.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient"),
    );

    cy.get(homeHelper.SURVEY_CARD_BUTTON("Surveys"), { timeout: 10000 })
      .should("be.visible")
      .click();
  });

  afterEach(() => {
    loginHelper.logoutWebPatient();

    adminHelper.clearCache();
    adminHelper.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin"),
    );
    adminHelper.unassignSurveyToPatient(
      "Alan Patient 20",
      surveyStrings.SERISD001_BODY_WEIGHT,
    );
    adminHelper.logoutWebAdmin();
  });

  it("Patient should be able to answer SER-ISD-001 - Body Weight survey", () => {
    const weightInLbs = "165.0";
    const currentDate = moment().format("MMM D");

    surveyHelper.verifySurveyCard(
      surveyStrings.SERISD001_BODY_WEIGHT,
      surveyStrings.ONCE,
      surveyHelper.SCHEDULE_ONCE(currentDate, adminHelper.calculatedTime),
      surveyStrings.OPEN,
    );

    cy.get(surveyHelper.SERISD001_BODY_WEIGHT_ID).click();

    surveyHelper.verifyScreenContent(
      surveyHelper.getProgressBarSelector("50"),
      surveyStrings.addPercentNumber("50"),
      surveyStrings.SERISD001_BODY_WEIGHT,
    );
    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(weightInLbs);

    surveyHelper.verifyBodyWeightConfirmScreen(
      weightInLbs,
      surveyHelper.getProgressBarSelector("100"),
      surveyStrings.addPercentNumber("100"),
    );
    surveyHelper.submitSurvey();
  });

  it('Label error should be displayed when user clicks on "Next" without entering a valid value weight', () => {
    cy.get(surveyHelper.SERISD001_BODY_WEIGHT_ID).click();

    const lowValue = "64.0";
    const highValue = "701.0";

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(lowValue);
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON).contains("Next").click();
    surveyHelper.verifyIntervalMsgError(
      true,
      surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS,
    );
    surveyHelper.validatetMsgOnScreen(surveyStrings.WHAT_IS_YOUR_WEIGHT_TODAY);

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(highValue);
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON).contains("Next").click();
    surveyHelper.verifyIntervalMsgError(
      true,
      surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS,
    );
    surveyHelper.validatetMsgOnScreen(surveyStrings.WHAT_IS_YOUR_WEIGHT_TODAY);

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear();
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON).contains("Next").click();
    surveyHelper.verifyIntervalMsgError(
      true,
      surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS,
    );
    surveyHelper.validatetMsgOnScreen(surveyStrings.WHAT_IS_YOUR_WEIGHT_TODAY);
  });
});
