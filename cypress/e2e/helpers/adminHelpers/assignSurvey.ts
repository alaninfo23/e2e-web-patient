import moment from "moment";
import "moment/min/locales";

import * as homeHelpers from "../../helpers/homeHelpers";

export const LOGIN_FORM_ID: string = "LOGIN_FORM";
export const CONFIRM_YOUR_CODE_TEXT_FIELD: string =
  "CONFIRM_YOUR_CODE_TEXT_FIELD";
export const FILTER_DROPDOWN_ID: string = "FILTER_DROPDOWN";
export const FILTER_ITEM_ID: string = "FILTER_ITEM";
export const INPUT_CT_SEARCH: string = 'input[type="text"]';
export const INPUT_SCHEDULE_SEARCH: string = 'input[type="text"]';

export const LOGIN_EMAIL_INPUT: string = 'input[name="username"]';
export const LOGIN_PASSWORD_INPUT: string = 'input[name="password"]';
export const LOGIN_BUTTON: string = 'button[type="submit"]';
export const LOG_OUT_BUTTON: string =
  "button.MuiButton-root h6.MuiTypography-root";

export const SURVEY_SCHEDULES_ID: string = "SURVEY_SCHEDULES_BUTTON";
export const ASSIGN_BUTTON_ID: string = '[data-testid="ASSIGN_BUTTON"]';
export const UNASSIGN_BUTTON_ID: string = '[data-testid="UNASSIGN_BUTTON"]';
export const UNASSIGN_DIALOG_BUTTON_ID: string = "Unassign_DIALOG_BUTTON";
export const ASSIGN_DIALOG_BUTTON_ID: string = "ASSIGN_DIALOG_BUTTON";
export const SURVEYS_TAB_ID: string = "SURVEYS_TAB";
export const CT_PATIENTS_TAB_ID: string = '[data-testid="CT_PATIENTS_TAB"]';
export const PATIENT_PROFILE_BUTTON_ID: string =
  '[data-testid="PATIENT_PROFILE_BUTTON"]';
export const USER_CARD_ID: string = "USER_CARD";
export const SNACK_BAR_ALERT_ID: string = "ALERT_SNACK_BAR";
export const TAB_HOME_ID: string = "TAB_HOME";

export const loginWebAdmin = (email: string, senha: string) => {
  cy.visit("https://qa.care.faethdigitalhealth.com/");
  cy.get(LOGIN_EMAIL_INPUT).type(email);
  cy.get(LOGIN_PASSWORD_INPUT).type(senha);
  cy.get(LOGIN_BUTTON).click();
};

export const calculateAndFormatAdjustedTime = () => {
  const currentTime = moment();
  const newTime = currentTime.clone().subtract(1, "hour");
  const hours = newTime.format("h");
  const minutes = newTime.format("mm");
  const ampm = newTime.format("A");
  const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(
    2,
    "0"
  )} ${ampm}`;
  return formattedTime;
};
export const calculatedTime = calculateAndFormatAdjustedTime();

export const assignSurveyToPatient = (
  patientName: string,
  scheduleName: string
) => {
  cy.get(CT_PATIENTS_TAB_ID, { timeout: 50000 }).should("be.visible").click();

  cy.getByDataTestID(FILTER_DROPDOWN_ID).click();

  cy.contains("[data-testid=FILTER_ITEM]", "Patient name").click();

  cy.get(INPUT_CT_SEARCH).should("be.visible").type(patientName);

  cy.wait(2000);

  cy.get(PATIENT_PROFILE_BUTTON_ID).should("be.visible").click();

  cy.url().should(
    "include",
    "https://qa.care.faethdigitalhealth.com/patient/pat_ea4dffb3-053b-4cab-84e6-679bb2909f0f"
  );

  cy.getByDataTestID(SURVEYS_TAB_ID).click();

  cy.getByDataTestID(SURVEY_SCHEDULES_ID).click();

  cy.get(INPUT_SCHEDULE_SEARCH).type(scheduleName);

  cy.wait(1000);

  cy.get(ASSIGN_BUTTON_ID).should("be.visible").click();

  cy.get('input[name="time"]').click().clear().type(calculatedTime);

  cy.getByDataTestID(ASSIGN_DIALOG_BUTTON_ID).should("be.visible").click();

  cy.get(UNASSIGN_BUTTON_ID)
    .should("be.visible")
    .should("have.text", "Unassign");
};

export const unassignSurveyToPatient = (
  patientName: string,
  scheduleName: string
) => {
  cy.get(CT_PATIENTS_TAB_ID, { timeout: 20000 }).should("be.visible").click();

  cy.getByDataTestID(FILTER_DROPDOWN_ID).click();

  cy.contains("[data-testid=FILTER_ITEM]", "Patient name").click();

  cy.get(INPUT_CT_SEARCH).should("be.visible").type(patientName);

  cy.wait(2000);

  cy.get(PATIENT_PROFILE_BUTTON_ID).should("be.visible").click();

  cy.url().should(
    "include",
    "https://qa.care.faethdigitalhealth.com/patient/pat_ea4dffb3-053b-4cab-84e6-679bb2909f0f"
  );

  cy.getByDataTestID(SURVEYS_TAB_ID).click();

  cy.getByDataTestID(SURVEY_SCHEDULES_ID).click();

  cy.get(INPUT_SCHEDULE_SEARCH).type(scheduleName);

  cy.wait(1000);

  cy.get(UNASSIGN_BUTTON_ID).should("be.visible").click();

  cy.getByDataTestID(UNASSIGN_DIALOG_BUTTON_ID).click();

  cy.get(ASSIGN_BUTTON_ID).should("have.text", "Assign");
};

export const logoutWebAdmin = () => {
  cy.getByDataTestID(TAB_HOME_ID).click();
  cy.getByDataTestID(USER_CARD_ID).click();
  cy.get(LOG_OUT_BUTTON).contains("Log out").click();
  cy.wait(1000);
  cy.getByDataTestID(LOGIN_FORM_ID).should("be.visible");
};
