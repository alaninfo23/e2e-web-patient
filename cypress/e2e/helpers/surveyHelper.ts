import "moment/min/locales";
import { format } from "date-fns";

import {
  CLOSE,
  WHAT_IS_YOUR_WEIGHT_TODAY,
  PLEASE_WRITE_FULL_NUMBER_DECIMAL,
  REQUIRED,
  PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS,
  WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY,
  PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT,
  HOW_HAS_YOUR_ONBOARDING_EXPERIENCE_BEEN_SO_FAR,
  NEEAR001_BODY_COMPOSITION,
  PERCENT_NUMBER,
  SERISD001_BODY_WEIGHT,
  SURVEY_COMPLETED,
  PLEASE_PROVIDE_ANY_FEEDBACK,
  IF_YOU_HAVE_ANY_QUESTIONS_NOT_BEEN_ANSWERED,
} from "../strings/surveyStrings";

import { NEXT, PREVIOUS, SUBMIT_SURVEY } from "../helpers/generalStrings";
import moment from "moment";

export const SERISD001_BODY_WEIGHT_ID: string =
  '[data-testid="SURVEY_CARD_SER-ISD-001 - Body Weight"]';
export const NEEAR001_BODY_COMPOSITION_ID: string =
  '[data-testid="SURVEY_CARD_NEAAR-001 - Body Composition"]';
export const ONBOARDING_PRACTICE_SURVEY_ID: string =
  '[data-testid="SURVEY_CARD_Onboarding Practice Survey"]';
export const FEEDBACK_TEXT_INPUT: string = 'textarea[name="feedback"]';
export const QUESTIONS_TEXT_INPUT: string = 'textarea[name="questions"]';
export const DATE_TEXT: string = "p.MuiTypography-body1.css-xhbppr";
export const BUTTON: string = "button";
export const VALUE_LBS_INPUT: string = "input.MuiInputBase-input";
export const VALUE_TYPE: string = "p.MuiTypography-root.css-10o8u6h";
export const PROGRESS_BAR_VALUE_ID = (progressValue: string): string =>
  `span[role="progressbar"][aria-valuenow="${progressValue}"]`;

export const VALUE_PROGRESS_BAR_TEXT: string = "p.MuiTypography-root";
export const CONTAINED_PRIMARY_BUTTON: string =
  "button.MuiButton-containedPrimary";
export const ALERT_NOTIFICATION: string = ".MuiAlert-message";

export const SNACK_BAR_ALERT_ID: string = '[data-testid="SNACK_BAR_ALERT"]';

export const SCHEDULE_ONCE = (date: string, time: string) =>
  `Once on ${date} at ${time}`;
export const SCHEDULE_MONTHLY = (date: string, time: string) =>
  `Once on ${date} at ${time}`;
export const SCHEDULE_DAILY = (time: string) => `Daily at ${time}`;
export const SCHEDULE_BIWEEKLY = (day: string, time: string) =>
  `Biweekly on ${day} at ${time}`;
export const SCHEDULE_TRIWEEKLY = (day: string, time: string) =>
  `Triweekly on ${day} at ${time}`;
export const SCHEDULE_WEEKLY = (day: string, time: string) =>
  `Weekly on ${day} at ${time}`;

export const RADIO_OPTION_EXCELLENT = 'input[value="Excellent"]';
export const RADIO_OPTION_GOOD = 'input[value="Good"]';
export const RADIO_OPTION_CONFUSING = 'input[value="Confusing"]';

export const verifySurveyCard = (surveyName: string, schedule: string) => {
  cy.contains("h6", surveyName);
  cy.contains("h6", schedule);
};

export const verifyWeightScreenContent = (
  progressBarValue: string,
  surveyName: string,
) => {
  cy.get(PROGRESS_BAR_VALUE_ID(progressBarValue)).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should(
    "contain",
    PERCENT_NUMBER(progressBarValue),
  );
  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.contains("h4", surveyName).should("be.visible");

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(WHAT_IS_YOUR_WEIGHT_TODAY);
  cy.contains(PLEASE_WRITE_FULL_NUMBER_DECIMAL);
  cy.contains(REQUIRED);
  cy.get(VALUE_LBS_INPUT).should("have.attr", "placeholder", "000.0");
  cy.get(VALUE_TYPE).should("contain", "00.0");
  cy.contains(PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS);
};

export const verifyOnboardingExperienceScreen = (
  progressBarValue: string,
  surveyName: string,
) => {
  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.contains("h4", surveyName).should("be.visible");

  cy.get(PROGRESS_BAR_VALUE_ID(progressBarValue)).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should(
    "contain",
    PERCENT_NUMBER(progressBarValue),
  );

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(HOW_HAS_YOUR_ONBOARDING_EXPERIENCE_BEEN_SO_FAR);
  cy.contains(REQUIRED);
  cy.get(RADIO_OPTION_EXCELLENT).should("exist").should("not.be.checked");
  cy.get(RADIO_OPTION_GOOD).should("exist").should("not.be.checked");
  cy.get(RADIO_OPTION_CONFUSING).should("exist").should("not.be.checked");
  cy.contains("button", NEXT).should("be.visible");
};

export const verifyProvideFeedbackScreen = (
  progressBarValue: string,
  surveyName: string,
) => {
  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.get(PROGRESS_BAR_VALUE_ID(progressBarValue)).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should(
    "contain",
    PERCENT_NUMBER(progressBarValue),
  );
  cy.contains("h4", surveyName).should("be.visible");

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(PLEASE_PROVIDE_ANY_FEEDBACK);
  cy.contains(REQUIRED);

  cy.get(FEEDBACK_TEXT_INPUT)
    .should("be.visible")
    .and("have.attr", "placeholder", "");

  cy.contains("button", PREVIOUS).should("be.visible");
  cy.contains("button", NEXT).should("be.visible");
};

export const verifyQuestionsNotBeenAnsweredScreen = (
  progressBarValue: string,
  surveyName: string,
) => {
  cy.contains(BUTTON, CLOSE).should("be.visible");

  cy.get(PROGRESS_BAR_VALUE_ID(progressBarValue)).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should(
    "contain",
    PERCENT_NUMBER(progressBarValue),
  );
  cy.contains("h4", surveyName).should("be.visible");

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(IF_YOU_HAVE_ANY_QUESTIONS_NOT_BEEN_ANSWERED);
  cy.contains(REQUIRED).should("not.exist");

  cy.get(QUESTIONS_TEXT_INPUT)
    .should("be.visible")
    .and("have.attr", "placeholder", "");

  cy.contains("button", PREVIOUS).should("be.visible");
  cy.contains("button", NEXT).should("be.visible");
};

export const verifyOnboardPracticeConfirmationScreen = (
  progressBarValue: string,
  surveyName: string,
) => {
  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.get(PROGRESS_BAR_VALUE_ID(progressBarValue)).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should(
    "contain",
    PERCENT_NUMBER(progressBarValue),
  );
  cy.contains("h4", surveyName).should("be.visible");

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(HOW_HAS_YOUR_ONBOARDING_EXPERIENCE_BEEN_SO_FAR);
  cy.contains(PLEASE_PROVIDE_ANY_FEEDBACK);
  cy.contains(IF_YOU_HAVE_ANY_QUESTIONS_NOT_BEEN_ANSWERED);

  cy.contains("button", PREVIOUS).should("be.visible");
  cy.contains("button", SUBMIT_SURVEY).should("be.visible");
};

export const checkAlertMessage = (message: string) => {
  const ALERT_NOTIFICATION: string = ".MuiAlert-message";
  cy.get(ALERT_NOTIFICATION).should("be.visible").should("have.text", message);
};
export const verifyInputMessageError = (
  showMsgError: boolean,
  msgError: string,
) => {
  if (showMsgError) {
    cy.get("p.MuiFormHelperText-root.Mui-error")
      .should("be.visible")
      .and("contain", msgError);
  } else {
    cy.get("p.MuiFormHelperText-root.Mui-error").should("not.exist");
  }
};

export const submitSurvey = (waitTimeMs: number) => {
  cy.contains("button", SUBMIT_SURVEY).click();
  cy.get(SNACK_BAR_ALERT_ID).should("be.visible").contains(SURVEY_COMPLETED);
  cy.wait(waitTimeMs);
  console.log(`After waiting for ${waitTimeMs} milliseconds`);
};

export const verifyBodyWeightConfirmScreen = (
  progressBarValue: string,
  weightInLbs: string,
) => {
  cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

  cy.get(PROGRESS_BAR_VALUE_ID(progressBarValue)).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should(
    "contain",
    PERCENT_NUMBER(progressBarValue),
  );
  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.contains("h4", SERISD001_BODY_WEIGHT);
  cy.contains(WHAT_IS_YOUR_WEIGHT_TODAY);
  cy.contains(`${weightInLbs} lbs`);
  cy.contains("button", PREVIOUS).should("be.visible");
  cy.contains("button", SUBMIT_SURVEY).should("be.visible");
};

export const validateTitleOnScreen = (surveyTitle: string) => {
  cy.contains("h5", surveyTitle).should("be.visible");
};
export const verifyBodyCompositionScreenContent = (
  progressBarValue: string,
  surveyTitle: string,
) => {
  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.contains("h4", surveyTitle).should("be.visible");

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY);
  cy.contains(PLEASE_WRITE_FULL_NUMBER_DECIMAL);
  cy.contains(REQUIRED);
  cy.get(VALUE_LBS_INPUT).should("have.attr", "placeholder", "00.0");
  cy.get(VALUE_TYPE).should("contain", "%");
  cy.contains(PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT);

  cy.get(progressBarValue).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should("contain", progressBarValue);
  cy.contains("button", PREVIOUS).should("be.visible");
};

export const verifyBodyCompositionConfirmScreen = (
  progressBarValue: string,
  weightInLbs: string,
  bodyFatInPercent: string,
) => {
  cy.get(progressBarValue).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should("contain", progressBarValue);

  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.contains("h4", NEEAR001_BODY_COMPOSITION);
  cy.contains(WHAT_IS_YOUR_WEIGHT_TODAY);

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY);
  cy.contains(`${weightInLbs} lbs`);
  cy.contains(`${bodyFatInPercent} %`);
  cy.contains("button", PREVIOUS).should("be.visible");
  cy.contains("button", SUBMIT_SURVEY).should("be.visible");
};
