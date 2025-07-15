# Conceitos

**Strict Mode:** script para aplicar a variação mais restritiva do Javascript, que elimina erros silenciosos, ajusta erros que podem dificultar o processamento do código pelos motores Javascript e previne o uso de sintaxe reservada. [Documentação](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

**Call Stack:**

**Memory Heap:**

 **request (req) e response (res):** são objetos que representam a entrada e saída de uma requisição HTTP. Eles trazem a informação que foi enviada pelo cliente (como parâmetros e método) e as informações que o servidor vai responder (como status e data).
- **buffer:** Uma área de memória que armazena dados temporariamente enquanto eles estão sendo transferidos entre dois lugares.
- **test suit:** conjunto de testes que verificam algo em comum, como o mesmo módulo, componente ou comportamento
- **webhooks:** É uma forma de uma third-party application enviar informações ou notificações em tempo real para uma página ou aplicação web. Exemplo: Github notifica automaticamente à Vercel que uma PR foi mergeada e por isso a Vercel deve rodar um deploy.

**Array**
O Array dentro do contexto JavaScript é uma maneira de guardar uma coleção de dados sob uma mesma variável. Esses dados podem posteriormente serem acessados pelo seu index, e modificados a partir de métodos da classe Array e do objeto instanciado.
Os métodos de instância, ou instance methods, pertencem a objetos criados a partir de uma classe. Eles operam sobre os dados contidos naquele objeto específico e por isso dependem do contexto da instância.
Já os métodos estáticos, ou static methods, fazem parte diretamente da classe/construtor, então são chamados diretamente na função construtora, e geralmente não usam nem precisam de um objeto existente.

**Alguns métodos de instancia do Array**
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
- **IIFE (Immediately Invoked Function Expression):** Um função que é definida e executada imediatamente após sua criação. (() => {...})();
- 
**Modos de importação e exportação no JS:**
- **Module.export**
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
- **Export**
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

**generator:**
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

**Formas de utilizar condicionais de if**
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
- **assert:** É um módulo que valida se determinada condição é verdadeira, caso não seja, retorna um erro

## Typescript
**Tipos:**
- string / string[] (array de strings)
- number / Array<number> (array de numbers)
- boolean
- null
- undefined
- any
- unknown
- void
- never
``` typescript
type TypeName: { //Pode ser declarado como interface também
  prop: type,
  propOptional?: type
} 

const objectType = (objectType: TypeName): string => {
  return `Hello, world! ${objectType.prop}`
}
```