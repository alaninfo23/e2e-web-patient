import moment from "moment";
import "moment/min/locales";

import {
  clearCache,
  loginWebAdmin,
  logoutWebAdmin,
  assignSurveyToPatient,
  unassignSurveyToPatient,
  calculatedTime,
} from "../../../helpers/adminHelper/adminHelper";

import {
  verifySurveyCard,
  verifyWeightScreenContent,
  verifyBodyWeightConfirmScreen,
  SCHEDULE_ONCE,
  SERISD001_BODY_WEIGHT_ID,
  VALUE_LBS_INPUT,
  PROGRESS_BAR_VALUE_ID,
  submitSurvey,
  CONTAINED_PRIMARY_BUTTON,
  verifyInputMessageError,
  validateTitleOnScreen,
  currentDate,
} from "../../../helpers/surveyHelper";

import {
  loginWebPatient,
  logoutWebPatient,
} from "../../../helpers/loginHelper";

import {
  SERISD001_BODY_WEIGHT,
  ONCE,
  PERCENT_NUMBER,
  PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS,
  WHAT_IS_YOUR_WEIGHT_TODAY,
} from "../../../strings/surveyStrings";

import { SURVEY_CARD_BUTTON } from "../../../helpers/homeHelper";

describe("Serabelisib - Body Weight", () => {
  beforeEach(() => {
    clearCache();
    loginWebAdmin(Cypress.env("emailAdmin"), Cypress.env("passwordAdmin"));
    assignSurveyToPatient("Alan Patient 20", SERISD001_BODY_WEIGHT);
    logoutWebAdmin();

    clearCache();
    loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient"),
    );

    cy.get(SURVEY_CARD_BUTTON("Surveys"), { timeout: 10000 })
      .should("be.visible")
      .click();
  });

  afterEach(() => {
    logoutWebPatient();

    clearCache();
    loginWebAdmin(Cypress.env("emailAdmin"), Cypress.env("passwordAdmin"));
    unassignSurveyToPatient("Alan Patient 20", SERISD001_BODY_WEIGHT);
    logoutWebAdmin();
  });

  it('Label error should be displayed when user clicks on "Next" without entering a valid value weight, #6361', () => {
    cy.get(SERISD001_BODY_WEIGHT_ID).click();

    const lowValue = "64.0";
    const highValue = "701.0";

    cy.get(VALUE_LBS_INPUT).clear().type(lowValue);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains("Next").click();
    verifyInputMessageError(true, PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS);
    validateTitleOnScreen(WHAT_IS_YOUR_WEIGHT_TODAY);

    cy.get(VALUE_LBS_INPUT).clear().type(highValue);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains("Next").click();
    verifyInputMessageError(true, PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS);
    validateTitleOnScreen(WHAT_IS_YOUR_WEIGHT_TODAY);

    cy.get(VALUE_LBS_INPUT).clear();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains("Next").click();
    verifyInputMessageError(true, PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS);
    validateTitleOnScreen(WHAT_IS_YOUR_WEIGHT_TODAY);
  });

  it("Patient should be able to answer SER-ISD-001 - Body Weight survey, #3992, #6358, #6359, #6360", () => {
    const weightInLbs = "165.0";

    verifySurveyCard(
      SERISD001_BODY_WEIGHT,
      SCHEDULE_ONCE(currentDate, calculatedTime),
    );

    cy.get(SERISD001_BODY_WEIGHT_ID).click();

    verifyWeightScreenContent("50", "50", SERISD001_BODY_WEIGHT);
    cy.get(VALUE_LBS_INPUT).clear().type(weightInLbs);

    verifyBodyWeightConfirmScreen(
      weightInLbs,
      PROGRESS_BAR_VALUE_ID("100"),
      PERCENT_NUMBER("100"),
    );
    submitSurvey(7000);
  });
});
