declare namespace Cypress {
    interface Chainable<Subject> {
      getByDataTestID(seletor: string): Chainable<any>;
      login(email: string, senha: string): void;
    }
  }