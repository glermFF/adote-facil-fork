describe('template spec', () => {
  it('Editar dados de usuário: Nome, Email', () => {
    cy.visit('http://localhost:3000/login')

    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.contains('label', 'Email').type("teste.cypress@gmail.com")    
    cy.contains('label', 'Senha').type("testectpress")
    
    cy.contains('button', 'Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')

    cy.get('a[href="/area_logada/editar_dados"]').filter(':visible').first().should('be.visible').click();

    cy.url().should('include', '/area_logada/editar_dados')
    
    cy.contains('label', 'Nome').find('input').clear()
    cy.contains('label', 'Nome').type('CarlosGomes')

    cy.contains('button', 'Salvar alterações').click()
    cy.wait(5000)
  })
  
  it('adote-facil-login', () => {
    cy.visit('http://localhost:3000/login')

    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.contains('label', 'Email').type("teste.cypress@gmail.com")    
    cy.contains('label', 'Senha').type("testectpress")
    
    cy.contains('button', 'Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')

    cy.get('a[href="/area_logada/editar_dados"]').filter(':visible').first().should('be.visible').click();

    cy.url().should('include', '/area_logada/editar_dados')

    cy.contains('button', 'Alterar senha').click()

    cy.contains('label', 'Nova Senha').find('input').clear()
    cy.contains('label', 'Nova Senha').type('carlitopass')

    cy.contains('label', 'Confirmar nova senha').find('input').clear()
    cy.contains('label', 'Confirmar nova senha').type('cypressTeste')

    cy.contains('button', 'Salvar alterações').click()
  })


})