import * as setupAssignSurvey from "../adminHelpers/assignSurvey";

export const LABEL_CONFIRM_YOUR_CODE_TEXT_FIELD: string =
  "CONFIRM_YOUR_CODE_TEXT_FIELD";
export const INPUT_CT_SEARCH: string = 'input[type="text"]';
export const INPUT_SCHEDULE_SEARCH: string = 'input[type="text"]';

export const BUTTON_USER_CARD_ID: string = "USER_CARD";
export const BUTTON_PATIENT_PROFILE_ID: string = "PATIENT_PROFILE_BUTTON";
export const BUTTON_TC_PATIENTS_TAB_ID: string = "CT_PATIENTS_TAB";
export const BUTTON_SURVEYS_TAB_ID: string = "SURVEYS_TAB";
export const BUTTON_SURVEY_SCHEDULES_ID: string = "SURVEY_SCHEDULES_BUTTON";
export const BUTTON_ASSIGN_BUTTON_ID: string = "ASSIGN_BUTTON";
export const BUTTON_ASSIGN_DIALOG_ID: string = "ASSIGN_DIALOG_BUTTON";
export const BUTTON_UNASSIGN_BUTTON_ID: string = "UNASSIGN_BUTTON";
export const BUTTON_UNASSIGN_DIALOG_ID: string = "Unassign_DIALOG_BUTTON";
export const ALERT_SNACK_BAR_ALERT_ID: string = "ALERT_SNACK_BAR";

export const assignSurveyToPatient = () => {
  cy.loginWebAdmin(Cypress.env("emailAdmin"), Cypress.env("passwordAdmin"));
  cy.wait(16000);

  cy.getByDataTestID(setupAssignSurvey.BUTTON_TC_PATIENTS_TAB_ID)
    .should("be.visible")
    .click();

  cy.get(setupAssignSurvey.INPUT_CT_SEARCH)
    .should("be.visible")
    .type("Alan Patient 20");
  cy.wait(3000);

  cy.getByDataTestID(setupAssignSurvey.BUTTON_PATIENT_PROFILE_ID)
    .should("be.visible")
    .click();

  cy.url().should(
    "include",
    "https://qa.care.faethdigitalhealth.com/patient/pat_ea4dffb3-053b-4cab-84e6-679bb2909f0f"
  );

  cy.getByDataTestID(setupAssignSurvey.BUTTON_SURVEYS_TAB_ID).click();

  cy.getByDataTestID(setupAssignSurvey.BUTTON_SURVEY_SCHEDULES_ID).click();

  cy.get(setupAssignSurvey.INPUT_SCHEDULE_SEARCH).type("SER-ISD-001");
  cy.wait(3000);

  cy.getByDataTestID(setupAssignSurvey.BUTTON_ASSIGN_BUTTON_ID)
    .should("be.visible")
    .click();
  cy.getByDataTestID(setupAssignSurvey.BUTTON_ASSIGN_DIALOG_ID)
    .should("be.visible")
    .click();

  cy.getByDataTestID(setupAssignSurvey.BUTTON_UNASSIGN_BUTTON_ID)
    .should("be.visible")
    .should("have.text", "Unassign");
};

export const unassignSurveyToPatient = () => {
  cy.loginWebAdmin(Cypress.env("emailAdmin"), Cypress.env("passwordAdmin"));
  cy.wait(16000);

  cy.getByDataTestID(setupAssignSurvey.BUTTON_TC_PATIENTS_TAB_ID).click();

  cy.get(setupAssignSurvey.INPUT_CT_SEARCH).type("Alan Patient 20");
  cy.wait(3000);

  cy.getByDataTestID(setupAssignSurvey.BUTTON_PATIENT_PROFILE_ID).click();

  cy.url().should(
    "include",
    "https://qa.care.faethdigitalhealth.com/patient/pat_ea4dffb3-053b-4cab-84e6-679bb2909f0f"
  );

  cy.getByDataTestID(setupAssignSurvey.BUTTON_SURVEYS_TAB_ID).click();

  cy.getByDataTestID(setupAssignSurvey.BUTTON_SURVEY_SCHEDULES_ID).click();

  cy.get(setupAssignSurvey.INPUT_SCHEDULE_SEARCH).type("SER-ISD-001");
  cy.wait(3000);

  cy.getByDataTestID(setupAssignSurvey.BUTTON_UNASSIGN_BUTTON_ID).click();

  cy.getByDataTestID(setupAssignSurvey.BUTTON_UNASSIGN_DIALOG_ID).click();

  cy.getByDataTestID(setupAssignSurvey.BUTTON_ASSIGN_BUTTON_ID).should(
    "have.text",
    "Assign"
  );
};
