describe("Editing Trainer Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500).get('[href="/login"] > .header-secondary').click();
    const emailValue = "teste@teste.teste";
    const passwordValue = "teste";
    cy.get("fieldset #email").type(emailValue);
    cy.get("fieldset #password").type(passwordValue);
    cy.get("form button[type='submit']").click();
    cy.wait(3000);
  });

  describe("when clicking on edit trainer profile option", () => {
    beforeEach(() => {
      cy.contains("Olá").trigger("mouseover");
      cy.contains("Treinador").click({ force: true });
    });

    it("should redirect to trainer edition page", () => {
      cy.contains("Configuração da Página de Treinador");
    });

    describe("when changing price and submitting", () => {
      const newPrice = "50";

      beforeEach(() => {
        cy.get("fieldset #price").clear().type(newPrice);
        cy.get(".publish-page-box > button[type='submit']").click();
      });

      it("should have the new price on display", () => {
        cy.contains(`R$ ${newPrice}`);
      });
    });

    describe("when changing price back", () => {
      const oldPrice = "42";

      beforeEach(() => {
        cy.get("fieldset #price").clear().type(oldPrice);
        cy.get(".publish-page-box > button[type='submit']").click();
      });

      it("should have the new price on display", () => {
        cy.contains(`R$ ${oldPrice}`);
      });
    });
  });
});
