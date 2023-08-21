export const LOGIN_FORM_ID: string = '[data-testid="LOGIN_FORM"]';
export const LOGIN_EMAIL_INPUT: string = 'input[name="username"]';
export const LOGIN_PASSWORD_INPUT: string = 'input[name="password"]';
export const FORGOT_PASSWORD_LINK: string = 'a[href="/forgot-password"]';
export const REMEMBER_ME_LINK: string =
  'input[type="checkbox"][name="rememberMe"]';
export const LOGIN_BUTTON: string = 'button[type="submit"]';
export const CREATE_NEW_ACCOUNT_LINK: string = 'a[href="/create-account"]';
export const SHOW_HIDDEN_BUTTON: string = "button[type='button']";
export const MSG_LOGIN_INCORRECT_ALERT: string = ".MuiAlert-message";

export const OPEN_MENU_ICON_ID: string = '[data-testid="OPEN_MENU_ICON"]';
export const LOG_OUT_OPTION_ID: string = '[data-testid="LOG_OUT_OPTION"]';

export const loginWebPatient = (email: string, senha: string) => {
  cy.visit("https://qa.faethdigitalhealth.com/");
  cy.get(LOGIN_EMAIL_INPUT).type(email);
  cy.get(LOGIN_PASSWORD_INPUT).type(senha);
  cy.get(REMEMBER_ME_LINK).check();
  cy.get(LOGIN_BUTTON).click();
};

export const logoutWebPatient = () => {
  cy.wait(6000);
  cy.get(OPEN_MENU_ICON_ID).should("be.visible").click();
  cy.get(LOG_OUT_OPTION_ID).click();
  cy.wait(2000);
  cy.get(LOGIN_FORM_ID).should("be.visible");
};
