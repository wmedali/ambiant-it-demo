/// <reference types="cypress" />

describe("Tests d'authentification à saucedemo", () => {
  it("Scenario d'authentification réussi", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
  });

  it("Scenario d'authentification avec un mauvais mot de passe", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret");
    cy.get('[data-test="login-button"]').click();
  });

  it("Scenario d'utilisateur bloqué", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("locked_out_user");
    cy.get('[data-test="password"]').type("secret");
    cy.get('[data-test="login-button"]').click();
  });
});
