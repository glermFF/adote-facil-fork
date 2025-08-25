describe('template spec', () => {
  it('adote-facil-cadastro', () =>{
    //cy.clear()

    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.visit('http://localhost:3000/cadastro')

    cy.contains('label', 'Nome').type("Cypress Test"); {/** Erro ao colocar espaço no nome */}
    cy.contains('label', 'Email').type("cypress.test@gmail.com")
    cy.contains('label', 'Senha').type("cypressSenha123")
    cy.contains('label', 'Confirme a senha').type("carlitopass")

    cy.contains('button', 'Cadastrar').click()
  
    //cy.get('button').click()

    //? Variantes de funções
    // cy.get('confirmPassword').type("carlitopass")
  })
})