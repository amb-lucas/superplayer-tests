describe("Pedir treino", () => {
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

  describe("when searching for a minecraft trainer", () => {
    beforeEach(() => {
      cy.get(".search-game-input").type("minecraft");
      cy.get("button").click().wait(4000);
    });

    it("should find some results", () => {
      cy.get("#search-results .trainers-list .trainer-card").should("exist");
    });

    describe("when clicking on the trainer 'Ambrósio'", () => {
      beforeEach(() => {
        cy.get("a[href='/trainer/5fc3411e60b9f30017f3b037'] > button")
          .click()
          .wait(2000);
      });

      it("should should redirect to the trainer page", () => {
        cy.contains("Tenha já seu treino!");
      });

      const nameValue = "teste";
      it("should get your name automatically", () => {
        cy.get('input[placeholder="Insira seu nome"]').should(
          "have.value",
          nameValue
        );
      });

      const emailValue = "teste@teste.teste";
      it("should get your email automatically", () => {
        cy.get('input[type="email"]').should("have.value", emailValue);
      });

      describe("when submiting class request", () => {
        let alerted = true;
        beforeEach(() => {
          cy.on("window:alert", (msg) => {
            alerted = msg;
          });
          cy.get("form > button[type='submit']").click();
          cy.wait(4000);
        });

        it("should alert the user about the sucessful request", () => {
          expect(alerted).to.match(/Treino requisitado com sucesso!/);
        });
      });
    });
  });
});
