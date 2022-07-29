import { homeSelectors } from "../helpers/selectors/home";

Cypress.Commands.add("login", (username, password) => {
  cy.get(homeSelectors.usernameField)
    .type(username)
    .should("have.value", username);
  cy.get(homeSelectors.passwordField).type(password);
  cy.get(homeSelectors.loginButton).click();
});
