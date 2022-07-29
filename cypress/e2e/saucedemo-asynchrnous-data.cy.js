/// <reference types="cypress" />

describe("Suite 1 : utilisateurs authentifiés", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("users").as("users");
  });
  it(
    "Scenario d'authentification réussi",
    {
      retries: {
        openMode: 1,
      },
      browser: "!chrome",
    },
    function () {
      cy.get('[data-test="username"]').type(this.users[0].username, {
        //  delay: 1000,
        timeout: 5000,
      });
      cy.get('[data-test="password"]').type(this.users[0].password);
      cy.get('[data-test="login-button"]').click();

      cy.url().should("include", "/inventory.html");
      cy.get(".inventory_item").should("have.length", 6);

      cy.get(".inventory_item")
        .find("[class=inventory_item_price]")
        .each((price) => {
          // expect(price).include.text("$");
          cy.wrap(price).should("include.text", "$");
        });
    }
  );

  it("Scenario d'authentification avec un mauvais mot de passe", function () {
    cy.get('[data-test="username"]')
      .type(this.users[1].username)
      .should("have.value", this.users[1].username);
    cy.get('[data-test="password"]').type(this.users[1].password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("include.text", "Username and password do not match")
      .and("have.css", "display", "block")
      .and("have.css", "font-weight", "700");
  });

  it("Scenario d'utilisateur bloqué", function () {
    cy.get('[data-test="username"]').type(this.users[2].username);
    cy.get('[data-test="password"]').type(this.users[2].password);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "user has been locked out");
  });
});
