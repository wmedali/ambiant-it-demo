/// <reference types="cypress" />
const testData = require("../fixtures/order.json");
/** Enoncé : 
 * 1 - S’inscrire manuellement dans le site demoblaze
    2 - Automatiser la connexion et l’ajout de produit jusqu’à complétion de commmande
    3 - Externaliser les jeux de données de test dans un fichier json . Ex : externalisez le nom d’utilisateur et le mot de passe dans un json
    4- Externaliser les locators (selecteurs css) dans un fichier 
    5- Utiliser les commands personnalisées de cypress pour la connexion, ajout de produit et le formulaire de place order
    username :  azerty123FSDF
    password: azerty123
    */

describe("Demoblaze test suite", () => {
  beforeEach(() => {
    cy.intercept("**/entries").as("products");

    cy.intercept({
      method: "POST",
      url: "**/bycat",
    }).as("productsByCategory");

    cy.intercept({
      method: "POST",
      url: "**/addtocart",
    }).as("addToCart");

    cy.intercept({
      method: "POST",
      url: "**/deletecart",
    }).as("deleteCart");

    cy.intercept({
      method: "POST",
      url: "**/viewcart",
    }).as("viewCart");
  });

  it("should buy product successfully", () => {
    cy.visit("https://www.demoblaze.com/");

    cy.wait("@products").its("response.statusCode").should("eq", 200);
    // S'authentifier dans le site
    cy.loginDemoBlaze(testData.login);
    // Ajouter un produit au panier
    // ❌  Id duppliqué, ça ne fonctionne pas : ❌ cy.get("#itemc");
    // Wait temporaire, à remplacer :
    cy.wait("@products").its("response.statusCode").should("eq", 200);
    cy.get(".list-group-item").eq(3).click();
    // Pourrait etre fait comme ça aussi : cy.get(".list-group").find("a").eq(3).click();
    cy.wait("@productsByCategory").its("response.statusCode").should("eq", 200);
    cy.get('[class="col-lg-4 col-md-6 mb-4"]')
      .eq(0)
      .find(".card-title")
      .click();
    // Alternative en cliquant sur l'image : cy.get('[class="col-lg-4 col-md-6 mb-4"]').eq(0).find("img").click();
    cy.url().should("include", "/prod.html?idp_=10");
    cy.contains("Add to cart").click();
    cy.wait("@addToCart").its("response.statusCode").should("eq", 200);
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Product added.");
    });

    // Finaliser la commande :

    cy.get("#cartur").click();
    cy.url().should("include", "cart.html");
    cy.wait("@viewCart").its("response.statusCode").should("eq", 200);
    cy.get(".success")
      .should("include.text", "Apple monitor 24")
      .and("include.text", 400);
    cy.fillOrderData(testData.orderData);
    cy.wait(1000);
    // Vérification de la commande et du panier:
    cy.wait("@deleteCart");
    cy.get(".sweet-alert").should("be.visible");
    cy.get(".confirm").click();
    cy.get("#cartur").click();
    cy.url().should("include", "cart.html");
    cy.get(".success").should("not.exist");
  });
});

describe("should mock http responses for different cases", () => {
  it("should display properly one product", () => {
    cy.intercept("**/entries", {
      fixture: "one-product-mock",
    }).as("products");
    cy.visit("https://www.demoblaze.com/");
    cy.get('[class="col-lg-4 col-md-6 mb-4"]').should("have.length", 1);
  });

  it("should display properly long titles", () => {
    cy.intercept("**/entries", {
      fixture: "long-title-product",
    }).as("products");
    cy.visit("https://www.demoblaze.com/");
  });
  it("should display arabic characters properly in website", () => {
    cy.intercept("**/entries", {
      fixture: "arabic-characters",
    }).as("products");
    cy.visit("https://www.demoblaze.com/");
  });

  it("should do something when API returns error status code", () => {
    cy.intercept("**/entries", {
      statusCode: 404,
    }).as("products");
    cy.visit("https://www.demoblaze.com/");
  });
});
