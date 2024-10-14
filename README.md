# Outsera Challenge

Este é um projeto que processa uma lista de filmes (`./src/data/movielist.csv`) e gera informações sobre intervalos de prêmios para produtores, exibindo os produtores que ganharam mais de uma vez. A aplicação utiliza Node.js, Express e Sequelize com integração a um banco de dados.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- SQLite (pode ser substituído por outro banco de dados se necessário)
- Jest e supertest (para testes de integração)

## Requisitos

- Node.js v16 ou superior
- npm (Node Package Manager)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/movie-challenge.git
   cd movie-challenge
   ```
2. **Instale as dependências**
   ```bash
   npm install
   ```

## Executando o projeto

1. **Inicie o servidor de desenvolvimento:**
    Após instalar as dependências e configurar o banco de dados, você pode iniciar o servidor com o seguinte comando:
    ```bash
    npm start
    ```

    O servidor será iniciado na porta 3000 e você poderá acessar a API em http://localhost:3000/api.

## Endpoints da API
1. cURL para fazer a requisição e testar o endpoint `/api/producers/awards-intervals`

    ```bash
    curl --location 'localhost:3000/api/producers/awards-intervals'
    ```

2. Exemplo de saída
    ```json
    {
        "max": [
            {
                "producer": "Matthew Vaughn",
                "previousWin": 2002,
                "followingWin": 2015,
                "interval": 13
            }
        ],
        "min": [
            {
                "producer": "Joel Silver",
                "previousWin": 1990,
                "followingWin": 1991,
                "interval": 1
            }
        ]
    }
    ```

## Executando testes de integração
Os testes de integração garantem que os dados processados e retornados pela API estejam de acordo com o esperado.

1. Execute os testes com o comando:
    ```bash
    npm test
    ```
2. Sobre os testes:

    O teste principal verifica o endpoint `/api/producers/awards-intervals` e valida se a resposta contém as propriedades `max` e `min`, como no exemplo fornecido.
