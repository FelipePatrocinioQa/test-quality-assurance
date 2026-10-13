# Testes de API com Cypress

## Visão geral

Projeto de automação da API de usuários Serverest, cobrindo autenticação, consulta, cadastro, atualização e exclusão de usuários, com cenários positivos e negativos. Os testes usam Cypress e geram relatórios Mochawesome.

## Requisitos

- Node.js 20, 22 ou 24+
- npm 9+

## Instalação

```bash
npm install
```

## Ambientes

As URLs ficam centralizadas em `cypress/config/environments.js`. O ambiente é selecionado pela variável `TEST_ENVIRONMENT`; o padrão é `dev`.

| Ambiente | URL / configuração |
| --- | --- |
| `local` | `http://localhost:3000` |
| `dev` | `https://serverest.dev` |
| `uat` | URL informada pela variável `UAT_URL` |

No PowerShell, selecione local ou UAT antes de executar os testes:

```powershell
$env:TEST_ENVIRONMENT = 'local'
npm.cmd test
```

```powershell
$env:TEST_ENVIRONMENT = 'uat'
$env:UAT_URL = 'https://seu-endereco-uat'
npm.cmd test
```

O projeto falha com uma mensagem explícita se UAT for selecionado sem `UAT_URL`. Para voltar ao ambiente padrão, remova `TEST_ENVIRONMENT` da sessão ou defina-o como `dev`.

## Execução

Executar os testes em modo headless:

```bash
npm test
```

Abrir o Cypress interativo:

```bash
npm run test:headed
```

Executar os testes e gerar/mesclar os relatórios:

```bash
npm run report
```

O relatório HTML e os arquivos JSON são gravados em `cypress/reports`; o relatório mesclado é gerado em `cypress/reports/html`.

> Os scripts `test` e `test:ci` usam `|| true` para permitir a geração do relatório mesmo quando há cenários com falha. Por isso, confira o resumo do Cypress e o relatório; o código de saída do npm não indica sozinho que todos os testes passaram.

## Organização

| Arquivo/pasta | Responsabilidade |
| --- | --- |
| `cypress/config/environments.js` | URLs dos ambientes local, dev e UAT |
| `cypress/fixtures/api/common/methodRest.js` | Constantes dos métodos HTTP |
| `cypress/fixtures/api/common/endpoints.js` | Caminhos dos endpoints |
| `cypress/fixtures/api/common/headers.js` | Headers JSON e funções de autorização |
| `cypress/fixtures/payload/send/user-api-bodies.json` | Bodies e dados fixos usados nos cenários de usuários |
| `cypress/e2e/Api/CRUD-test.cy.js` | Cenários de teste da API de usuários |
| `cypress/support/commands.js` | Comandos Cypress reutilizáveis |
| `cypress.config.js` | Seleção do ambiente, configuração do Cypress e Mochawesome |

Os e-mails dos usuários criados pelos testes são gerados com valores únicos a partir dos dados do fixture.

## Cobertura

- Login válido e credenciais inválidas
- Listagem de usuários
- Cadastro válido e rejeição de campos obrigatórios vazios
- Consulta de usuário por ID e consulta de ID inexistente
- Atualização de usuário
- Exclusão de usuário e rejeição de exclusão quando há carrinho associado

## Integração contínua

O workflow `.github/workflows/api-tests.yml` executa `npm run test:ci` em push para `main`/`master` e em pull requests, e publica `cypress/reports` como artefato.

Os workflows usam Node.js 20, compatível com a versão do Cypress instalada neste projeto.