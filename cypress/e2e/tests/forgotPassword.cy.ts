import { faker } from "@faker-js/faker";
import * as loginHelper from "../helpers/loginHelper";
import * as forgotPasswordHelper from "../helpers/forgotPassowordHelper.cy";

describe("Forgot password page", () => {
    it("should check if the page 'Forgot password?' open correctly", () => {
      cy.visit("/");
      cy.get(loginHelper.LINK_FORGOT_PASSWORD).click();
      cy.url().should("eq", "https://qa.faethdigitalhealth.com/forgot-password");
      cy.contains("Reset Password");
      cy.contains(
        "Please complete the field below with your email address associated to your Faeth account"
      );
      cy.get(forgotPasswordHelper.INPUT_EMAIL_FORGOT_PASSWORD).should("be.visible");
      cy.get(forgotPasswordHelper.BUTTON_FORGOT_PASSWORD).should("be.visible");
    });
  
    it("should show error message when email is empty", () => {
      cy.visit("https://qa.faethdigitalhealth.com/forgot-password");
      cy.get(forgotPasswordHelper.BUTTON_FORGOT_PASSWORD).click();
      cy.contains("Please type a valid email format.");
    });
  
    it("should show error message when email is invalid", () => {
      cy.visit("https://qa.faethdigitalhealth.com/forgot-password");
      cy.get(forgotPasswordHelper.INPUT_EMAIL_FORGOT_PASSWORD).type("test@@test.com");
      cy.get(forgotPasswordHelper.BUTTON_FORGOT_PASSWORD).click();
      cy.contains("Please type a valid email format.");
    });
  
    it("should open the reset-password page after typing email and clicking confirm", () => {
      cy.visit("https://qa.faethdigitalhealth.com/forgot-password");
      const emailFake = faker.internet.email();
  
      // Captura a parte inicial e final do email gerado, cortando a parte ".com"
      const [username, domain] = emailFake.split("@");
      const domainWithoutCom = domain.replace(".com", "");
      const emailPart = `${username.substr(0, 1)}***@${domainWithoutCom.substr(
        0,
        1
      )}***`;
      cy.get(forgotPasswordHelper.INPUT_EMAIL_FORGOT_PASSWORD).type(emailFake);
      cy.get(forgotPasswordHelper.BUTTON_FORGOT_PASSWORD).click();
      cy.wait(1000);
      cy.url().should("eq", "https://qa.faethdigitalhealth.com/reset-password");
      cy.contains("We sent you a code via email");
      cy.contains(`Please enter the 6 digit code sent to ${emailPart}`);
      cy.contains("Enter your new password");
      cy.contains("Confirm New Password");
    });
  
  });