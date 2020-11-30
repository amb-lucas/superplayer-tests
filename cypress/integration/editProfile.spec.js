describe("Editing profile", () => {
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

  describe("when clicking on my profile option on dropdown menu", () => {
    beforeEach(() => {
      cy.contains("Olá").trigger("mouseover");
      cy.contains("Meu Perfil").click({ force: true });
    });

    it("should render the update profile form", () => {
      cy.contains("Dados Básicos");
    });

    describe("when changing name and submiting data", () => {
      const newName = "mudou";

      beforeEach(() => {
        cy.get("fieldset #name").clear().type(newName);
        cy.get("form button[type='submit']").click();
      });

      it("should have the new name", () => {
        cy.contains(`Olá, ${newName}`);
      });
    });

    describe("when changing the name back", () => {
      const oldName = "teste";

      beforeEach(() => {
        cy.get("fieldset #name").clear().type(oldName);
        cy.get("form button[type='submit']").click();
      });

      it("should have the new name", () => {
        cy.contains(`Olá, ${oldName}`);
      });
    });
  });
});
