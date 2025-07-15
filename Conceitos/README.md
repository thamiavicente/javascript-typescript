# Conceitos

## Strict Mode
É um script para aplicar a variação mais restritiva do Javascript, que elimina erros silenciosos, ajusta erros que podem dificultar o processamento do código pelos motores Javascript e previne o uso de sintaxe reservada.

[Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

[The Strict Mode of ECMAScript](https://tc39.es/ecma262/multipage/strict-mode-of-ecmascript.html)

## Call Stack
Mecanismo utilizado por interpretadores para organização a chamada de scripts que chamam multiplas funções. Pode ser entendido como uma Pilha, já que a primeira função a ser chamada é a última a sair da pilha (as funções chamadas por outras funções são colocadas no topo da pilha).
[Call stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)

## Memory Heap
O heap é um espaço na memória onde são armazenados em run time (tempo de execução) os valores dos objetos ou estruturas de forma dinâmica. As variáveis utilizadas no código armazenam ponteiros para o heap onde a informação foi armazenada.

## Tipo de valor
Armazenam o valor diretamente na variável (na stack), ou seja, quando você copia uma variável primitiva, copia o valor, não há ligação entre elas. Se você alterar uma não afeta a outra. Exemplos: string, number, boolean, undefined, null, bigint, symbol. (conceito para o Javascript)

## Tipo de referência
Armazenam um ponteiro (referência) para o local no heap onde o valor está, ou seja, quando você copia uma variável que contém um tipo de referência, está copiando a referência (ponteiro), não o valor em si. Se você alterar a cópia também altera o valor original, pois ambos apontam para o mesmo local no heap. Exemplos: Object, Array, Function.

## Symbol.toPrimitive
É uma propriedade especial que usa uma função como valor. Ela define a ordem de precedência ao tentar converter um objeto em um tipo primitivo e não está presente nativamente em todos os objetos — é preciso implementá-la manualmente. A ideia dessa propriedade é permitir converter o objeto que a contém em um tipo primitivo, como string ou number, de acordo com o contexto. Para isso, o método recebe uma dica (hint) que pode ser 'string', 'number' ou 'default'. O hint 'default' é usado quando o contexto não deixa claro qual tipo é preferido, mas, ao contrário do que se pensa, ele não indica conversão para boolean. O retorno do método pode ser um valor primitivo — string, number ou até boolean — mas, na prática, ele é mais usado para retornar string ou number, controlando como o objeto se comporta em operações de coerção de tipo.

[Symbol.toPrimitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)

## Herança em Javascript
A herança no JavaScript é feita por meio do `prototype`, que é um objeto onde ficam armazenadas as propriedades e funções que poderão ser herdadas (através do `extends`) por outros objetos criados a partir de uma função construtora ou classe. Quando uma propriedade ou método é chamado em um objeto, o motor do JavaScript primeiro verifica se essa propriedade ou método existe diretamente no próprio objeto. Caso não encontre, ele busca no `prototype` do objeto, e, se ainda não encontrar, continua procurando no `prototype` do `prototype`, formando uma cadeia de busca chamada de `prototype chain`. Essa busca continua até encontrar a propriedade ou método desejado ou até não haver mais protótipos na cadeia, retornando `undefined` nesse caso.

Quando um objeto é criado usando o operador `new`, dizemos que foi criada uma instância. Essa instância possui suas próprias propriedades e métodos específicos, de forma que modificá-la não afeta o `prototype` nem o objeto do qual foi criada. No entanto, a instância consegue acessar os métodos e propriedades herdados pelo `prototype` da função construtora, permitindo o uso compartilhado de métodos sem duplicação em cada instância.

No JavaScript, `prototype` e `class` são conceitos diferentes. A classe é um syntactic sugar (açúcar sintático) introduzido para facilitar a leitura e a escrita do código, mas, internamente, uma classe ainda é uma função construtora e utiliza o `prototype` para estruturar a herança. Em outras palavras, cada classe possui um objeto `prototype` associado a ela, no qual os métodos definidos na classe são armazenados e disponibilizados para todas as instâncias criadas a partir dela, mantendo o mecanismo de herança prototipal do JavaScript.

## request (req) e response (res)
São objetos que representam a entrada e saída de uma requisição HTTP. Eles trazem a informação que foi enviada pelo cliente (como parâmetros e método) e as informações que o servidor vai responder (como status e data).

## buffer
Uma área de memória que armazena dados temporariamente enquanto eles estão sendo transferidos entre dois lugares.

## test suit
Conjunto de testes que verificam algo em comum, como o mesmo módulo, componente ou comportamento

## webhooks
É uma forma de uma third-party application enviar informações ou notificações em tempo real para uma página ou aplicação web. Exemplo: Github notifica automaticamente à Vercel que uma PR foi mergeada e por isso a Vercel deve rodar um deploy.

## Array
O Array dentro do contexto JavaScript é uma maneira de guardar uma coleção de dados sob uma mesma variável. Esses dados podem posteriormente serem acessados pelo seu index, e modificados a partir de métodos da classe Array e do objeto instanciado.
Os métodos de instância, ou instance methods, pertencem a objetos criados a partir de uma classe. Eles operam sobre os dados contidos naquele objeto específico e por isso dependem do contexto da instância.
Já os métodos estáticos, ou static methods, fazem parte diretamente da classe/construtor, então são chamados diretamente na função construtora, e geralmente não usam nem precisam de um objeto existente.

### Alguns métodos de instancia do Array
- **filter:** retorna um array com todos os elementos que aceitam as condições passadas.
  ``` javascript
  const array = [1,2,4,5]
  const filter = array.filter((number) => number > 3)
  // [4,5]
  ```
- **find:** retorna o primeiro elemento que satisfaz a condição passada.
    ``` javascript
    const array = ['abacate', 'cereja', 'banana', 'abacaxi']
    const find = array.find((fruit) => fruit.substring(0,1) === 'a')
    // 'abacate'
    ```
- **flat:** cria um novo array com as informações do array e seus sub-arrays.
    ``` javascript
    const array = [1, 2, [3, 4, [5, 6, 7], [8, 9]]]
    const simpleFlat = array.flat()
    // [1, 2, 3, 4, [5, 6, 7], [8, 9]]
    const flatterFlat = array.flat(2) //ou infinity para abrir todos os sub arrays
    // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ```
- **map:** cria um novo array a partir de um array, passando cada item por uma função de callback.
    ``` javascript
    const array = [1, 2, 3, 4, 5]
    const map = array.map((number) => number * 2)
    // 2, 4, 6, 8, 10
    ```
- **reduce:** a partir de um array, uma função de callback e um valor inicial (que é opcional), ele processa todos os valores do array para retornar um único resultado.
  ``` javascript
  const array = ['a', 'b', 'c', 'd', 'e']
  const initial = 'alfabeto: '
  const reduce = array.reduce(((accumulator, current) => accumulator.concat(current)), initial)
  // alfabeto: abcde
  ```
- **slice:** cria um novo array a partir de um array inicial e os índices dos parâmetros requeridos.
  ``` javascript
  const array = ['abacate', 'cereja', 'banana', 'abacaxi', 'manga']
  const slice = array.slice(1) //itens do índice 1 até array.length
  // ['cereja', 'banana', 'abacaxi', 'manga']
  const sliceNegative = array.slice(-3) //os 3 últimos itens
  // ['banana', 'abacaxi', 'manga']
  const slicePortion = array.slice(2, -1) //itens do índice 2 (inclusivo) até o último índice (exclusivo)
  // ['banana', 'abacaxi']
  ```
- **splice:** modifica um array, adicionando ou removendo elementos dele.
  ``` javascript
  const array = ['abacate', 'cereja', 'banana', 'abacaxi', 'manga']
  array.splice(2, 0, 'morango') //no índice 2, não remove itens, mas adiciona morango
  // remove []
  //['abacate', 'cereja', 'morango', 'banana', 'abacaxi', 'manga']
  array.splice(1, 2) //a partir do índice 1, remove 2 itens
  // remove ['cereja', 'morango']
  //['abacate', 'banana', 'abacaxi', 'manga']
  array.splice(3, 1, 'uva', 'jambu', 'jabuticaba') //a partir do índice 3, remove 1 item e adiciona uva, jambu e jabuticaba
  // remove ['manga']
  //['abacate', 'banana', 'abacaxi', 'uva', 'jambu', 'jabuticaba']
  ```

## Funções e código

### IIFE (Immediately Invoked Function Expression)
Um função que é definida e executada imediatamente após sua criação. (() => {...})();

### Modos de importação e exportação no JS:
#### Module.export
  - Usado no Node.js
  - Anterior ao suporte nativo de ESModules
  - Export:
    ``` javascript
        const saudacao = () => 'Olá!';
        module.exports = saudacao;
    ```
    - Import:
    ``` javascript
        const saudacao = require('./arquivo');
        console.log(saudacao());
    ```
#### Export
  - Usado em navegadores e também no Node.js com "type": "module" no package.json
  - Export:
  ``` javascript
      export default function saudacao() {
          return 'Olá!';
      }
  ```
  - Import
  ``` javascript
      import saudacao from './arquivo.js';
  ```

### generator
É uma função que pode ser executada em partes, ou seja, pausar e continuar a execução de onde parou, permitindo que os valores sejam produzidos por demanda.
  - O generator é criado usando * e yield
    ``` javascript
    //Exemplo
    function * consoleLetter() {
        yield 'A'
        yield 'B'
        yield 'C'
    }
    ```
  - Diferente do return, que devolve um único valor e para a função
    |Critério|return com lista|yield com generator|
    |-|-|-|
    |Memória|Alta (guarda tudo)|Baixa (guarda o estado)|
    |Performance|Rápido se poucos itens|Escala melhor com muitos|
    |Reutilizável (continua de onde parou)|Não|Sim (com .next() ou for..of)|
    |Pausável|Não|Sim|

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

## Bibliotecas

### assert
É um módulo que valida se determinada condição é verdadeira, caso não seja, retorna um erro

## Typescript
### Tipos:
- string / string[] (array de strings)
- number / Array<number> (array de numbers)
- boolean
- null
- undefined
- any
- unknown
- void
- never
Exemplo de declaração de tipo
``` typescript
type TypeName: { //Pode ser declarado como interface também
  prop: type,
  propOptional?: type
} 

const objectType = (objectType: TypeName): string => {
  return `Hello, world! ${objectType.prop}`
}
```