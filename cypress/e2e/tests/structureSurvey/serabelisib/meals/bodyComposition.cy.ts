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

  it("FDHA-6840 - Patient should be able to answer NEAAR-001 - Body Compositio", () => {
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
      surveyHelper.getProgressBarSelector(33),
      surveyStrings.addPercentNumber("33"),
      surveyStrings.NEEAR001_BODY_COMPOSITION,
    );

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(weightInLbs);
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();

    surveyHelper.verifyBodyCompositionContentInPercent(
      surveyStrings.NEEAR001_BODY_COMPOSITION,
      surveyHelper.getProgressBarSelector(67),
      surveyStrings.addPercentNumber("67"),
    );

    cy.get(surveyHelper.VALUE_LBS_INPUT).clear().type(bodyFat);
    cy.get(surveyHelper.CONTAINED_PRIMARY_BUTTON)
      .contains(generalStrings.NEXT)
      .click();

    surveyHelper.verifyBodyCompositionContentConfirm(
      weightInLbs,
      bodyFat,
      surveyHelper.getProgressBarSelector(100),
      surveyStrings.addPercentNumber("100"),
    );

    surveyHelper.submitSurvey();
  });
});
