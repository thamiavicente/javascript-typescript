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

## Bibliotecas
### assert
É um módulo que valida se determinada condição é verdadeira, caso não seja, retorna um erro.

[Documentação - Assert](https://nodejs.org/api/assert.html)

### file system
É um módulo para lidar com arquivos, como ler, observar e escrever um arquivo.

[Documentação - File System](https://nodejs.org/api/fs.html)