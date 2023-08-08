declare namespace Cypress {
    interface Chainable<Subject> {
      getByDataTestID(seletor: string): Chainable<any>;
      loginWebPatient(email: string, senha: string): void;
      loginWebAdmin(email: string, senha: string): void;
    }
  }