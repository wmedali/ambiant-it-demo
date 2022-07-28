/// <reference types="cypress" />

describe("Suite 1 : utilisateurs authentifiés", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Scenario d'authentification réussi", () => {
    cy.get('[data-test="username"]').type("standard_user", {
      //  delay: 1000,
      timeout: 5000,
    });
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.url().should("include", "/inventory.html");
    cy.get(".inventory_item").should("have.length", 6);

    cy.get(".inventory_item")
      .find("[class=inventory_item_price]")
      .each((price) => {
        // expect(price).include.text("$");
        cy.wrap(price).should("include.text", "€");
      });
  });

  it("Scenario d'authentification avec un mauvais mot de passe", () => {
    cy.get('[data-test="username"]')
      .type("standard_user")
      .should("have.value", "standard_user");
    cy.get('[data-test="password"]').type("secret");
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("include.text", "Username and password do not match")
      .and("have.css", "display", "block")
      .and("have.css", "font-weight", "700");
  });

  it("Scenario d'utilisateur bloqué", () => {
    cy.get('[data-test="username"]').type("locked_out_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "user has been locked out");
  });
  after(() => {
    // Se déconnecter
  });
});

it("Expect and wrap", () => {
  const name = "Mohammed Ali";
  const age = 28;
  expect(name).include("Ali");
  expect(name).have.length.above(5);

  expect(age).be.above(20);

  cy.wrap(name).should("include", "Ali");
  cy.wrap(age).should("be.above", 20);
});

it("should redirect to hompage when visiting /inventory", () => {
  cy.visit("/inventory.html", {
    failOnStatusCode: false,
  });
  cy.get('[data-test="error"]')
    .should("be.visible")
    .and(
      "include.text",
      "You can only access '/inventory.html' when you are logged in"
    );
});
