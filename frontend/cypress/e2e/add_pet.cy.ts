

describe('Cadastro com Sucesso', () => {
it('deve permitir cadastro de animal com dados válidos', () => {

    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
    // Arrange
    const animalData = {
        name: 'Rex',
        type: 'Cachorro',
        gender: 'Macho',
        race: 'Labrador',
        description: 'Cachorro muito dócil e brincalhão'
    }

    cy.contains('label', 'Email').type("carlito.alves@gmail.com")    
    cy.contains('label', 'Senha').type("carlitopass")
    
    cy.contains('button', 'Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')
    cy.wait(2000) // Aguardar renderização
    cy.get('a[href="/area_logada/disponibilizar_animal"]').filter(':visible').first().should('be.visible').click();
    cy.wait(2000) // Aguardar carregamento da página
    cy.contains('h1', 'Cadastrar animal para adoção').should('be.visible')


    // Act
    cy.contains('label', 'Nome').find('input').type(animalData.name)
    cy.wait(1000)
    
    cy.contains('span', "Tipo").parent().parent().find('button[role="combobox"]').should('be.visible').click()
    cy.wait(500)
    cy.get('[role="option"]').contains(animalData.type).click()
    cy.wait(1000)
    
    cy.contains('span', "Gênero").parent().parent().find('button[role="combobox"]').should('be.visible').click()
    cy.wait(500)
    cy.get('[role="option"]').contains(animalData.gender).click()
    cy.wait(1000)
    
    cy.contains('label', 'Raça').find('input').type(animalData.race);
    cy.wait(1000)
    cy.contains('label', 'Descrição').find('textarea').type(animalData.description)
    cy.wait(1000)
    cy.get('input#animalPictures').attachFile('dog.jpeg');
    cy.wait(1000)
    cy.get('button[type="submit"]').click()
})
  })
