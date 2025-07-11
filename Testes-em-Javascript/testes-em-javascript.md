# Instruções
Para rodar os testes presentes nesse projeto, basta fazer o clone do repositório e rodar o comando especificado no tópico.

**Exemplo:** Rodar testes de mock
1. Clone o repositório
2. Abra o diretório raiz do projeto no terminal
3. Rode o comando abaixo no terminal
   ``` javascript
   npm run test-mocks
   ```

# Testes

## Testes unitários
Testes unitários são utilizados para verificar o funcionamento de unidades isoladas de código, como funções ou métodos, de forma independente de outras partes do sistema. Eles garantem que cada parte pequena do programa funcione como esperado, sem depender de bancos de dados, APIs ou outras dependências externas, o que deixa a execução do código mais rápida.

A seguir, veremos exemplos de testes unitários que você pode rodar localmente para uma experiência prática. Também explicaremos três ferramentas comuns usadas nesse tipo de teste: mocks, stubs e spies.

### Mocks
Mocks são objetos ou funções que simulam comportamentos de dependências reais em um teste. Eles permitem isolar o código em teste e verificar como ele interage com essas dependências, sem executar a lógica real delas.

No exemplo a seguir, temos uma função que recebe um arquivo e valida seu conteúdo. Nesse momento não precisamos testar as unidades de recebimento ou upload de arquivos, apenas se nosso código está validando o conteúdo corretamente.

#### **[Exemplo de mocks](https://github.com/thamiavicente/js-expert/tree/main/Testes-em-Javascript/1-Mocks)**
``` javascript
    //Comando para executar os testes
    npm run test-mocks
```

### Stubs
Um stub é um pedaço de código que substitui uma dependência externa do código que está sendo testado, como por exemplo os dados de uma API. Ele é usado para fornecer respostas pré-definidas a chamadas feitas pelo código em teste, permitindo isolar e testar o comportamento da unidade com base nesses dados controlados.

O stub e o mock podem parecer a mesma coisa, mas, diferente do mock, o stub é utilizado para fornecer dados esperados ao teste, sem necessariamente verificar como esses dados são utilizados. Já o mock também verifica interações, por exemplo, se uma função foi chamada, quantas vezes, com quais argumentos etc. Ele é útil para testar o comportamento e a comunicação entre componentes.

A baixo você pode acessar um exemplo de stub, usado para testar o tratamento dos dados recebidos da API. Como os dados são mockados, não é preciso fazer requisição para a API para ter certeza que o tratamento de dados está funcionando corretamente.

#### **[Exemplo de stubs](https://github.com/thamiavicente/js-expert/tree/main/Testes-em-Javascript/2-Stubs)**
``` javascript
    //Comando para executar os testes
    npm run test-stubs
```

### Spies
Um outro conceito importante nos testes unitários são os spies. Os spies permitem observar o comportamento de funções ou métodos durante a execução dos testes, focando não no resultado final, mas sim no processo de execução. Com eles, é possível verificar, por exemplo, quantas vezes uma função foi chamada, quais argumentos ela recebeu e quais valores retornou.

Abaixo temos um exemplo de spy, onde um método da classe Fibonacci é monitorado para validar seu comportamento durante a execução.

#### **[Exemplo de spies](https://github.com/thamiavicente/js-expert/tree/main/Testes-em-Javascript/3-Spies)**
``` javascript
    //Comando para executar os testes
    npm run test-spies
```

## Testes end-to-end
Testes end-to-end, ou E2E, são usados para verificar o funcionamento do projeto do ponto de vista do usuário final. Eles validam se todas as funcionalidades, desde o back-end até o front-end, estão operando conforme o esperado, simulando interações reais.

Junto a isso, podemos usar ferramentas de análise de cobertura de testes para garantir que todas as partes do sistema foram testadas, seguindo as especificações definidas pela equipe do projeto.

A seguir temos um exemplo de teste e2e que valida se as respostas das rotas da API estão de acordo com o esperado.
``` javascript
    //Comando para executar os testes
    npm run start-e2e //inicia os servidores
    npm run test-e2e //inicia os servidores + roda os testes
    npm run test-e2e:dev //inicia os servidores + roda os testes em modo "watch"
    npm run test-e2e:cov //inicia os servidores + roda os testes + analisa a cobertura de testes
```