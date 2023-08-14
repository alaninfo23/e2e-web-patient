declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataTestID(seletor: string): Chainable<any>;
    setCalculatedTime(): string;
    calculateTime(): string;
  }
}
