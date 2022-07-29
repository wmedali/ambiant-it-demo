/// <reference types="cypress" />
const users = require("../fixtures/users.json");

function somme(a, b) {
  return a + b;
}
// import { login } from "../helpers/actions/login";
describe("Suite 1 : utilisateurs authentifiés", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should hame same price in home and product page", () => {
    cy.login(users[0].username, users[0].password);
    cy.get(".inventory_item")
      .first()
      .find("[class=inventory_item_price]")
      .invoke("text")
      .as("initialPrice");

    cy.get(".inventory_item").first().find(".inventory_item_name").click();

    cy.get("@initialPrice").then((initialPrice) => {
      cy.get(".inventory_details_price").should("have.text", initialPrice);
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get(".inventory_item_price").should("have.text", initialPrice);
    });
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
      cy.login(users[0].username, users[0].password);
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
    cy.login(users[1].username, users[1].password);
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("include.text", "Username and password do not match")
      .and("have.css", "display", "block")
      .and("have.css", "font-weight", "700");
  });

  it("Scenario d'utilisateur bloqué", function () {
    cy.login(users[2].username, users[2].password);

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "user has been locked out");
  });
});
