export const INPUT_LOGIN_EMAIL: string = 'input[name="username"]';
export const INPUT_LOGIN_PASSWORD: string = 'input[name="password"]';
export const LINK_FORGOT_PASSWORD: string = 'a[href="/forgot-password"]';
export const LINK_REMEMBER_ME: string =
  'input[type="checkbox"][name="rememberMe"]';
export const BUTTON_LOGIN: string = 'button[type="submit"]';
export const LINK_CREATE_NEW_ACCOUNT: string = 'a[href="/create-account"]';
export const BUTTON_SHOW_HIDDEN: string = "button[type='button']";
export const ALERT_MSG_LOGIN_INCORRECT: string = ".MuiAlert-message";

export const loginWebAdmin = (email: string, senha: string) => {
  cy.visit("https://qa.care.faethdigitalhealth.com/");
  cy.get(INPUT_LOGIN_EMAIL).type(email);
  cy.get(INPUT_LOGIN_PASSWORD).type(senha);
  cy.get(BUTTON_LOGIN).click();
  cy.wait(15000)
};

export const loginWebPatient = (email: string, senha: string) => {
  cy.visit("https://qa.faethdigitalhealth.com/");
  cy.get(INPUT_LOGIN_EMAIL).type(email);
  cy.get(INPUT_LOGIN_PASSWORD).type(senha);
  cy.get(LINK_REMEMBER_ME).check();
  cy.get(BUTTON_LOGIN).click();
  cy.wait(4000);
};


