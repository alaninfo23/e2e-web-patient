import "moment/min/locales";
import { format } from "date-fns";

import {
  CLOSE,
  WHAT_IS_YOUR_WEIGHT_TODAY,
  PLEASE_WRITE_FULL_NUMBER_DECIMAL,
  REQUIRED,
  LBS_00_0,
  LBS_000_0,
  LBS,
  PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS,
  WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY,
  PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT,
  NEEAR001_BODY_COMPOSITION,
  PERCENT,
  PERCENT_NUMBER,
  SERISD001_BODY_WEIGHT,
  SURVEY_COMPLETED,
} from "../strings/surveyStrings";

import { NEXT, PREVIOUS, SUBMIT_SURVEY } from "../helpers/generalStrings";

export const SERISD001_BODY_WEIGHT_ID: string =
  '[data-testid="SURVEY_CARD_SER-ISD-001 - Body Weight"]';
export const NEEAR001_BODY_COMPOSITION_ID: string =
  '[data-testid="SURVEY_CARD_NEAAR-001 - Body Composition"]';
export const DATE_TEXT: string = "p.MuiTypography-body1.css-xhbppr";
export const BUTTON: string = "button";
export const VALUE_LBS_INPUT: string = "input.MuiInputBase-input";
export const VALUE_TYPE: string = "p.MuiTypography-root.css-10o8u6h";
export const PROGRESS_BAR_VALUE_ID = (progressValue: string): string =>
  `span[role="progressbar"][aria-valuenow="${progressValue}"]`;

export const VALUE_PROGRESS_BAR_TEXT: string = "p.MuiTypography-root";
export const CONTAINED_PRIMARY_BUTTON: string =
  "button.MuiButton-containedPrimary";

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

export const verifySurveyCard = (
  surveyName: string,
  schedule: string,
  status: string,
) => {
  cy.contains("h6", surveyName);
  cy.contains("h6", schedule);
  cy.contains("h6", status);
};

export const verifyWeightScreenContent = (
  progressBarValue: string,
  percentValue: string,
  surveyName: string,
) => {
  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.contains("h4", surveyName).should("be.visible");

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(WHAT_IS_YOUR_WEIGHT_TODAY);
  cy.contains(PLEASE_WRITE_FULL_NUMBER_DECIMAL);
  cy.contains(REQUIRED);
  cy.get(VALUE_LBS_INPUT).should("have.attr", "placeholder", LBS_000_0);
  cy.get(VALUE_TYPE).should("contain", LBS);
  cy.contains(PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS);

  cy.get(PROGRESS_BAR_VALUE_ID(progressBarValue)).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should(
    "contain",
    PERCENT_NUMBER(percentValue),
  );
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

export const submitSurvey = () => {
  cy.contains("button", SUBMIT_SURVEY).click();
  cy.get(SNACK_BAR_ALERT_ID).should("be.visible").contains(SURVEY_COMPLETED);
  cy.wait(7000);
};

export const verifyBodyWeightConfirmScreen = (
  weightInLbs: string,
  progressBarImageSelector: string,
  percentValue: string,
) => {
  cy.get(CONTAINED_PRIMARY_BUTTON).contains(NEXT).click();

  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.contains("h4", SERISD001_BODY_WEIGHT);
  cy.contains(WHAT_IS_YOUR_WEIGHT_TODAY);
  cy.contains(`${weightInLbs} ${LBS}`);
  cy.contains("button", PREVIOUS).should("be.visible");
  cy.contains("button", SUBMIT_SURVEY).should("be.visible");

  cy.get(progressBarImageSelector).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should("contain", percentValue);
};

export const validateTitleOnScreen = (surveyTitle: string) => {
  cy.contains("h5", surveyTitle).should("be.visible");
};
export const verifyBodyCompositionScreenContent = (
  surveyTitle: string,
  progressBarImageSelector: string,
  percentValue: string,
) => {
  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.contains("h4", surveyTitle).should("be.visible");

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY);
  cy.contains(PLEASE_WRITE_FULL_NUMBER_DECIMAL);
  cy.contains(REQUIRED);
  cy.get(VALUE_LBS_INPUT).should("have.attr", "placeholder", LBS_00_0);
  cy.get(VALUE_TYPE).should("contain", PERCENT);
  cy.contains(PLEASE_INSERT_VALUE_BETWEEN_2_60_PERCENT);

  cy.get(progressBarImageSelector).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should("contain", percentValue);
  cy.contains("button", PREVIOUS).should("be.visible");
};

export const verifyBodyCompositionConfirmScreen = (
  weightInLbs: string,
  bodyFatInPercent: string,
  progressBarImageSelector: string,
  percentValue: string,
) => {
  cy.contains(BUTTON, CLOSE).should("be.visible");
  cy.contains("h4", NEEAR001_BODY_COMPOSITION);
  cy.contains(WHAT_IS_YOUR_WEIGHT_TODAY);

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(WHAT_IS_YOUR_BODY_FAT_PERCENTAGE_TODAY);
  cy.contains(`${weightInLbs} ${LBS}`);
  cy.contains(`${bodyFatInPercent} ${PERCENT}`);
  cy.contains("button", PREVIOUS).should("be.visible");
  cy.contains("button", SUBMIT_SURVEY).should("be.visible");

  cy.get(progressBarImageSelector).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should("contain", percentValue);
};
