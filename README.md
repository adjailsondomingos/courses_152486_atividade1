# Api Node

Uma API simples desenvolvida para o Curso de "API e Web Service" utilizando Node e aplicando cache.

## Pré-requisitos

- Node.js
- npm (geralmente vem com o Node.js)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/adjailsondomingos/courses_152486_atividade1.git
   ```

2. Acesse seu diretório:
   
   ```bash
   cd seu-projeto
   ```

3. Instale as dependências:
   
   ```bash
   npm install
   ```

4. Crie um Certificado
   ```bash
   openssl req -nodes -new -x509 -keyout certificado.key -out certificado.cert
   ```

## Iniciar o servidor
   
   ```bash
   node app.js
   ```
  
## Exemplos de Solicitações

   ```bash
    # Exemplo de solicitação GET
    curl -X GET https://localhost:3000/pessoas
    curl -X GET https://localhost:3000/pessoas/1
    curl -X GET https://localhost:3000/carros
    curl -X GET https://localhost:3000/carros/2
    curl -X GET https://localhost:3000/animais
    curl -X GET https://localhost:3000/animais/3

    # Exemplo de solicitação POST
    curl -X POST 'https://localhost:3000/animais' -d '{"id": 22, "nome": "abelha" }' --header 'Content-Type: application/json'
    curl -X POST 'https://localhost:3000/carros' -d '{"id": 1000, "nome": "Jeep"}' --header 'Content-Type: application/json'
    curl -X POST 'https://localhost:3000/pessoas' -d '{"id": 1000, "nome": "Paulo"}' --header 'Content-Type: application/json'
   ```

## Desenvolvedor
- 1469201 - Adjailson Domingos