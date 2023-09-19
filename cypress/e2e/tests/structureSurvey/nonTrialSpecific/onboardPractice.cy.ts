import moment from "moment";
import "moment/min/locales";

import {
  clearCache,
  loginWebAdmin,
  logoutWebAdmin,
  assignSurveyToPatient,
  unassignSurveyToPatient,
  calculatedTime,
  getPreviousHour,
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
  PLEASE_SELECT_ONE_OPTION,
  HOW_HAS_YOUR_ONBOARDING_EXPERIENCE_BEEN_SO_FAR,
  PLEASE_PROVIDE_ANY_FEEDBACK,
} from "../../../strings/surveyStrings";

import { SURVEY_CARD_BUTTON } from "../../../helpers/homeHelper";
import {
  NEXT,
  THIS_FIELD_CANNOT_BE_LEFT_BLANK,
} from "../../../helpers/generalStrings";

describe("Onboarding Practice Survey", () => {
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
    cy.contains(HOW_HAS_YOUR_ONBOARDING_EXPERIENCE_BEEN_SO_FAR).should(
      "be.visible",
    );
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    cy.wait(2000);
    checkAlertMessage(PLEASE_SELECT_ONE_OPTION);
    cy.get(RADIO_OPTION_EXCELLENT).click();
    cy.contains(HOW_HAS_YOUR_ONBOARDING_EXPERIENCE_BEEN_SO_FAR).should(
      "be.visible",
    );
  });

  it("Experience feedback should be required, #5785", () => {
    cy.get(ONBOARDING_PRACTICE_SURVEY_ID).click();
    cy.get(RADIO_OPTION_EXCELLENT).click();
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    cy.contains(PLEASE_PROVIDE_ANY_FEEDBACK).should("be.visible");
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();
    verifyInputMessageError(true, THIS_FIELD_CANNOT_BE_LEFT_BLANK);
    cy.contains(PLEASE_PROVIDE_ANY_FEEDBACK).should("be.visible");
  });

  it("Patient should be able to answer Onboarding Practice Survey when patient added question, #6111, #5781, #5782, #5784, #5786, #5788", () => {
    const answerOnboardPractice = {
      experiencie: "Excellent",
      feedback: "nothing, the system is great",
      question: "How does faeth work?",
    };

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
    cy.get(FEEDBACK_TEXT_INPUT).type(answerOnboardPractice.feedback);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyQuestionsNotBeenAnsweredScreen("75", ONBOARDING_PRACTICE_SURVEY);
    cy.get(QUESTIONS_TEXT_INPUT).type(answerOnboardPractice.question);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyOnboardPracticeConfirmationScreen(
      "100",
      ONBOARDING_PRACTICE_SURVEY,
      answerOnboardPractice,
    );

    submitSurvey();
  });

  it.only("Patient should be able to answer Onboarding Practice Survey when didn't add question, #6110, #5787, #5789", () => {
    const answerOnboardPractice = {
      experiencie: "Excellent",
      feedback: "nothing, the system is great",
      question: "-",
    };
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
    cy.get(FEEDBACK_TEXT_INPUT).type(answerOnboardPractice.feedback);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyQuestionsNotBeenAnsweredScreen("75", ONBOARDING_PRACTICE_SURVEY);
    cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

    verifyOnboardPracticeConfirmationScreen(
      "100",
      ONBOARDING_PRACTICE_SURVEY,
      answerOnboardPractice,
    );

    submitSurvey();
  });
});
