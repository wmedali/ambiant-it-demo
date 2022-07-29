import { homeSelectors } from "../selectors/home";
export function login(username, password) {
  cy.get(homeSelectors.usernameField)
    .type(username)
    .should("have.value", username);
  cy.get(homeSelectors.passwordField).type(password);
  cy.get(homeSelectors.loginButton).click();
}
