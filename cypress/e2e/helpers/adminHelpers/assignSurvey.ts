import moment from "moment";
import "moment/min/locales";

import * as homeHelpers from "../../helpers/homeHelpers";

export const LABEL_CONFIRM_YOUR_CODE_TEXT_FIELD: string =
  "CONFIRM_YOUR_CODE_TEXT_FIELD";
export const FILTER_DROPDOWN_ID: string = "FILTER_DROPDOWN";
export const FILTER_ITEM_ID: string = "FILTER_ITEM";
export const INPUT_CT_SEARCH: string = 'input[type="text"]';
export const INPUT_SCHEDULE_SEARCH: string = 'input[type="text"]';
export const BUTTON_LOG_OUT: string = 'button[type="button"]';
export const BUTTON_USER_CARD_ID: string = "USER_CARD";
export const BUTTON_PATIENT_PROFILE_ID: string = "PATIENT_PROFILE_BUTTON";
export const BUTTON_CT_PATIENTS_TAB_ID: string = "CT_PATIENTS_TAB";
export const BUTTON_SURVEYS_TAB_ID: string = "SURVEYS_TAB";
export const BUTTON_SURVEY_SCHEDULES_ID: string = "SURVEY_SCHEDULES_BUTTON";
export const BUTTON_ASSIGN_BUTTON_ID: string = "ASSIGN_BUTTON";
export const BUTTON_ASSIGN_DIALOG_ID: string = "ASSIGN_DIALOG_BUTTON";
export const BUTTON_UNASSIGN_BUTTON_ID: string = "UNASSIGN_BUTTON";
export const BUTTON_UNASSIGN_DIALOG_ID: string = "Unassign_DIALOG_BUTTON";
export const ALERT_SNACK_BAR_ALERT_ID: string = "ALERT_SNACK_BAR";
export const BUTTON_TAB_HOME_ID: string = "TAB_HOME";

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

export const clearSessionData = () => {
  cy.clearCookies();
  cy.clearLocalStorage();
}
export const assignSurveyToPatient = (
  patientName: string,
  scheduleName: string
) => {
  cy.getByDataTestID(BUTTON_CT_PATIENTS_TAB_ID).should("be.visible").click();

  cy.getByDataTestID(FILTER_DROPDOWN_ID).click();
  cy.contains("[data-testid=FILTER_ITEM]", "Patient name").click();
  cy.get(INPUT_CT_SEARCH).should("be.visible").type(patientName);
  cy.wait(2000);

  cy.getByDataTestID(BUTTON_PATIENT_PROFILE_ID).should("be.visible").click();

  cy.url().should(
    "include",
    "https://qa.care.faethdigitalhealth.com/patient/pat_ea4dffb3-053b-4cab-84e6-679bb2909f0f"
  );

  cy.getByDataTestID(BUTTON_SURVEYS_TAB_ID).click();

  cy.getByDataTestID(BUTTON_SURVEY_SCHEDULES_ID).click();

  cy.get(INPUT_SCHEDULE_SEARCH).type(scheduleName);
  cy.wait(1000);

  cy.getByDataTestID(BUTTON_ASSIGN_BUTTON_ID).should("be.visible").click();

  cy.get('input[name="time"]').click().clear().type(calculatedTime);

  cy.getByDataTestID(BUTTON_ASSIGN_DIALOG_ID).should("be.visible").click();

  cy.getByDataTestID(BUTTON_UNASSIGN_BUTTON_ID)
    .should("be.visible")
    .should("have.text", "Unassign");
};

export const unassignSurveyToPatient = (
  patientName: string,
  scheduleName: string
) => {
  cy.getByDataTestID(BUTTON_CT_PATIENTS_TAB_ID).should("be.visible").click();

  cy.getByDataTestID(FILTER_DROPDOWN_ID).click();
  cy.contains("[data-testid=FILTER_ITEM]", "Patient name").click();
  cy.get(INPUT_CT_SEARCH).should("be.visible").type(patientName);
  cy.wait(2000);

  cy.getByDataTestID(BUTTON_PATIENT_PROFILE_ID).should("be.visible").click();

  cy.url().should(
    "include",
    "https://qa.care.faethdigitalhealth.com/patient/pat_ea4dffb3-053b-4cab-84e6-679bb2909f0f"
  );

  cy.getByDataTestID(BUTTON_SURVEYS_TAB_ID).click();

  cy.getByDataTestID(BUTTON_SURVEY_SCHEDULES_ID).click();

  cy.get(INPUT_SCHEDULE_SEARCH).type(scheduleName);
  cy.wait(1000);

  cy.getByDataTestID(BUTTON_UNASSIGN_BUTTON_ID).click();

  cy.getByDataTestID(BUTTON_UNASSIGN_DIALOG_ID).click();

  cy.getByDataTestID(BUTTON_ASSIGN_BUTTON_ID).should("have.text", "Assign");
};

export const logoutWebAdmin = () => {
  cy.getByDataTestID(BUTTON_TAB_HOME_ID).click();
  cy.getByDataTestID(BUTTON_USER_CARD_ID).click();
  cy.get(BUTTON_LOG_OUT).contains("Log out").click();
};

export const logoutWebPatient = () => {
  cy.getByDataTestID(homeHelpers.BUTTON_OPEN_MENU_ICON)
    .should("be.visible")
    .click();
  cy.getByDataTestID(homeHelpers.BUTTON_OPEN_LOG_OUT_OPTION).click();
};
