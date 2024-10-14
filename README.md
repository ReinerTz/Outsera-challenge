# Outsera Challenge

Este é um projeto que processa uma lista de filmes (`./src/data/movielist.csv`) e gera informações sobre intervalos de prêmios para produtores, exibindo os produtores que ganharam mais de uma vez. A aplicação utiliza Node.js, Express e Sequelize com integração a um banco de dados.

## Estrutura do Projeto

### Abordagem Implementada: Entidade Única (Movie)

Nesta implementação, foi criada uma única entidade `Movie`, que armazena todas as informações relevantes sobre os filmes. Os endpoints da API são projetados para interagir diretamente com essa entidade.

- **Entidade**: `Movie`
  - **Atributos**:
    - `title`: **STRING** - O título do filme.
    - `producers`: **STRING** - Os produtores do filme.
    - `studios`: **STRING** - Os estúdios envolvidos na produção do filme.
    - `year`: **INTEGER** - O ano em que o filme foi lançado.
    - `winner`: **BOOLEAN** - Indica se o filme ganhou um prêmio.

- **Vantagens**:
  - **Simplicidade**: Uma única entidade facilita a compreensão do modelo de dados.
  - **Facilidade de Manutenção**: Com menos entidades, o código é mais fácil de manter e entender.

- **Desvantagens**:
  - **Escalabilidade**: À medida que mais funcionalidades são adicionadas, pode se tornar difícil gerenciar a lógica de negócios em uma única entidade.

### Abordagem Alternativa: Múltiplas Entidades (Producer, Studio, etc.)

Embora não tenha sido implementada, uma abordagem alternativa seria criar várias entidades, como `Producer`, `Studio` e `Movie`. Isso permite uma modelagem mais rica e uma estrutura mais flexível.

- **Entidades Sugeridas**:
  - `Movie`: Representa os filmes.
  - `Producer`: Representa os produtores de filmes.
  - `Studio`: Representa os estúdios que produzem filmes.

- **Vantagens**:
  - **Modularidade**: Cada entidade pode ser gerenciada de forma independente, facilitando a adição de novas funcionalidades.
  - **Clareza**: As relações entre filmes, produtores e estúdios são mais explícitas, o que pode ajudar na compreensão dos dados.

- **Desvantagens**:
  - **Complexidade**: Mais entidades significam mais interações e complexidade na lógica de negócios.
  - **Necessidade de Relacionamentos**: É necessário gerenciar como as entidades se relacionam entre si.


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

