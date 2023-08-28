import moment from "moment";
import "moment/min/locales";

import {
  clearCache,
  loginWebAdmin,
  logoutWebAdmin,
  assignSurveyToPatient,
  unassignSurveyToPatient,
  calculatedTime,
} from "../../../../helpers/adminHelper/adminHelper";

import {
  verifySurveyCard,
  verifyWeightScreenContent,
  SCHEDULE_ONCE,
  VALUE_LBS_INPUT,
  PROGRESS_BAR_VALUE_ID,
  submitSurvey,
  CONTAINED_PRIMARY_BUTTON,
  verifyInputMessageError,
  validateTitleOnScreen,
  NEEAR001_BODY_COMPOSITION_ID,
  verifyBodyCompositionScreenContent,
  verifyBodyCompositionConfirmScreen,
} from "../../../../helpers/surveyHelper";

import {
  loginWebPatient,
  logoutWebPatient,
} from "../../../../helpers/loginHelper";

import {
  NEEAR001_BODY_COMPOSITION,
  ONCE,
  PERCENT_NUMBER,
  PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS,
  WHAT_IS_YOUR_WEIGHT_TODAY,
  PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT,
  WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY,
} from "../../../../strings/surveyStrings";

import { SURVEY_CARD_BUTTON } from "../../../../helpers/homeHelper";
import { NEXT } from "../../../../helpers/generalStrings";

describe("Serabelisib - Body Composition", () => {
  beforeEach(() => {
    clearCache();
    loginWebAdmin(Cypress.env("emailAdmin"), Cypress.env("passwordAdmin"));
    assignSurveyToPatient("Alan Patient 20", NEEAR001_BODY_COMPOSITION);
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
    unassignSurveyToPatient("Alan Patient 20", NEEAR001_BODY_COMPOSITION);
    logoutWebAdmin();
  });

  it("Label error should be displayed when user clicks on 'Next' without entering a valid value on What is your body fat percentage today?, #6372", () => {
    const weightInLbs = "165.0";
    const bodyFatLowValue = "1.0";
    const bodyFatHighValue = "61.0";

    cy.get(NEEAR001_BODY_COMPOSITION_ID).click();
    cy.get(VALUE_LBS_INPUT).clear().type(weightInLbs);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    cy.get(VALUE_LBS_INPUT).clear().type(bodyFatLowValue);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    verifyInputMessageError(true, PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT);
    validateTitleOnScreen(WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY);

    cy.get(VALUE_LBS_INPUT).clear().type(bodyFatHighValue);
    verifyInputMessageError(true, PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    validateTitleOnScreen(WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY);

    cy.get(VALUE_LBS_INPUT).clear();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    verifyInputMessageError(true, PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT);
    validateTitleOnScreen(WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY);
  });

  it("FDHA-6840 - Label error should be displayed when user clicks on 'Next' without entering a valid value on What is your weight today?, #6372", () => {
    cy.get(NEEAR001_BODY_COMPOSITION_ID).click();

    const lowValue = "64.0";
    const highValue = "701.0";

    cy.get(VALUE_LBS_INPUT).clear().type(lowValue);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    verifyInputMessageError(true, PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS);
    validateTitleOnScreen(WHAT_IS_YOUR_WEIGHT_TODAY);

    cy.get(VALUE_LBS_INPUT).clear().type(highValue);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    verifyInputMessageError(true, PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS);
    validateTitleOnScreen(WHAT_IS_YOUR_WEIGHT_TODAY);

    cy.get(VALUE_LBS_INPUT).clear();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    verifyInputMessageError(true, PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS);
    validateTitleOnScreen(WHAT_IS_YOUR_WEIGHT_TODAY);
  });

  it("Patient should be able to answer NEAAR-001 - Body Composition, #3991, #6369, #6370, #6371", () => {
    const weightInLbs = "165.0";
    const bodyFat = "30.0";
    const currentDate = moment().format("MMM D");

    verifySurveyCard(
      NEEAR001_BODY_COMPOSITION,
      ONCE,
      SCHEDULE_ONCE(currentDate, calculatedTime),
    );

    cy.get(NEEAR001_BODY_COMPOSITION_ID).click();

    verifyWeightScreenContent("33", "33", NEEAR001_BODY_COMPOSITION);

    cy.get(VALUE_LBS_INPUT).clear().type(weightInLbs);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyBodyCompositionScreenContent(
      NEEAR001_BODY_COMPOSITION,
      PROGRESS_BAR_VALUE_ID("67"),
      PERCENT_NUMBER("67"),
    );

    cy.get(VALUE_LBS_INPUT).clear().type(bodyFat);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyBodyCompositionConfirmScreen(
      weightInLbs,
      bodyFat,
      PROGRESS_BAR_VALUE_ID("100"),
      PERCENT_NUMBER("100"),
    );

    submitSurvey();
  });
});
