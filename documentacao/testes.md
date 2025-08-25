# Testes automatizados com Cypress

Este projeto utiliza o Cypress para automação de testes end-to-end na aplicação Adote Fácil. Abaixo estão descritos os principais fluxos testados:

## Cadastro de Usuário

O teste automatiza o fluxo de cadastro de um novo usuário, preenchendo os campos de nome, email, senha e confirmação de senha, e validando o sucesso do cadastro.

Arquivo: [`cypress/e2e/cadastro.cy.ts`](../frontend/cypress/e2e/cadastro.cy.ts)

## Login e Edição de Dados do Usuário

O teste cobre o login de um usuário existente, navegação até a tela de edição de dados pessoais, alteração do nome e salvamento das alterações. Também há teste para alteração de senha.

Arquivo: [`cypress/e2e/edit_user_data.cy.ts`](../frontend/cypress/e2e/edit_user_data.cy.ts)

## Cadastro de Animal para Adoção

O teste realiza o login, acessa a tela de cadastro de animal, preenche os dados do animal (nome, tipo, gênero, raça, descrição), faz upload de uma imagem e submete o formulário.

Arquivo: [`cypress/e2e/add_pet.cy.ts`](../frontend/cypress/e2e/add_pet.cy.ts)

## Observações

- Os testes utilizam comandos como `cy.contains`, `cy.get`, `cy.type`, `cy.clear`, `cy.click` e comandos customizados para upload de arquivos.
- O plugin `cypress-file-upload` é utilizado para testes de upload de imagens.
- Os testes simulam o fluxo real do usuário, garantindo que as principais funcionalidades estejam funcionando corretamente.

---

Para rodar os testes, utilize o comando:

```sh
npx cypress open
```
ou
```sh
npx cypress run
```
na pasta