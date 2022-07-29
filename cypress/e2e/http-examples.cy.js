/// <reference types="cypress" />

it("HTTP requests GET", () => {
  cy.request("https://reqres.in/api/users?page=2").then((response) => {
    const body = response.body;
    expect(response.status).to.eq(200);
    expect(body.data).to.lengthOf(6);
  });

  cy.request({
    method: "GET",
    url: "https://reqres.in/api/users?page=2",
  }).then((response) => {
    const body = response.body;
    expect(response.status).to.eq(200);
    expect(body.data).to.lengthOf(6);
  });
});

it("POST Request", () => {
  cy.request({
    method: "POST",
    url: "https://reqres.in/api/users",
    body: {
      username: "toto",
      password: "tata",
    },
  }).then((response) => {
    const body = response.body;
    expect(body.username).eq("toto");
    expect(body.password).eq("tata");
  });

  const data = {
    name: "Ali",
    age: "28",
  };

  const extendedData = {
    ...data,
    mission: "trainer",
    hobby: "football",
  };

  cy.log(extendedData);
});
