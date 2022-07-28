/// <reference types="cypress" />

describe("Hooks demo", () => {
  before(() => {
    cy.log("Je suis dans le before");
  });

  beforeEach(() => {
    cy.log("Je suis dans le before each");
  });
  it("Test demo", () => {
    cy.log("*******");
  });

  it("Test demo 2", () => {
    cy.log("*******");
  });
  it("Test demo 3", () => {
    cy.log("*******");
  });

  afterEach(() => {
    cy.log("Je suis dans le after Each");
  });

  after(() => {
    cy.log("Je suis dans le after");
  });
});
