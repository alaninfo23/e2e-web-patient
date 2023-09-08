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
  ONBOARDING_PRACTICE_SURVEY_ID,
  verifyOnboardingExperienceOptions,
  verifyPleaseProvideFeedbackScreen,
  verifyQuestionsNotBeenAnswered,
  checkAlertMessage,
  currentDate,
  SCHEDULE_ONCE,
  submitSurvey,
  CONTAINED_PRIMARY_BUTTON,
  ALERT_NOTIFICATION,
  verifyInputMessageError,
  OPTION_RADIO_EXCELLENT,
  FEEDBACK_TEXT_INPUT,
  QUESTIONS_TEXT_INPUT,
  verifyOnboardPracticeConfirmation,
} from "../../../helpers/surveyHelper";

import {
  loginWebPatient,
  logoutWebPatient,
} from "../../../helpers/loginHelper";

import {
  ONBOARDING_PRACTICE_SURVEY,
  THIS_FIELD_CANNOT_BE_LEFT_BLANK,
} from "../../../strings/surveyStrings";

import { SURVEY_CARD_BUTTON } from "../../../helpers/homeHelper";
import { NEXT } from "../../../helpers/generalStrings";

describe("notTrialSpecific - Onboarding Practice Survey", () => {
  beforeEach(() => {
    clearCache();
    loginWebAdmin(Cypress.env("emailAdmin"), Cypress.env("passwordAdmin"));
    assignSurveyToPatient("Alan Patient 20", ONBOARDING_PRACTICE_SURVEY);
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
    unassignSurveyToPatient("Alan Patient 20", ONBOARDING_PRACTICE_SURVEY);
    logoutWebAdmin();
  });

  it("How has your onboarding experience been so far? should be required, #5783", () => {
    cy.get(ONBOARDING_PRACTICE_SURVEY_ID).click();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    cy.wait(2000);
    checkAlertMessage("Please select one option");
    cy.get(OPTION_RADIO_EXCELLENT).click();
  });

  it("Experience feedback should be required, #5785", () => {
    cy.get(ONBOARDING_PRACTICE_SURVEY_ID).click();
    cy.get(OPTION_RADIO_EXCELLENT).click();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    verifyInputMessageError(true, THIS_FIELD_CANNOT_BE_LEFT_BLANK);
  });

  it("Patient should be able to answer Onboarding Practice Survey when patient added question, #6111, #5781, #5782, #5786, #5787, #5788", () => {
    const feedbackTextInput = "nothing, the system is great";
    const questionsTextInput = "How does faeth work?";
    verifySurveyCard(
      ONBOARDING_PRACTICE_SURVEY,
      SCHEDULE_ONCE(currentDate, calculatedTime),
    );

    cy.get(ONBOARDING_PRACTICE_SURVEY_ID).click();

    verifyOnboardingExperienceOptions("25", "25", ONBOARDING_PRACTICE_SURVEY);
    cy.get(OPTION_RADIO_EXCELLENT).click();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyPleaseProvideFeedbackScreen("50", "50", ONBOARDING_PRACTICE_SURVEY);
    cy.get(FEEDBACK_TEXT_INPUT).type(feedbackTextInput);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyQuestionsNotBeenAnswered("75", "75", ONBOARDING_PRACTICE_SURVEY);
    cy.get(QUESTIONS_TEXT_INPUT).type(questionsTextInput);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyOnboardPracticeConfirmation("100", "100", ONBOARDING_PRACTICE_SURVEY);

    cy.contains("h6", "Excellent");
    cy.contains("h6", feedbackTextInput);
    cy.contains("h6", questionsTextInput);
    submitSurvey(7000);
  });

  it("Patient should be able to answer Onboarding Practice Survey when didn't add question, #6110, #5789", () => {
    const feedbackTextInput = "nothing, the system is great";
    verifySurveyCard(
      ONBOARDING_PRACTICE_SURVEY,
      SCHEDULE_ONCE(currentDate, calculatedTime),
    );

    cy.get(ONBOARDING_PRACTICE_SURVEY_ID).click();

    verifyOnboardingExperienceOptions("25", "25", ONBOARDING_PRACTICE_SURVEY);
    cy.get(OPTION_RADIO_EXCELLENT).click();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyPleaseProvideFeedbackScreen("50", "50", ONBOARDING_PRACTICE_SURVEY);
    cy.get(FEEDBACK_TEXT_INPUT).type(feedbackTextInput);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyQuestionsNotBeenAnswered("75", "75", ONBOARDING_PRACTICE_SURVEY);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyOnboardPracticeConfirmation("100", "100", ONBOARDING_PRACTICE_SURVEY);

    cy.contains("h6", "Excellent");
    cy.contains("h6", feedbackTextInput);
    cy.contains("h6", "-");
    submitSurvey(7000);
  });
});
