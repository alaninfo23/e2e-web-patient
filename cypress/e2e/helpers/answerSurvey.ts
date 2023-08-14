import moment from "moment";
import "moment/min/locales";

import * as assignSurvey from "../helpers/adminHelpers/assignSurvey";

export const TEXT_DATE: string = "p.MuiTypography-body1.css-xhbppr";
export const BUTTON_CLOSE: string = "button";
export const INPUT_VALUE_LBS: string = "input.MuiInputBase-input";
export const TEXT_LBS: string = "p.MuiTypography-root";
export const IMG_PROGRESS_BAR_50: string =
  'span[role="progressbar"][aria-valuenow="50"]';
export const IMG_PROGRESS_BAR_100: string =
  'span[role="progressbar"][aria-valuenow="100"]';

export const TEXT_VALUE_PROGRESS_BAR: string = "p.MuiTypography-root";
export const BUTTON_NEXT: string = "button.MuiButton-containedPrimary";
export const SNACK_BAR_ALERT_COMPLETED: string =
  '[data-testid="SNACK_BAR_ALERT"]';

export const verifySurveyCard = () => {
  cy.contains("h6", "SER-ISD-001 - Body Weight");
  cy.contains("h6", "OPEN");

  const currentDate = moment().format("MMM D");
  const expectedText = `Once on ${currentDate} at ${assignSurvey.calculatedTime}`;
  cy.log(expectedText);
  cy.contains("h6", expectedText);
};

export const verifyWeightScreenContent = () => {
  cy.contains(BUTTON_CLOSE, "Close");
  cy.contains("h4", "SER-ISD-001 - Body Weight");

  cy.get(TEXT_DATE)
    .invoke("text")
    .then((text) => {
      const formattedDate = moment(text, "dddd, MMMM DD", "en", true);
      expect(formattedDate.isValid()).to.be.true;
      const formattedDateText = formattedDate.format("dddd, MMMM DD");
      expect(formattedDateText).to.equal(text);
      cy.get(TEXT_DATE).should("contain", formattedDateText);
    });

  cy.contains("What is your weight today?");
  cy.contains("Please write the full number including the decimal.");
  cy.contains("*Required");
  cy.get(INPUT_VALUE_LBS).should("have.attr", "placeholder", "000.0");
  cy.get(TEXT_LBS).should("contain", "lbs");

  cy.get(IMG_PROGRESS_BAR_50).should("exist");
  cy.get(TEXT_VALUE_PROGRESS_BAR).should("contain", "50%");
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
  cy.get(BUTTON_NEXT).contains("Next").click();

  cy.get(BUTTON_CLOSE).should("contain", "Close");
  cy.contains("h4", "SER-ISD-001 - Body Weight");
  cy.contains("What is your weight today?");
  cy.contains(`${weightInLbs} lbs`);
  cy.contains("button", "Previous").should("be.visible");

  cy.get(IMG_PROGRESS_BAR_100).should("exist");
  cy.get(TEXT_VALUE_PROGRESS_BAR).should("contain", "100%");
};

export const submitSurvey = () => {
  cy.contains("button", "Submit Survey").click();
  cy.get(SNACK_BAR_ALERT_COMPLETED)
    .should("be.visible")
    .contains("Survey completed. Great job!");
};

