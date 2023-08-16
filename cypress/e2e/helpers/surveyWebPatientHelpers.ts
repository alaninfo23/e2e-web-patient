import moment from "moment";
import "moment/min/locales";

import * as assignSurvey from "../helpers/adminHelpers/assignSurvey";

export const DATE_TEXT: string = "p.MuiTypography-body1.css-xhbppr";
export const CLOSE_BUTTON: string = "button";
export const VALUE_LBS_INPUT: string = "input.MuiInputBase-input";
export const LBS_TEXT: string = "p.MuiTypography-root.css-10o8u6h";
export const PROGRESS_BAR_50_IMG: string =
  'span[role="progressbar"][aria-valuenow="50"]';
export const PROGRESS_BAR_100_IMG: string =
  'span[role="progressbar"][aria-valuenow="100"]';

export const VALUE_PROGRESS_BAR_TEXT: string = "p.MuiTypography-root";
export const NEXT_BUTTON: string = "button.MuiButton-containedPrimary";

export const SNACK_BAR_ALERT_ID: string = '[data-testid="SNACK_BAR_ALERT"]';

export const verifySurveyCard = () => {
  cy.contains("h6", "SER-ISD-001 - Body Weight");
  cy.contains("h6", "OPEN");

  const currentDate = moment().format("MMM D");
  const expectedText = `Once on ${currentDate} at ${assignSurvey.calculatedTime}`;
  cy.log(expectedText);
  cy.contains("h6", expectedText);
};

export const verifyWeightScreenContent = () => {
  cy.contains(CLOSE_BUTTON, "Close");
  cy.contains("h4", "SER-ISD-001 - Body Weight");

  cy.get(DATE_TEXT)
    .invoke("text")
    .then((text) => {
      const formattedDate = moment(text, "dddd, MMMM DD", "en", true);
      expect(formattedDate.isValid()).to.be.true;
      const formattedDateText = formattedDate.format("dddd, MMMM DD");
      expect(formattedDateText).to.equal(text);
      cy.get(DATE_TEXT).should("contain", formattedDateText);
    });

  cy.contains("What is your weight today?");
  cy.contains("Please write the full number including the decimal.");
  cy.contains("*Required");
  cy.get(VALUE_LBS_INPUT).should("have.attr", "placeholder", "000.0");
  cy.get(LBS_TEXT).should("contain", "lbs");

  cy.get(PROGRESS_BAR_50_IMG).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should("contain", "50%");
};

export const verifyMsgWeightScreenContent = (showMsgError: boolean) => {
  if (showMsgError) {
    cy.get("p.MuiFormHelperText-root.Mui-error")
      .should("be.visible")
      .and("contain", "Please insert a value between 65 - 700 lbs");
  } else {
    cy.get("p.MuiFormHelperText-root.Mui-error").should("not.exist");
    cy.contains("button", "Previous").click();
  }
};

export const verifyWeightScreenContentConfirm = (weightInLbs: string) => {
  cy.get(NEXT_BUTTON).contains("Next").click();

  cy.get(CLOSE_BUTTON).should("contain", "Close");
  cy.contains("h4", "SER-ISD-001 - Body Weight");
  cy.contains("What is your weight today?");
  cy.contains(`${weightInLbs} lbs`);
  cy.contains("button", "Previous").should("be.visible");

  cy.get(PROGRESS_BAR_100_IMG).should("exist");
  cy.get(VALUE_PROGRESS_BAR_TEXT).should("contain", "100%");
};

export const submitSurvey = () => {
  cy.contains("button", "Submit Survey").click();
  cy.get(SNACK_BAR_ALERT_ID)
    .should("be.visible")
    .contains("Survey completed. Great job!");
};

