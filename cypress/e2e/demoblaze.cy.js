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
  it("should buy product successfully", () => {
    cy.visit("https://www.demoblaze.com/");
    // S'authentifier dans le site
    cy.loginDemoBlaze(testData.login);
    // Ajouter un produit au panier
    // ❌  Id duppliqué, ça ne fonctionne pas : ❌ cy.get("#itemc");
    // Wait temporaire, à remplacer :
    cy.wait(2000);
    cy.get(".list-group-item").eq(3).click();
    // Pourrait etre fait comme ça aussi : cy.get(".list-group").find("a").eq(3).click();

    cy.wait(2000);
    cy.get('[class="col-lg-4 col-md-6 mb-4"]')
      .eq(0)
      .find(".card-title")
      .click();
    // Alternative en cliquant sur l'image : cy.get('[class="col-lg-4 col-md-6 mb-4"]').eq(0).find("img").click();

    cy.url().should("include", "/prod.html?idp_=10");
    cy.contains("Add to cart").click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Product added.");
      cy.wrap(alertText).should("eq", "Product added.");
    });

    // Finaliser la commande :

    cy.get("#cartur").click();
    cy.url().should("include", "cart.html");
    cy.get(".success")
      .should("include.text", "Apple monitor 24")
      .and("include.text", 400);

    cy.fillOrderData(testData.orderData);

    // Vérification de la commande et du panier:
    cy.wait(1000);
    cy.get(".sweet-alert").should("be.visible");
    cy.get(".confirm").click();
    cy.get("#cartur").click();
    cy.url().should("include", "cart.html");
    cy.get(".success").should("not.exist");
  });
});
