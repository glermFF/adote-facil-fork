describe('template spec', () => {
  it('Editar dados de usuário: Nome, Email', () => {
    cy.visit('http://localhost:3000/login')

    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.contains('label', 'Email').type("carlito.alves@gmail.com")    
    cy.contains('label', 'Senha').type("carlitopass")
    
    cy.contains('button', 'Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')

    cy.get('a[href="/area_logada/editar_dados"]').filter(':visible').first().should('be.visible').click();

    cy.url().should('include', '/area_logada/editar_dados')
    
    cy.contains('label', 'Nome').find('input').clear()
    cy.contains('label', 'Nome').type('CarlosGomes') //! Não aceita nome composto/sobrenomes

    cy.contains('button', 'Salvar alterações').click()
    cy.wait(5000)
  })
  
  it('adote-facil-login', () => {
    cy.visit('http://localhost:3000/login')

    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.contains('label', 'Email').type("carlito.alves@gmail.com")    
    cy.contains('label', 'Senha').type("carlitopass")
    
    cy.contains('button', 'Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')

    cy.get('a[href="/area_logada/editar_dados"]').filter(':visible').first().should('be.visible').click();

    cy.url().should('include', '/area_logada/editar_dados')

    cy.contains('button', 'Alterar senha').click()

    //! Não reclama sobre utilizar mesma senha
    cy.contains('label', 'Nova Senha').find('input').clear()
    cy.contains('label', 'Nova Senha').type('carlitopass')

    cy.contains('label', 'Confirmar nova senha').find('input').clear()
    cy.contains('label', 'Confirmar nova senha').type('carlitopass')

    cy.contains('button', 'Salvar alterações').click()
  })


})