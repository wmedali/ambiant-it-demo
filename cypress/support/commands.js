import { homeSelectors } from "../helpers/selectors/home";
import { cardSelectors, orderSelectors } from "../helpers/selectors/cart";
Cypress.Commands.add("login", (username, password) => {
  cy.get(homeSelectors.usernameField)
    .type(username)
    .should("have.value", username);
  cy.get(homeSelectors.passwordField).type(password);
  cy.get(homeSelectors.loginButton).click();
});

Cypress.Commands.add("loginDemoBlaze", (login) => {
  cy.get("#login2").click();
  cy.wait(1000);
  cy.get("#loginusername").type(login.username);
  cy.get("#loginpassword").type(login.password);
  // cy.get('#logInModal').should('be.visible').find('.modal-footer').find('.btn-primary').click()
  cy.get("#logInModal")
    .should("be.visible")
    .find(".modal-footer")
    .contains("Log in")
    .click();
});

Cypress.Commands.add("fillOrderData", (orderData) => {
  cy.get(".btn-success").click();
  cy.get(orderSelectors.orderModal).should("be.visible");
  cy.get(orderSelectors.name).type(orderData.name);
  cy.get(orderSelectors.country).type(orderData.country);
  cy.get(orderSelectors.city).type(orderData.city);
  cy.get(orderSelectors.cardNumber).type(orderData.card);
  cy.get(orderSelectors.month).type(orderData.month);
  cy.get(orderSelectors.year).type(orderData.year);
  cy.get("#orderModal").find(".modal-footer").contains("Purchase").click();
});
