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
  verifyOnboardingExperienceScreen,
  verifyProvideFeedbackScreen,
  verifyQuestionsNotBeenAnsweredScreen,
  checkAlertMessage,
  SCHEDULE_ONCE,
  submitSurvey,
  CONTAINED_PRIMARY_BUTTON,
  verifyInputMessageError,
  RADIO_OPTION_EXCELLENT,
  FEEDBACK_TEXT_INPUT,
  QUESTIONS_TEXT_INPUT,
  verifyOnboardPracticeConfirmationScreen,
} from "../../../helpers/surveyHelper";

import {
  loginWebPatient,
  logoutWebPatient,
} from "../../../helpers/loginHelper";

import {
  ONBOARDING_PRACTICE_SURVEY,
  THIS_FIELD_CANNOT_BE_LEFT_BLANK,
  PLEASE_SELECT_ONE_OPTION,
  HOW_HAS_YOUR_ONBOARDING_EXPERIENCE_BEEN_SO_FAR,
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
    cy.contains(HOW_HAS_YOUR_ONBOARDING_EXPERIENCE_BEEN_SO_FAR);
    checkAlertMessage(PLEASE_SELECT_ONE_OPTION);
    cy.get(RADIO_OPTION_EXCELLENT).click();
    cy.contains(HOW_HAS_YOUR_ONBOARDING_EXPERIENCE_BEEN_SO_FAR);
  });

  it("Experience feedback should be required, #5785", () => {
    cy.get(ONBOARDING_PRACTICE_SURVEY_ID).click();
    cy.get(RADIO_OPTION_EXCELLENT).click();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    verifyInputMessageError(true, THIS_FIELD_CANNOT_BE_LEFT_BLANK);
  });

  it("Patient should be able to answer Onboarding Practice Survey when patient added question, #6111, #5781, #5782, #5784, #5786, #5788", () => {
    const feedbackTextInput = "nothing, the system is great";
    const questionsTextInput = "How does faeth work?";
    const currentDate = moment().format("MMM DD");
    verifySurveyCard(
      ONBOARDING_PRACTICE_SURVEY,
      SCHEDULE_ONCE(currentDate, calculatedTime),
    );

    cy.get(ONBOARDING_PRACTICE_SURVEY_ID).click();

    verifyOnboardingExperienceScreen("25", ONBOARDING_PRACTICE_SURVEY);
    cy.get(RADIO_OPTION_EXCELLENT).click();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyProvideFeedbackScreen("50", ONBOARDING_PRACTICE_SURVEY);
    cy.get(FEEDBACK_TEXT_INPUT).type(feedbackTextInput);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyQuestionsNotBeenAnsweredScreen("75", ONBOARDING_PRACTICE_SURVEY);
    cy.get(QUESTIONS_TEXT_INPUT).type(questionsTextInput);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyOnboardPracticeConfirmationScreen("100", ONBOARDING_PRACTICE_SURVEY);

    cy.contains("h6", "Excellent");
    cy.contains("h6", feedbackTextInput);
    cy.contains("h6", questionsTextInput);
    submitSurvey(7000);
  });

  it("Patient should be able to answer Onboarding Practice Survey when didn't add question, #6110, #5787, #5789", () => {
    const feedbackTextInput = "nothing, the system is great";
    const currentDate = moment().format("MMM DD");

    verifySurveyCard(
      ONBOARDING_PRACTICE_SURVEY,
      SCHEDULE_ONCE(currentDate, calculatedTime),
    );

    cy.get(ONBOARDING_PRACTICE_SURVEY_ID).click();

    verifyOnboardingExperienceScreen("25", ONBOARDING_PRACTICE_SURVEY);
    cy.get(RADIO_OPTION_EXCELLENT).click();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyProvideFeedbackScreen("50", ONBOARDING_PRACTICE_SURVEY);
    cy.get(FEEDBACK_TEXT_INPUT).type(feedbackTextInput);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyQuestionsNotBeenAnsweredScreen("75", ONBOARDING_PRACTICE_SURVEY);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyOnboardPracticeConfirmationScreen("100", ONBOARDING_PRACTICE_SURVEY);

    cy.contains("h6", "Excellent");
    cy.contains("h6", feedbackTextInput);
    cy.contains("h6", "-");
    submitSurvey(7000);
  });
});
