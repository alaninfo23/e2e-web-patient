import moment from "moment";
import "moment/min/locales";

import * as adminHelper from "../../../../helpers/adminHelper/adminHelper";
import * as surveyHelper from "../../../../helpers/surveyHelper";
import * as loginHelper from "../../../../helpers/loginHelper";
import * as homeHelper from "../../../../helpers/homeHelper";
import * as surveyStrings from "../../../../strings/surveyStrings";
import * as generalStrings from "../../../../helpers/generalStrings";

describe("Serabelisib - Body Composition", () => {
  beforeEach(() => {
    adminHelper.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin"),
    );
    adminHelper.assignSurveyToPatient(
      "Alan Patient 20",
      surveyStrings.NEEAR001_BODY_COMPOSITION,
    );
    adminHelper.logoutWebAdmin();

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

    adminHelper.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin"),
    );
    adminHelper.unassignSurveyToPatient(
      "Alan Patient 20",
      surveyStrings.NEEAR001_BODY_COMPOSITION,
    );
    adminHelper.logoutWebAdmin();
  });

  it("FDHA-6840 - Patient should be able to answer NEAAR-001 - Body Composition", () => {
    const weightInLbs = "165.0";
    const bodyFat = "30.0";
    const currentDate = moment().format("MMM D");

    surveyHelper.verifySurveyCard(
      surveyStrings.NEEAR001_BODY_COMPOSITION,
      surveyStrings.ONCE,
      surveyHelper.SCHEDULE_ONCE(currentDate, adminHelper.calculatedTime),
      surveyStrings.OPEN,
    );

    cy.get(surveyHelper.NEEAR001_BODY_COMPOSITION_ID).click();

    surveyHelper.verifyScreenContent(
      surveyHelper.getProgressBarSelector("33"),
      surveyStrings.addPercentNumber("33"),
      surveyStrings.NEEAR001_BODY_COMPOSITION,
    );

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(weightInLbs);
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();

    surveyHelper.verifyBodyCompositionContentInPercent(
      surveyStrings.NEEAR001_BODY_COMPOSITION,
      surveyHelper.getProgressBarSelector("67"),
      surveyStrings.addPercentNumber("67"),
    );

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(bodyFat);
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();

    surveyHelper.verifyBodyCompositionContentConfirm(
      weightInLbs,
      bodyFat,
      surveyHelper.getProgressBarSelector("100"),
      surveyStrings.addPercentNumber("100"),
    );

    surveyHelper.submitSurvey();
  });

  it("FDHA-6840 - Label error should be displayed when user clicks on 'Next' without entering a valid value on What is your body fat percentage today??", () => {
    const weightInLbs = "165.0";
    const bodyFatLowValue = "1.0";
    const bodyFatHighValue = "61.0";

    cy.get(surveyHelper.NEEAR001_BODY_COMPOSITION_ID).click();
    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(weightInLbs);
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(bodyFatLowValue);
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();
    surveyHelper.verifyIntervalMsgError(
      true,
      surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT,
    );
    surveyHelper.validatetMsgOnScreen(
      surveyStrings.WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY,
    );

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(bodyFatHighValue);
    surveyHelper.verifyIntervalMsgError(
      true,
      surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT,
    );
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();
    surveyHelper.validatetMsgOnScreen(
      surveyStrings.WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY,
    );

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear();
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();
    surveyHelper.verifyIntervalMsgError(
      true,
      surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT,
    );
    surveyHelper.validatetMsgOnScreen(
      surveyStrings.WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY,
    );
  });

  it("FDHA-6840 - Label error should be displayed when user clicks on 'Next' without entering a valid value on What is your weight today?", () => {
    cy.get(surveyHelper.NEEAR001_BODY_COMPOSITION_ID).click();

    const lowValue = "64.0";
    const highValue = "701.0";

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(lowValue);
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();
    surveyHelper.verifyIntervalMsgError(
      true,
      surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS,
    );
    surveyHelper.validatetMsgOnScreen(surveyStrings.WHAT_IS_YOUR_WEIGHT_TODAY);

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(highValue);
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();
    surveyHelper.verifyIntervalMsgError(
      true,
      surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS,
    );
    surveyHelper.validatetMsgOnScreen(surveyStrings.WHAT_IS_YOUR_WEIGHT_TODAY);

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear();
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();
    surveyHelper.verifyIntervalMsgError(
      true,
      surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS,
    );
    surveyHelper.validatetMsgOnScreen(surveyStrings.WHAT_IS_YOUR_WEIGHT_TODAY);
  });
});
