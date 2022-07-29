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
  // cy.viewport(550, 750);
  cy.viewport("iphone-xr");
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
