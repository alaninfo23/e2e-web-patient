import moment from "moment";
import "moment/min/locales";

export const LOGIN_FORM_ID: string = '[data-testid="LOGIN_FORM"]';
export const CONFIRM_YOUR_CODE_TEXT_FIELD_ID: string =
  "CONFIRM_YOUR_CODE_TEXT_FIELD";

export const FILTER_DROPDOWN_ID: string = '[data-testid="FILTER_DROPDOWN"]';
export const FILTER_ITEM_ID: string = '[data-testid="FILTER_ITEM"]';
export const TIME_INPUT: string = 'input[name="time"]';
export const TEXT_INPUT: string = 'input[type="text"]';
export const LOGIN_EMAIL_INPUT: string = 'input[name="username"]';
export const LOGIN_PASSWORD_INPUT: string = 'input[name="password"]';
export const LOGIN_BUTTON: string = 'button[type="submit"]';
export const LOG_OUT_BUTTON: string =
  "button.MuiButton-root h6.MuiTypography-root";

export const SURVEY_SCHEDULES_BUTTON_ID: string =
  '[data-testid="SURVEY_SCHEDULES_BUTTON"]';
export const ASSIGN_BUTTON_ID: string = '[data-testid="ASSIGN_BUTTON"]';
export const UNASSIGN_BUTTON_ID: string = '[data-testid="UNASSIGN_BUTTON"]';
export const UNASSIGN_DIALOG_BUTTON_ID: string =
  '[data-testid="Unassign_DIALOG_BUTTON"]';
export const ASSIGN_DIALOG_BUTTON_ID: string =
  '[data-testid="ASSIGN_DIALOG_BUTTON"]';
export const SURVEYS_TAB_ID: string = '[data-testid="SURVEYS_TAB"]';
export const CT_PATIENTS_TAB_ID: string = '[data-testid="CT_PATIENTS_TAB"]';
export const PATIENT_PROFILE_BUTTON_ID: string =
  '[data-testid="PATIENT_PROFILE_BUTTON"]';
export const USER_CARD_ID: string = '[data-testid="USER_CARD"]';
export const TAB_HOME_ID: string = '[data-testid="TAB_HOME"]';

export const loginWebAdmin = (email: string, senha: string) => {
  cy.visit("https://qa.care.faethdigitalhealth.com/");
  cy.get(LOGIN_EMAIL_INPUT).type(email);
  cy.get(LOGIN_PASSWORD_INPUT).type(senha);
  cy.get(LOGIN_BUTTON).click();
};

export const getPreviousHour = () => {
  const currentTime = moment();
  const newTime = currentTime.clone().subtract(1, "hour");
  const hours = newTime.format("h");
  const minutes = newTime.format("mm");
  const ampm = newTime.format("A");
  const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(
    2,
    "0",
  )} ${ampm}`;
  return formattedTime;
};
export const calculatedTime = getPreviousHour();

export const assignSurveyToPatient = (
  patientName: string,
  scheduleName: string,
) => {
  cy.get(CT_PATIENTS_TAB_ID, { timeout: 500000 }).should("be.visible").click();

  cy.get(FILTER_DROPDOWN_ID).click();

  cy.contains(FILTER_ITEM_ID, "Patient name").click();

  cy.get(TEXT_INPUT).should("be.visible").type(patientName);

  cy.wait(2000);

  cy.get(PATIENT_PROFILE_BUTTON_ID).should("be.visible").click();

  cy.url().should(
    "include",
    "https://qa.care.faethdigitalhealth.com/patient/pat_ea4dffb3-053b-4cab-84e6-679bb2909f0f",
  );

  cy.get(SURVEYS_TAB_ID).click();

  cy.get(SURVEY_SCHEDULES_BUTTON_ID).click();

  cy.get(TEXT_INPUT).type(scheduleName);

  cy.wait(1000);

  cy.get(ASSIGN_BUTTON_ID).should("be.visible").click();

  cy.get(TIME_INPUT).click().clear().type(calculatedTime);

  cy.get(ASSIGN_DIALOG_BUTTON_ID).should("be.visible").click();

  cy.get(UNASSIGN_BUTTON_ID)
    .should("be.visible")
    .should("have.text", "Unassign");
};

export const unassignSurveyToPatient = (
  patientName: string,
  scheduleName: string,
) => {
  cy.get(CT_PATIENTS_TAB_ID, { timeout: 500000 }).should("be.visible").click();

  cy.get(FILTER_DROPDOWN_ID).click();

  cy.contains("[data-testid=FILTER_ITEM]", "Patient name").click();

  cy.get(TEXT_INPUT).should("be.visible").type(patientName);

  cy.wait(2000);

  cy.get(PATIENT_PROFILE_BUTTON_ID).should("be.visible").click();

  cy.url().should(
    "include",
    "https://qa.care.faethdigitalhealth.com/patient/pat_ea4dffb3-053b-4cab-84e6-679bb2909f0f",
  );

  cy.get(SURVEYS_TAB_ID).click();

  cy.get(SURVEY_SCHEDULES_BUTTON_ID).click();

  cy.get(TEXT_INPUT).type(scheduleName);

  cy.wait(1000);

  cy.get(UNASSIGN_BUTTON_ID).should("be.visible").click();

  cy.get(UNASSIGN_DIALOG_BUTTON_ID).click();

  cy.get(ASSIGN_BUTTON_ID).should("have.text", "Assign");
};

export const logoutWebAdmin = () => {
  cy.get(TAB_HOME_ID).click();
  cy.get(USER_CARD_ID).click();
  cy.get(LOG_OUT_BUTTON).contains("Log out").should("be.visible").click();
  cy.url().should(
    "include",
    "https://qa.care.faethdigitalhealth.com/profile/login",
  );
  cy.get(LOGIN_FORM_ID).should("be.visible");
};
