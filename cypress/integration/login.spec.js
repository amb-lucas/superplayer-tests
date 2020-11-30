describe("Login and Logout", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("when click the login anchor on header", () => {
    beforeEach(() => {
      cy.get("header a[href='/login']").click();
    });

    it("should have an email input", () => {
      const input = cy.get("fieldset #email");
      expect(input).to.exist;
    });

    describe("when filling data to login and clicking button", () => {
      beforeEach(() => {
        const emailValue = "teste@teste.teste";
        const passwordValue = "teste";
        cy.get("fieldset #email").type(emailValue);
        cy.get("fieldset #password").type(passwordValue);
        cy.get("form button[type='submit']").click();
      });

      it("should authenticate user", () => {
        cy.contains("Olá,");
      });

      describe("when clicking on logout option on dropdown menu", () => {
        beforeEach(() => {
          cy.contains("Logout").click({ force: true });
        });

        it("should logout", () => {
          cy.contains("Entrar");
          cy.contains("Olá,").should("not.exist");
        });
      });
    });
  });
});
