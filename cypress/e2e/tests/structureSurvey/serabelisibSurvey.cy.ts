import * as assignSurvey from "../../helpers/adminHelpers/assignSurvey";
import * as surveyWebPatientHelpers from "../../helpers/surveyWebPatientHelpers";
import * as loginWebPatientHelpers from "../../helpers/loginWebPatientHelpers";
import * as homeHelpers from "../../helpers/homeHelpers";

describe("Serabelisib - Body Weight", () => {
  beforeEach(() => {
    assignSurvey.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin")
    );
    assignSurvey.assignSurveyToPatient(
      "Alan Patient 20",
      "SER-ISD-001 - Body Weight"
    );
    assignSurvey.logoutWebAdmin();

    loginWebPatientHelpers.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );

    cy.get(homeHelpers.BUTTON_SURVEY_CARD("Surveys"), { timeout: 10000 })
      .should("be.visible")
      .click();
  });

  afterEach(() => {
    loginWebPatientHelpers.logoutWebPatient();

    assignSurvey.loginWebAdmin(
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

    surveyWebPatientHelpers.verifySurveyCard();
    cy.get('[data-testid="SURVEY_CARD_SER-ISD-001 - Body Weight"]').click();

    surveyWebPatientHelpers.verifyWeightScreenContent();
    cy.get(surveyWebPatientHelpers.VALUE_LBS_INPUT).clear().type(weightInLbs);

    surveyWebPatientHelpers.verifyWeightScreenContentConfirm(weightInLbs);
    surveyWebPatientHelpers.submitSurvey();
  });

  it('Label error should be displayed when user clicks on "Next" without entering a valid value weight', () => {
    cy.get('[data-testid="SURVEY_CARD_SER-ISD-001 - Body Weight"]').click();

    const lowValue = "64.0";
    const mediumValue = "165.0";
    const highValue = "701.0";

    cy.get(surveyWebPatientHelpers.VALUE_LBS_INPUT).clear().type(lowValue);
    cy.get(surveyWebPatientHelpers.NEXT_BUTTON).contains("Next").click();
    surveyWebPatientHelpers.verifyMsgWeightScreenContent(true);

    cy.get(surveyWebPatientHelpers.VALUE_LBS_INPUT).clear().type(mediumValue);
    cy.get(surveyWebPatientHelpers.NEXT_BUTTON).contains("Next").click();
    surveyWebPatientHelpers.verifyMsgWeightScreenContent(false);

    cy.get(surveyWebPatientHelpers.VALUE_LBS_INPUT).clear().type(highValue);
    cy.get(surveyWebPatientHelpers.NEXT_BUTTON).contains("Next").click();
    surveyWebPatientHelpers.verifyMsgWeightScreenContent(true);

    cy.get(surveyWebPatientHelpers.VALUE_LBS_INPUT).clear();
    cy.get(surveyWebPatientHelpers.NEXT_BUTTON).contains("Next").click();
    surveyWebPatientHelpers.verifyMsgWeightScreenContent(true);
  });
});
