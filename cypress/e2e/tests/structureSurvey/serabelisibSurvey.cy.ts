import * as assignSurvey from "../../helpers/adminHelpers/assignSurvey";
import * as answerSurvey from "../../helpers/answerSurvey";
import * as loginHelper from "../../helpers/loginHelper";

describe("Serabelisib - Body Weight", () => {
  beforeEach(() => {
    loginHelper.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin")
    );
    assignSurvey.assignSurveyToPatient();
    assignSurvey.logoutWebAdmin();

    loginHelper.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );
  });

  afterEach(() => {
    loginHelper.loginWebAdmin(
      Cypress.env("emailAdmin"),
      Cypress.env("passwordAdmin")
    );
    assignSurvey.unassignSurveyToPatient();
    assignSurvey.logoutWebAdmin();
  });

  it("FDHA-3992 Patient should be able to answer SER-ISD-001 - Body Weight survey", () => {

    answerSurvey.verifySurveyCard();
    answerSurvey.verifyWeightScreenContent();
    cy.get(answerSurvey.INPUT_VALUE_LBS).type("1650");
    answerSurvey.verifyWeightScreenContentConfirm();
    answerSurvey.submitSurvey();
  });

  it("Should display error notification if weight entered is less than 65 or greater than 700 lbs", () => {

    answerSurvey.verifySurveyCard();
    answerSurvey.verifyWeightScreenContent();
    answerSurvey.verifyMsgErrorWeightScreenContentConfirm("64.0");
    answerSurvey.verifyMsgErrorWeightScreenContentConfirm("750.0");
  });
});
