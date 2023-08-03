import * as loginHelper from "../helpers/loginHelper";

describe("Create new account page", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("should check if the page 'Forgot password?' open correctly", () => {
      cy.get('a[href="/create-account"]').click();
      cy.url().should("eq", "https://qa.faethdigitalhealth.com/create-account");
      cy.contains("What describes you best?");
      cy.contains("Step 1 of 7");
      cy.get('button[type="button"]').contains("I am a Patient.").should("exist");
      cy.get('button[type="button"]')
        .contains("I am a Caretaker.")
        .should("exist");
    });
  });