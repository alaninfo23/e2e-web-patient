import * as assignSurvey from "../helpers/adminHelpers/assignSurvey";
import * as homeHelpers from "../helpers/homeHelpers";
import * as answerSurvey from "../helpers/answerSurvey";
import moment from "moment";
import "moment/min/locales";

describe("Create new account page", () => {
  beforeEach(() => {
    assignSurvey.assignSurveyToPatient();
  });

  it("FDHA-3992 Patient should be able to answer SER-ISD-001 - Body Weight survey", () => {
    cy.loginWebPatient(
      Cypress.env("emailWebPatient"),
      Cypress.env("passwordWebPatient")
    );
    cy.wait(5000);
    cy.get(homeHelpers.BUTTON_SURVEY_CARD("Surveys"))
      .should("be.visible")
      .click();
    cy.contains("h6", "SER-ISD-001 - Body Weight");
    cy.contains("h6", "OPEN");

    cy.get('[data-testid="SURVEY_CARD_SER-ISD-001 - Body Weight"]').click();

    cy.get(answerSurvey.BUTTON_CLOSE).should("contain", "Close");

    cy.contains("h4", "SER-ISD-001 - Body Weight");
    cy.get(answerSurvey.TEXT_DATE)
      .invoke("text")
      .then((text) => {
        const formattedDate = moment(text, "dddd, MMMM DD", "en", true);
        expect(formattedDate.isValid()).to.be.true;
        const formattedDateText = formattedDate.format("dddd, MMMM DD");
        expect(formattedDateText).to.equal(text);
        cy.get(answerSurvey.TEXT_DATE).should("contain", formattedDateText);
      });

    cy.contains("What is your weight today?");
    cy.contains("Please write the full number including the decimal.");
    cy.get(answerSurvey.INPUT_VALUE_LBS).should(
      "have.attr",
      "placeholder",
      "000.0"
    );
    cy.get(answerSurvey.INPUT_VALUE_LBS).type("1650");
    cy.get(answerSurvey.TEXT_LBS).should("contain", "lbs");
    cy.contains("Please insert a value between 65 - 700 lbs");
    cy.get(answerSurvey.IMG_PROGRESS_BAR_50).should("exist");
    cy.get(answerSurvey.TEXT_VALUE_PROGRESS_BAR).should("contain", "50%");
    cy.get(answerSurvey.BUTTON_NEXT).contains("Next").click();
    cy.contains("What is your weight today?");
    cy.contains("165.0 lbs");
    cy.contains("button", "Previous").click();
    cy.contains("Please write the full number including the decimal.");
    cy.get("button.MuiButton-containedPrimary").contains("Next").click();
    cy.contains("button", "Submit Survey").click();
    cy.get(answerSurvey.SNACK_BAR_ALERT_COMPLETED)
      .should("be.visible")
      .contains("Survey completed. Great job!");
  });

  it("FDHA-6358 Body Weight survey should be shown on Survey list", () => {
    cy.loginWebAdmin(Cypress.env("emailAdmin"), Cypress.env("passwordAdmin"));
    cy.wait(16000);

    cy.getByDataTestID(assignSurvey.BUTTON_TC_PATIENTS_TAB_ID).click();
    cy.get(assignSurvey.INPUT_CT_SEARCH).type("Alan Patient 20");
    cy.wait(3000);
    cy.getByDataTestID(assignSurvey.BUTTON_PATIENT_PROFILE_ID).click();
    cy.getByDataTestID(assignSurvey.BUTTON_SURVEYS_TAB_ID).click();

    cy.contains(
      'td[data-testid="SURVEY_INSTANCE_NAME_CELL"]',
      "SER-ISD-001 - Body Weight"
    );
    cy.get('div[data-testid="CHIP"]').should("contain", "done");
  });

  afterEach(() => {
    assignSurvey.unassignSurveyToPatient();
  });
});
