import "moment/min/locales";
import { format } from "date-fns";

import * as surveyStrings from "../strings/surveyStrings";
import * as generalStrings from "../helpers/generalStrings";

export const SERISD001_BODY_WEIGHT_ID: string =
  '[data-testid="SURVEY_CARD_SER-ISD-001 - Body Weight"]';
export const DATE_TEXT: string = "p.MuiTypography-body1.css-xhbppr";
export const BUTTON: string = "button";
export const VALUE_LBS_INPUT: string = "input.MuiInputBase-input";
export const LBS_TEXT: string = "p.MuiTypography-root.css-10o8u6h";
export const PROGRESS_BAR_50_IMG: string =
  'span[role="progressbar"][aria-valuenow="50"]';
export const PROGRESS_BAR_100_IMG: string =
  'span[role="progressbar"][aria-valuenow="100"]';
export const VALUE_PROGRESS_BAR_TEXT: string = "p.MuiTypography-root";
export const PRIMARY_BUTTON: string = "button.MuiButton-containedPrimary";

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
  frequency: string,
  schedule: string,
) => {
  cy.contains("h6", surveyName);
  cy.contains("h6", frequency);
  cy.contains("h6", schedule);
};

export const verifyWeightScreenContent = () => {
  cy.contains(BUTTON, surveyStrings.CLOSE).should("be.visible");
  cy.contains("h4", surveyStrings.SERISD001_BODY_WEIGHT).should("be.visible");

  const currentDate = new Date();
  const formattedDateText = format(currentDate, "EEEE, MMMM dd");
  cy.get(DATE_TEXT).should("contain", formattedDateText);

  cy.contains(surveyStrings.WHAT_IS_YOUR_WEIGHT_TODAY);
  cy.contains(surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS);
  cy.contains(surveyStrings.REQUIRED);
  cy.get(VALUE_LBS_INPUT).should(
    "have.attr",
    "placeholder",
    surveyStrings.LBS_000_0,
  );
  cy.get(LBS_TEXT).should("contain", surveyStrings.LBS);

  cy.get(PROGRESS_BAR_50_IMG).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should("contain", surveyStrings.PERCENT50);
};

export const verifyWeightIntervalMsgError = (showMsgError: boolean) => {
  if (showMsgError) {
    cy.get("p.MuiFormHelperText-root.Mui-error")
      .should("be.visible")
      .and("contain", surveyStrings.PLEASE_INSERT_VALUE_BETWEEN_60_700_LBS);
  } else {
    cy.get("p.MuiFormHelperText-root.Mui-error").should("not.exist");
  }
};

export const verifyBodyWeightConfirmScreen = (weightInLbs: string) => {
  cy.get(PRIMARY_BUTTON).contains(generalStrings.NEXT).click();

  cy.contains(BUTTON, surveyStrings.CLOSE).should("be.visible");
  cy.contains("h4", surveyStrings.SERISD001_BODY_WEIGHT);
  cy.contains(surveyStrings.WHAT_IS_YOUR_WEIGHT_TODAY);
  cy.contains(`${weightInLbs} ${surveyStrings.LBS}`);
  cy.contains("button", generalStrings.PREVIOUS).should("be.visible");

  cy.get(PROGRESS_BAR_100_IMG).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should("contain", surveyStrings.PERCENT100);
};

export const submitSurvey = () => {
  cy.contains("button", generalStrings.SUBMIT_SURVEY).click();
  cy.get(SNACK_BAR_ALERT_ID)
    .should("be.visible")
    .contains(surveyStrings.SURVEY_COMPLETED);
  cy.wait(7000);
};
