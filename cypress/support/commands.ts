import * as loginHelper from "../e2e/helpers/loginHelper";
import * as setupAssignSurvey from "../e2e/helpers/setupAssignSurvey";
Cypress.Commands.add("getByDataTestID", (seletor: string) => {
  return cy.get(`[data-testid=${seletor}]`);
});

Cypress.Commands.add("loginWebPatient", (email: string, senha: string) => {
  cy.visit("https://qa.faethdigitalhealth.com/");
  cy.get(loginHelper.INPUT_LOGIN_EMAIL).type(email);
  cy.get(loginHelper.INPUT_LOGIN_PASSWORD).type(senha);
  cy.get(loginHelper.LINK_REMEMBER_ME).check();
  cy.get(loginHelper.BUTTON_LOGIN).click();
});

Cypress.Commands.add("loginWebAdmin", (email: string, senha: string) => {
  cy.visit("https://qa.care.faethdigitalhealth.com/");
  cy.get(loginHelper.INPUT_LOGIN_EMAIL).type(email);
  cy.get(loginHelper.INPUT_LOGIN_PASSWORD).type(senha);
  cy.get(loginHelper.BUTTON_LOGIN).click();
});

Cypress.Commands.add("assignSurveyToPatient", () => {
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
});

Cypress.Commands.add("unassignSurveyToPatient", () => {
  cy.loginWebAdmin(Cypress.env("emailAdmin"), Cypress.env("passwordAdmin"));
  cy.wait(16000);

  cy.getByDataTestID(setupAssignSurvey.BUTTON_TC_PATIENTS_TAB_ID)
    .click();

  cy.get(setupAssignSurvey.INPUT_CT_SEARCH)
    .type("Alan Patient 20");
  cy.wait(3000);

  cy.getByDataTestID(setupAssignSurvey.BUTTON_PATIENT_PROFILE_ID)
    .click();

  cy.url().should(
    "include",
    "https://qa.care.faethdigitalhealth.com/patient/pat_ea4dffb3-053b-4cab-84e6-679bb2909f0f"
  );

  cy.getByDataTestID(setupAssignSurvey.BUTTON_SURVEYS_TAB_ID).click();

  cy.getByDataTestID(setupAssignSurvey.BUTTON_SURVEY_SCHEDULES_ID).click();

  cy.get(setupAssignSurvey.INPUT_SCHEDULE_SEARCH).type("SER-ISD-001");
  cy.wait(3000);

  cy.getByDataTestID(setupAssignSurvey.BUTTON_UNASSIGN_BUTTON_ID)
    .click();

  cy.getByDataTestID(setupAssignSurvey.BUTTON_UNASSIGN_DIALOG_ID)
    .click();

  cy.getByDataTestID(setupAssignSurvey.BUTTON_ASSIGN_BUTTON_ID)
    .should("have.text", "Assign");
});
