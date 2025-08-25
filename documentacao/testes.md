# Melhorias Sugeridas

A seguir, estão três melhorias propostas para os testes unitários do backend, visando aumentar a robustez e a qualidade da cobertura de testes:

1. **Cobertura de Cenários de Erro Não Tratados**  
   Incluir testes que simulem exceções inesperadas, como falhas de conexão com o banco de dados ou erros lançados por dependências externas. Isso garante que os serviços lidam corretamente com situações imprevistas e aumentam a resiliência da aplicação.

2. **Validação de Dados de Entrada**  
   Adicionar testes para casos em que parâmetros obrigatórios estejam ausentes ou inválidos, como campos vazios ou formatos incorretos. Dessa forma, é possível garantir que o serviço retorna as falhas apropriadas e não processa dados inconsistentes.

3. **Verificação de Efeitos Colaterais e Interações**  
   Aprimorar os testes para garantir que métodos sensíveis (como geração de token ou envio de e-mails) não sejam chamados em cenários de erro, como quando a senha está incorreta. Isso evita efeitos colaterais indesejados e reforça a segurança da aplicação.

Essas melhorias contribuem para uma base de testes mais completa, confiável e alinhada às melhores práticas de desenvolvimento de software.

---

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
