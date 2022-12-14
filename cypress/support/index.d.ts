/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Commande personnalis√© d'authentification
     * @param username
     * @param password
     */
    login(username: string, password: string): Chainable<any>;
  }
}
