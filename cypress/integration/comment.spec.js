describe("Posting a comment on a trainer page", () => {
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

  describe("when navigating to a trainer you already had a class with", () => {
    beforeEach(() => {
      cy.get(".search-game-input").type("minecraft");
      cy.get("button").click().wait(4000);
      cy.get("a[href='/trainer/5fc3411e60b9f30017f3b037'] > button")
        .click()
        .wait(2000);
    });

    describe("when clicking on the comment button", () => {
      beforeEach(() => {
        cy.get("#end-of-page-cta > :nth-child(2) > button").click();
      });

      it("should redirect to the trainer rating page", () => {
        cy.contains("Avaliação do Treinador");
      });

      describe("writing a comment and submitting", () => {
        const commentValue = "Adorei, melhor treino que já tive";

        let alerted = false;
        beforeEach(() => {
          cy.on("window:alert", (msg) => {
            alerted = msg;
          });

          cy.get("#rating-stars-input").type(commentValue);
          cy.get("form .cta-button").click();
          cy.wait(4000);
        });

        it("should alert the user about the succesful comment", () => {
          expect(alerted).to.match(/Treinador avaliado com sucesso!/);
        });
      });
    });
  });

  describe("when you navigating to a trainer you never had a class with", () => {
    beforeEach(() => {
      cy.get(".search-game-input").type("lol");
      cy.get("button").click().wait(4000);
      cy.get("a[href='/trainer/5fc455154cfd2e0017f7078b'] > button")
        .click()
        .wait(2000);
      cy.get("#end-of-page-cta > :nth-child(2) > button").click();
    });

    describe("writing a comment and submitting", () => {
      const commentValue = "Adorei, melhor treino que já tive";

      let alerted = false;
      beforeEach(() => {
        cy.on("window:alert", (msg) => {
          alerted = msg;
        });

        cy.get("#rating-stars-input").type(commentValue);
        cy.get("form .cta-button").click();
        cy.wait(4000);
      });

      it("should alert the user about the succesful comment", () => {
        expect(alerted).to.match(
          /Erro: Não foram encontrados treinos seus concluídos com esse treinador./
        );
      });
    });
  });
});
