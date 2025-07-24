# Advanced Javascript Data Types

## Generator X Iterator
### Iterator
Iterators são objetos que permitem percorrer uma coleção um item por vez. Eles possuem o método .next(), que retorna: `{ value: <valor>, done: <boolean> }` ou se for um iterator assíncronos, retorna: `Promise<{ value, done }>`.

Um jeito simplificado de criar um objeto que usa o protocolo iterator é com o `generator`

### Generator
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
- Pode-se retornar todos os valores do generator com:
  - **Array** -> Array.from(generato)
  - **Spread** -> [...generator()]
  - **Loop** -> for...of

## Symbols
Os Symbols são tipos primitivos imutáveis usados para criar identificadores únicos, ou seja, mesmo que dois Symbols tenham a mesma description, eles ocuparam espaços diferentes na memória. Embora seu valor seja visível no código, eles não colidem com outras propriedades e geralmente são usados para criar propriedades "privadas" ou não enumeráveis em objetos, evitando conflitos entre chaves.
```javascript
const id = Symbol('id');
const user = { [id]: 123 };

console.log(user[id]); // 123
console.log(Object.keys(user)); // [] (não aparece)
```
## Map
O Map é uma estrutura de dados que armazena pares chave-valor, permitindo que as chaves sejam de qualquer tipo, como objetos, funções ou valores primitivos. Ao contrário dos objetos, o Map usa a referência do valor passado como chave, e não apenas strings ou símbolos. Além disso, ele preserva a ordem de inserção das chaves durante a iteração, podendo ser facilmente iterado com `for...of`, retornando os pares [chave, valor]. Cada chave está associada a um único valor, e caso a chave não exista, o `.get()` retorna `undefined`.
O Map oferece métodos específicos como `.set()`, `.get()`, `.delete()` e `.has()`, que tornam o gerenciamento dos dados mais prático, além de contar com o método `.clear()` para limpeza rápida dos dados.
Essa estrutura é especialmente útil quando é necessário usar chaves que não sejam strings ou quando a ordem de inserção deve ser mantida, funcionando como uma espécie de banco de dados em memória.

### WeakMap
O WeakMap é uma estrutura de dados especializada para armazenar pares chave-valor onde as chaves devem ser obrigatoriamente objetos, não aceitando tipos primitivos como chave. As referências às chaves são fracas, o que significa que se não houver outras referências ao objeto usado como chave, ele pode ser coletado pelo garbage collector automaticamente, evitando vazamentos de memória.

Possui uma API mais simples (.set(), .get(), .delete(), .has()), não é iterável e é mais leve em termos de uso de memória em cenários onde objetos podem ser descartados ao não serem mais utilizados. Por ser focado em armazenar dados associados a objetos sem impedir a coleta de lixo, é útil para armazenar dados privados relacionados a objetos em bibliotecas ou frameworks.

Como Map salva o ponteiro da memória ao invés de valores, mesmo que um objeto seja igual à chave do Map, ele retornará como undefined:
```javascript
const obj1 = { item: 1, valor: 2 };
const obj2 = { item: 1, valor: 2 }; // mesmo conteúdo, referência diferente

const map = new Map();

map.set(obj1, 'valor do obj1');

console.log(map.get(obj1)); // 'valor do obj1'
console.log(map.get(obj2)); // undefined
```
Da mesma forma, se utilizar o mesmo ponteiro, conseguirá acessar o valor:
```javascript
const obj = { teste: 123 };
const map = new Map();
map.set(obj, 'valor');

const outroNome = obj; // mesma referência
console.log(map.get(outroNome)); // 'valor'
```
Cada caso vai pedir uma escolha entre objeto, map e weak map:

|Característica|Objeto|Map|WeakMap|
| - | - | - | - |
|Tipo de chave|String, Symbol|Qualquer tipo|Objetos|
|Ordem de inserção|Não garantida|Garantida|Não iterável|
|Iterável|Com `Object.keys` ou `for...in`|Sim com `for...of`|Não|
|Coleta de lixo|Não influencia|Não influencia|Remove entradas quando a chave não tem mais referência|
|Uso comum|Estruturação de dados e entidades|Lookup rápido com qualquer tipo de chave|Armazenar dados privados em objetos|

## Set
É uma estrutura de dados que, embora siga o padrão de armazenamento de dados chave-valor, é utilizada para criar listas de valores únicos, ou seja, não permite a duplicação de valores armazenados. Diferentemente do Map, o Set armazena apenas os valores, sem associá-los a chaves separadas, utilizando internamente o próprio valor como chave para garantir a unicidade.

Com o Set é possível validar quais informações estão presentes em duas listas sem a necessidade de iterar sobre ambas:
```javascript
const set1 = new Set(['item1', 'item2', 'item3'])
const set2 = new Set(['item1', 'item4', 'item5'])

const intersection = new Set([...set1].filter(item => set2.has(item)))
const difference = = new Set([...set1].filter(item => !set2.has(item)))
```
No Set, você pode encontrar os métodos .values() e .key(), mas ambos respondem os mesmos valores:
```javascript
set1.values() //[Set Iterator] { 'item1', 'item2', 'item3' }
set1.keys() //[Set Iterator] { 'item1', 'item2', 'item3' }
```
### Weakset
Assim como o Map, o Set possui uma versão mais leve, o WeakSet, que contém menos métodos disponíveis e armazena apenas objetos, permitindo que eles sejam coletados pelo garbage collector caso não estejam mais em uso em outras partes do código.

## Reflect
`Reflect` é um objeto global com métodos estáticos que facilitam operações sobre objetos de forma mais segura, semântica e consistente. Ele serve como uma API padronizada para executar operações de baixo nível em objetos, como definir ou deletar propriedades, chamar funções ou interceptar protótipos, através de métodos como `Reflect.deleteProperty`, `Reflect.get`, `Reflect.set`, entre outros, permitindo manipular propriedades de objetos sem os efeitos colaterais que podem ocorrer com operadores tradicionais como `delete`. Por exemplo, ao usar `delete`, há impacto potencial na otimização de performance do motor JavaScript, pois a exclusão de propriedades pode desestruturar a forma como o motor organiza a memória e os acessos internos do objeto. Com `Reflect.deleteProperty`, a operação é semântica e retorna `true` ou `false` explicitamente, facilitando o tratamento de erros e tornando o código mais previsível. Além disso, `Reflect` é frequentemente usado em conjunto com `Proxy`, pois permite delegar operações padrão (get, set, deleteProperty, etc.) de forma limpa. Assim, evita efeitos colaterais inesperados quando você intercepta operações com um `Proxy`.

## Proxy e Observer
Proxy são objetos que permitem interceptar e redefinir operações realizadas em outro objeto (target), funcionando como um “observador ativo” para leitura, escrita ou chamadas de função, permitindo modificar ou validar dados em tempo real. Dois dos handlers mais comuns no Proxy são o `.get()` e o `.set()`. Os argumentos passados a essas funções seguem esta ordem:
- **target:** o objeto alvo observado pelo Proxy,
- **propertyKey:** a chave da propriedade sendo acessada ou modificada,
- **value:** (apenas no `.set()`) o novo valor a ser atribuído,
- **receiver:** quem iniciou a operação, geralmente o próprio Proxy.

É importante notar que, diferente de um padrão Observer tradicional, o Proxy não notifica múltiplos ouvintes de forma reativa — ele intercepta e controla a ação imediatamente, enquanto o Observer é um padrão de design que permite registrar múltiplos “assinantes” para serem notificados quando algo mudar. Ou seja:
- **Proxy:** intercepta diretamente a ação (leitura, escrita) — é um guardião.
- **Observer:** avisa outras partes do sistema quando algo mudou — é um mensageiro.
Eles podem ser usados juntos: por exemplo, um Proxy pode emitir eventos de Observer sempre que detecta mudanças.

## Node timers
- **setImmediate:** agenda a execução de uma função após a fase atual do loop de eventos, sendo executada antes de setTimeout com 0ms em muitos casos. Útil para executar funções imediatamente após a conclusão de I/O ou operações síncronas pesadas sem bloquear o restante da execução.
- **setTimeout:** executa uma função uma única vez após um tempo especificado em milissegundos, sendo amplamente usado para agendamento simples de tarefas assíncronas.
- **setInterval:** executa uma função repetidamente em intervalos de tempo específicos até que seja explicitamente cancelado, ideal para tarefas periódicas como checagem de estados ou requisições contínuas.

### Process
Já o process é um objeto global do Node que representa o processo em execução. Ele oferece controle de baixo nível sobre o ciclo de vida da aplicação, como:
- permite ler variáveis de ambiente `process.env`,
- manipular argumentos de linha de comando,
- lidar com eventos do loop de eventos,
- emitir sinais de encerramento,
- obter informações de uso de memória,
- além de conter métodos como process.nextTick(), que agenda funções para serem executadas antes de qualquer I/O assíncrono, até mesmo antes de setImmediate.

## Objeto
Em JavaScript, um objeto é uma estrutura de dados que armazena pares chave-valor, onde as chaves são strings ou symbols e os valores podem ser de qualquer tipo. Objetos são amplamente usados para estruturar dados e representar entidades no código, permitindo fácil acesso e modificação das propriedades por chave.
```javascript
const actor = { item: 1, valor: 2 };
```
### Private element
São criados com o perfixo `#` e não podem ser referenciados fora da classe onde foram criadas.
[Private element - documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements)

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