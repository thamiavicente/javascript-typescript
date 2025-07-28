# Conceitos
## request (req) e response (res)
São objetos que representam a entrada e saída de uma requisição HTTP. Eles trazem a informação que foi enviada pelo cliente (como parâmetros e método) e as informações que o servidor vai responder (como status e data).

## buffer
Uma área de memória que armazena dados temporariamente enquanto eles estão sendo transferidos entre dois lugares.

## webhooks
É uma forma de uma third-party application enviar informações ou notificações em tempo real para uma página ou aplicação web. Exemplo: Github notifica automaticamente à Vercel que uma PR foi mergeada e por isso a Vercel deve rodar um deploy.

## Funções e código
### IIFE (Immediately Invoked Function Expression)
Um função que é definida e executada imediatamente após sua criação. (() => {...})();

### Formas de utilizar condicionais de if
    ``` javascript
    //Tradicional
    if(something) { return 'something'}
    else { return 'not something' } //opcional

    //Operador ternário
    const result = something ? 'something' : 'not something'

    //Curto-circuito com AND (&&) (não é possível adicionar o retorno para "else")
    something && 'something'
    ```
### for... in... X for... of...
#### for...in
- Itera sobre as chaves enumeráveis de um objeto.
- Para arrays, retorna os índices como strings, não os valores.
- Deve ser evitado para arrays em muitos casos, pois:
  - Itera sobre propriedades herdadas se o protótipo for alterado.
  - A ordem de iteração não é garantida conforme o padrão (embora os engines modernos geralmente preservem a ordem de índices numéricos).

#### for...of
- Utilizado para iterar sobre iteráveis (arrays, strings, Maps, Sets, etc.):
- Funciona apenas em iteráveis (tem método [Symbol.iterator]).
- Retorna os valores a cada iteração, não os índices.

|Loop|Uso|
|-|-|
|for...in|Itera sobre chaves (índices em arrays ou propriedades em objetos)|
|for...of|Itera sobre valores de um iterável (arrays, strings, Sets, Maps, etc.)|

- Para arrays, prefira for...of ou forEach para acessar valores diretamente.
- Para objetos, use for...in para iterar sobre chaves.

#### for (var i = 0; i < arr.length; i++)
- Itera usando índices numéricos.
- Permite acesso ao índice explicitamente (i).
- Permite modificar o índice manualmente dentro do loop (ex: i += 2).
- Permite pular iterações ou inverter a ordem manualmente.
- Pode ser levemente mais performático em laços muito longos por eliminar a necessidade de iteradores.
- Útil para iterações que precisam do índice, por exemplo:

### Escopo de funções
#### Regular Function
- O this depende de como a função é chamada, sendo dinâmico:
- No browser em modo não estrito, this dentro de funções globais é o window.
- No modo estrito ('use strict'), é undefined.
- Quando chamada como método de objeto, this referencia o objeto que chamou.
```javascript
const obj = {
  name: 'Alice',
  showName: function() {
    console.log(this.name);
  }
};

obj.showName(); // 'Alice'
//Aqui this aponta para obj porque obj está chamando showName.
```

#### Arrow Function
- O this de uma arrow function é léxico:
- Ele não cria seu próprio this.
- Herda o this do escopo em que foi definido.
```javascript
const obj = {
  name: 'Alice',
  showName: () => {
    console.log(this.name);
  }
};

obj.showName(); // undefined
// Aqui this não é obj, mas sim o this do escopo em que obj foi definido (no browser, window; em módulo, geralmente undefined).
```

|Aspecto|Regular Function|Arrow Function|
|-|-|-|
|this|Dinâmico, depende de quem chama|Léxico, herdado do escopo|
|Cria this próprio?|Sim|Não|
|Útil para métodos de objeto?|Sim|Cuidado, geralmente não recomendado|
|Útil para callbacks que precisam de this externo?|Precisa de .bind para manter this|Sim, usa this externo automaticamente|

### replace
O `replace` pode ser usado com uma callback que recebe:
- fullmatch: a string inteira
- groups: as subdivisões da string
- index
```javascript
let string = "abcdecfg"
const stringDivision = /^(\w.*)c(\w.*)c(\w.*)$/g
string.replace(stringDivision, (fullMatch, group1, group2, group3, index) => {
  return `initial: ${fullMatch}, g1: ${group1}, g2: ${group2}, g3: ${group3}, index: ${index}`
})
```

## Bibliotecas
### assert
É um módulo que valida se determinada condição é verdadeira, caso não seja, retorna um erro.

[Documentação - Assert](https://nodejs.org/api/assert.html)

### file system
É um módulo para lidar com arquivos, como ler, observar e escrever um arquivo.

[Documentação - File System](https://nodejs.org/api/fs.html)