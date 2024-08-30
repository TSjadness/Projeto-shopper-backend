# Projeto Shopper #  Serviço de Leitura de Imagens

Este é o readme do projeto Shopper, onde serão documentadas todas as informações relevantes sobre o projeto.

Este projeto é um serviço de back-end desenvolvido em Node.js com TypeScript, que gerencia a leitura individualizada de consumo de água e gás. O serviço utiliza a API do Google Gemini para obter medições a partir de imagens de medidores.

## Estrutura do Projeto

shopper-projeto/
│
├── src/
│ ├── controllers/
│ │ └── index.ts
│ ├── models/
│ │ └── index.ts
│ ├── routes/
│ │ └── index.ts
│ ├── services/
│ │ └── index.ts
│ ├── index.ts
│ └── database.ts
│
├── .env
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json

## Descrição

O projeto Shopper é um aplicativo de compras online que permite aos usuários pesquisar, selecionar e comprar produtos de diferentes lojas virtuais. O objetivo é proporcionar uma experiência de compra conveniente e eficiente para os usuários.

## Endpoints

### 1. POST /upload

Recebe uma imagem em base64, consulta o Gemini e retorna a medida lida pela API.

**Request Body:**

```json
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" ou "GAS"
}
```

**Response:**

```json
{
  Response:

200: Operação realizada com sucesso
{
  "image_url": "string",
  "measure_value": integer,
  "measure_uuid": "string"
}
400: Dados inválidos
{
  "error_code": "INVALID_DATA",
  "error_description": "<descrição do erro>"
}
409: Já existe uma leitura para este tipo no mês atual
{
  "error_code": "DOUBLE_REPORT",
  "error_description": "Leitura do mês já realizada"
}
2. PATCH /confirm
Confirma ou corrige o valor lido pelo LLM.

Request Body:

{
  "measure_uuid": "string",
  "confirmed_value": integer
}
Response:

200: Operação realizada com sucesso
{
  "success": true
}
400: Dados inválidos
{
  "error_code": "INVALID_DATA",
  "error_description": "<descrição do erro>"
}
404: Leitura não encontrada
{
  "error_code": "MEASURE_NOT_FOUND",
  "error_description": "Leitura não encontrada"
}
409: Leitura já confirmada
{
  "error_code": "CONFIRMATION_DUPLICATE",
  "error_description": "Leitura já confirmada"
}
3. GET /<customer_code>/list
Lista as medidas realizadas por um determinado cliente.

Query Parameter:

measure_type (opcional): "WATER" ou "GAS"
Response:

200: Operação realizada com sucesso
{
  "customer_code": "string",
  "measures": [
    {
      "measure_uuid": "string",
      "measure_datetime": "datetime",
      "measure_type": "string",
      "has_confirmed": boolean,
      "image_url": "string"
    }
  ]
}
400: Tipo de medição não permitida
{
  "error_code": "INVALID_TYPE",
  "error_description": "Tipo de medição não permitida"
}
404: Nenhum registro encontrado
{
  "error_code": "MEASURES_NOT_FOUND",
  "error_description": "Nenhuma leitura encontrada"
}
}
```

## Funcionalidades

- Pesquisa de produtos por categoria, nome ou palavra-chave
- Visualização detalhada de produtos, incluindo descrição, preço e avaliações dos usuários
- Adição de produtos ao carrinho de compras
- Finalização da compra com opções de pagamento seguro
- Acompanhamento do status do pedido

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- React.js
- Node.js
- MongoDB

## Instalação

1. Clone o repositório do projeto:

```
git clone https://github.com/seu-usuario/shopper.git
cd shopper-projeto
```

2. Instale as dependências do projeto:

```
npm install
```

3. Inicie o servidor de desenvolvimento:

```
npm start
```

4. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```
GEMINI_API_KEY=<sua_chave_da_api>
DB_USER=<seu_usuario>
DB_HOST=<seu_host>
DB_NAME=<seu_banco_de_dados>
DB_PASSWORD=<sua_senha>
DB_PORT=<sua_porta>
```

# Dockerização

1. Para construir e iniciar a aplicação com Docker, executeo:

```
docker-compose up --build
```
# Comandos Úteis


```
Iniciar a aplicação em modo de desenvolvimento:
npm run dev  

Construir a aplicação:
npm run build

Parar a aplicação:
docker-compose down  
```
## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).


### Considerações Finais  

Esse README fornece uma visão geral clara do seu projeto, incluindo como configurá-lo e usá-lo. Sinta-se à vontade para personalizá-lo conforme necessário, adicionando mais detalhes ou ajustando as seções para refletir melhor o seu trabalho. Se precisar de mais assistência, estou aqui para ajudar!