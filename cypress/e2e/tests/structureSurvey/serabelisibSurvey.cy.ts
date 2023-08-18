import moment from "moment";
import "moment/min/locales";

import * as adminHelpers from "../../helpers/adminHelpers/adminHelpers";
import * as surveyHelpers from "../../helpers/surveyHelpers";
import * as logintHelpers from "../../helpers/logintHelpers";
import * as homeHelpers from "../../helpers/homeHelpers";
import * as surveyStrings from "../../strings/surveyStrings";
import * as adminStrings from "../../helpers/adminStrings/adminStrings";

describe("Serabelisib - Body Weight", () => {
  beforeEach(() => {
    adminHelpers.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin"),
    );
    adminHelpers.assignSurveyToPatient(
      "Alan Patient 20",
      "SER-ISD-001 - Body Weight",
    );
    adminHelpers.logoutWebAdmin();

    logintHelpers.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient"),
    );

    cy.get(homeHelpers.SURVEY_CARD_BUTTON("Surveys"), { timeout: 10000 })
      .should("be.visible")
      .click();
  });

  afterEach(() => {
    logintHelpers.logoutWebPatient();

    adminHelpers.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin"),
    );
    adminHelpers.unassignSurveyToPatient(
      "Alan Patient 20",
      "SER-ISD-001 - Body Weight",
    );
    adminHelpers.logoutWebAdmin();
  });

  it("Patient should be able to answer SER-ISD-001 - Body Weight survey", () => {
    const weightInLbs = "165.0";
    const currentDate = moment().format("MMM D");

    surveyHelpers.verifySurveyCard(
      surveyStrings.SERISD001_BODY_WEIGHT,
      adminStrings.ONCE,
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
