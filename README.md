# Dog API

## Descrição

*Testes realizados em uma máquina WINDOWS*

Framework baseado em Playwright e TypeScript de automação de casos de testes de QA para validação dos endpoints da Dog API. Os testes usam o request API do Playwright para testar endpoints HTTP. 
A spec 'dogapi.spec.ts' testa a Dog API pública (https://dog.ceo). Valida endpoints públicos de imagens/raças que vêm do serviço dog.ceo.

Obs: Eu também criei uma validação permitindo CRUD (Criar, Ler, Atualizar, Deletar) de informações sobre as imagens de diferentes raças de cães, porém, acredito que a API não esteja preparada para isso, pois recebi Erro connect ECONNREFUSED ::1:3000. 
De qualquer maneira, mantíve o arquivo dogs.crud.specs.ts e a especificação CRUD logo abaixo.

# Playwright + TypeScript tests for Dog API

Instalação:

1. Instalar dependências do projeto

   npm install

2. (Opcional) Instalar navegadores do Playwright

   npx playwright install

Executar testes:

npm test

Relatórios:

- HTML: `reports/html/index.html`
- JUnit XML: `reports/junit/results.xml`
- JSON: `reports/json/results.json`

Você pode abrir o relatório HTML após a execução com:

npx playwright show-report reports/html

- Os testes usam o request API do Playwright para testar endpoints HTTP.
- Arquivos de teste em `tests/`.

## Especificação CRUD (API indisponível)
### 1. Criar um novo registro de cão

- **URL:** `/dogs`
- **Método:** `POST`
- **Corpo da requisição:**
  ```json
  {
    "name": "Nome do cão",
    "age": Idade do cão em anos,
    "breed": "Raça do cão",
    "weight": Peso do cão em kg
  }
  ```
- **Resposta de sucesso:**
  - **Código:** `201 Created`
  - **Corpo:**
    ```json
    {
      "id": "ID gerado para o cão",
      "name": "Nome do cão",
      "age": Idade do cão em anos,
      "breed": "Raça do cão",
      "weight": Peso do cão em kg
    }
    ```

### 2. Listar todos os cães

- **URL:** `/dogs`
- **Método:** `GET`
- **Resposta de sucesso:**
  - **Código:** `200 OK`
  - **Corpo:**
    ```json
    [
      {
        "id": "ID do cão",
        "name": "Nome do cão",
        "age": Idade do cão em anos,
        "breed": "Raça do cão",
        "weight": Peso do cão em kg
      },
      ...
    ]
    ```

### 3. Obter detalhes de um cão específico

- **URL:** `/dogs/{id}`
- **Método:** `GET`
- **Parâmetros de URL:**
  - `id`: ID do cão a ser retornado
- **Resposta de sucesso:**
  - **Código:** `200 OK`
  - **Corpo:**
    ```json
    {
      "id": "ID do cão",
      "name": "Nome do cão",
      "age": Idade do cão em anos,
      "breed": "Raça do cão",
      "weight": Peso do cão em kg
    }
    ```
- **Resposta de erro:**
  - **Código:** `404 Not Found`
  - **Corpo:**
    ```json
    {
      "error": "Cão não encontrado"
    }
    ```

### 4. Atualizar informações de um cão

- **URL:** `/dogs/{id}`
- **Método:** `PUT`
- **Parâmetros de URL:**
  - `id`: ID do cão a ser atualizado
- **Corpo da requisição:**
  ```json
  {
    "name": "Novo nome do cão",
    "age": Nova idade do cão em anos,
    "breed": "Nova raça do cão",
    "weight": Novo peso do cão em kg
  }
  ```
- **Resposta de sucesso:**
  - **Código:** `200 OK`
  - **Corpo:**
    ```json
    {
      "id": "ID do cão",
      "name": "Novo nome do cão",
      "age": Nova idade do cão em anos,
      "breed": "Nova raça do cão",
      "weight": Novo peso do cão em kg
    }
    ```
- **Resposta de erro:**
  - **Código:** `404 Not Found`
  - **Corpo:**
    ```json
    {
      "error": "Cão não encontrado"
    }
    ```

### 5. Deletar um registro

- **URL:** `/dogs/{id}`
- **Método:** `DELETE`
- **Parâmetros de URL:**
  - `id`: ID do cão a ser deletado
- **Resposta de sucesso:**
  - **Código:** `204 No Content`
- **Resposta de erro:**
  - **Código:** `404 Not Found`
  - **Corpo:**
    ```json
    {
      "error": "Cão não encontrado"
    }
    ```

