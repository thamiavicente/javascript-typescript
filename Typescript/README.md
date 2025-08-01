# Typescript

## Comentários
Em Typescript, são aceitos os comentários com `/** */` como forma de documentar o código. Dentro dos asteriscos pode-se passar argumentos como `@param` e `@returns` para descrever o comportamento esperado do código e como ele deve ser executado.
```typescript
/**
 * Descrição do código
 * @param - Parametro que a função recebe
 * @return - Retorno da função
 * @type - Descrição do tipo
 */
```
[Outros tipos aceitos](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

## Tipos primitivos
- string
- number
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
  propOptional?: type //? torna a propriedade opcional
}

const varTyped : boolean = false //variável tipada

function funTyped (objectTyped: TypeName): string { //função com o retorno tipado
  return `Hello, world! ${objectType.prop}`
}
```

## Array
Quando falamos do Array no contexto TS temos que:
- Também pode aparecer como *type[]*
- Podem ter *n* dimensões, adicionando *[]* um número *n* de vezes
    - Se n = 4 => *type[][][][]*

Mas, é importante perceber que há diferença no Array dependendo da forma como ele é tipado:
- `Array<type1 | type2>` OU `(type1 | type2)[]`: O array pode receber qualquer combinação, desde que o tipo do dado seja `type1` OU `type2`
- `[type1, type2][]`: Nesse caso, temos um [Tuple](https://github.com/thamiavicente/javascript-typescript/blob/main/Typescript#Tuple) que deve seguir exatamente o formato especificado, não aceitando mais dados e nem que os dados apareçam em ordem diferente. Nesse caso. 

## Tuple
Um tuple é criado quando um Array recebe tipo e tamanho específicos. Mas, apesar de ter comportamento parecido com o Array, para o Typescript, não há compatibilidade de tipo entre eles. Ou seja, o tipo Tuple é diferente do tipo Array.

## Rest Parameters e Spread Operators
Ambos são usados para lidar com agrupamento de dados, sendo o Rest para agrupar (e no TS tipar) os dados, enquanto que o Spread desagrupa (e usa o tipo do array/objeto original) os dados.
Exemplo:
```typescript
// Transformação REST → SPREAD
const original = [1, 2, 3];
function transformacao(...args: number[]) { // REST agrupa
  return args;
}
const copia = [...transformacao(...original)]; // SPREAD espalha
// Resultado final: copia === original (true)
```

## Enum
São usados para enumerar os valores possíveis que uma variável pode ter, sendo aceito `number` e `string`. Se nenhum valor for associado às propriedades do enum, o TS vai processar cada uma associando um `number` de forma ordenada, iniciando em `0`. Além disso, os Number Enum podem ser declarados explicitamente e podem retornar o dado da forma inversa, mostrando a propriedade a parte do seu valor.
Como convenção, recomenda-se usar a `string` associada ao enum em caixa alta, para facilitar a leitura de mensagens de erro e logs.

Exemplos:
```typescript
/**
 * Number Enum
 */
enum StatusPedido {
  AguardandoPagamento,  // 0 (valor automático)
  Processando,          // 1
  Enviado,              // 2
  Entregue,             // 3
  Cancelado = 99        // Posso atribuir valores específicos
}

// Uso prático
function atualizarStatus(pedidoId: number, novoStatus: StatusPedido) {
  console.log(`Pedido ${pedidoId} atualizado para status: ${novoStatus}`);
}

atualizarStatus(123, StatusPedido.Enviado); // Saída: "Pedido 123 atualizado para status: 2"

// Acessando o nome a partir do valor
console.log(StatusPedido[2]); // "Enviado"
```

```typescript
/**
 * String Enum
 */
enum NivelAcesso {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Leitor = "LEITOR",
  Convidado = "GUEST"
}

// Uso prático
function verificarAcesso(usuario: string, nivelRequerido: NivelAcesso) {
  console.log(`Verificando acesso de ${usuario} para ${nivelRequerido}`);
}

verificarAcesso("João", NivelAcesso.Editor); // Saída: "Verificando acesso de João para EDITOR"

// Convertendo string para enum (type assertion)
const input = "ADMIN";
const nivel: NivelAcesso = input as NivelAcesso;
Características dos String Enums:
Devem ter valores explícitos
```

## Type Aliases
Existem várias maneiras de tipar dados complexos, como `object` e `tuple`, uma delas é com o alias `type`, que recebe as propriedades e tipos que o dado precisa ter. 
Ele pode ser declarado das seguintes formas e aceita associação com `object`, tipos primitivos, entre outros:
```typescript
/**
 * Object
 */
type Something = {
  prop1: string,
  prop2: boolean,
  prop3: number[]
}

const something : Something = {
  prop1: 'item',
  prop2: false,
  prop3: [1,2,3,4,5]
}

/**
 * Array
 */
type AnotherSomething = string[]
const anotherSomething = ['item', 'value', 'prop']

/**
 * Function
 * @params - Os nomes dos parametros não precisam ser os mesmo na implementação, apenas os tipos dos parametros
 * @returns - O tipo passado após a arrow será o tipo do retorno da função
 */
type MoreOneSomething = (prop1: number, prop2: number) => void
const moreOneSomething = (value, anotherValue) => {
  console.log(value + anotherValue)
}
```

## Interface
As interfaces são muito usadas em programação orientada à objetos por sua funcionalidade com relação à `class` e `object`. Elas só podem ser associadas à `object` não aceitando tipos primitivos.
Eles podem ser aplicados nas classes através de `extends` ou `implements`.

### Extends
Quando uma classe `extends` outra classe, chamamos de Herança. A classe que herda outra recebe todos os membros da classe herdada através de cópia, podendo sobrescrever os membros da classe original assim como adicionar novos membros. Por fim, uma classe pode apenas herdar os membros de uma única classe.

### Implements
Quando uma classe `implements` outra classe é chamado de Contrato, onde a classe que assina o contrato recebe apenas a estrutura que deve seguir, mas a implementação de todos os membros deve ser feita na classe que implementa a classe mãe, podendo implementar mais de uma classe.

## Generic Types
Uma forma de reutilizar tipos complexos é através do `Generics`, que pode ser determinado quando o tipo for associado à um dado. No exemplo a baixo, o tipo genérico `T` será substituído por tipos diferentes em cada caso, conforme o que foi passado na entre `<>`.
```typescript
type Example <T> = {
  value1: [T,T],
  value2: T,
  value3: T[]
}

const applyingExample : Example<string> = {
  value1: ['item', 'value'],
  value2: 'prop',
  value3: ['1', '2', '3']
}

const applyingExample : Example<number> = {
  value1: [1, 2],
  value2: 3,
  value3: [4, 5, 6, 7]
}
```
O `Generics` pode ser usado em funções também:
```typescript
function example<T> (value: T, n: number): T[] {
  return Array(n).fill(value)
}

example<string>('floor', 4)
```

## Unions
Para permitir que um dado ou função possa receber diversos tipos, é possível adicionar uma sequência de tipos separados por `|`.
```typescript
type NewType = string | number[] | boolean
```

## Inferência
O Typescript tem a capacidade de prever o retorno de uma variável e assim inferir os possíveis retornos que aquela variável pode ter. Um exemplo é quando criamos uma variável `let var = 1234` onde não é preciso passar explicitamente o tipo `string` para que o Typescript entenda que a variável é do tipo `number`.

## Type Guard
Condicional que valida se uma variável é de um certo tipo. Essa expressão aceita valores do tipo `string`, `number`, `symbol` e `boolean`.
Algumas maneiras de fazer essa validação são:
- `typeof` que retorna uma string com o nome do tipo
- `in` que valida se o método ou propriedade está presente no objeto ou na cadeia de `prototype` dele.
```typescript
const testThisString = 'item'
typeof testThisString //retorna 'string'

const testThisObject = {
  prop: 123
}
'prop' in testThisObject //retorna true
```

## Type Narrowing
O Typescript pode descobrir o topo de uma variável a partir da verificação em run time das estruturas de comparação para inferir o tipo. Isso provém uma maneira de performa o código a partir da lógica do tipo específico.

## Common Key Pairs
O Typescript valida se os métodos ou propriedades que estão sendo chamados estão presentes no dado ou em algum `prototype` da cadeia desse dado.
```typescript
const value = boolean | number
value.toString() //compila, já que ambos possuem o método
value.toFixed(2) //não compila, porque 'boolean' não tem esse método
```

## Literal Types
São valores literais que quando associados às variáveis definem o tipo da variável, como em `let lemon = 'Limão'` onde o tipo da variável será `string` mesmo sem definir o tipo explicitamente.

## Index Signature
É uma estratégia de aplicar um tipo complexo à um dado sem que haja a necessidade de passar os nomes das propriedades.
```typescript
interface Example {
  [prop: string]: boolean //Todas as chaves devem ser 'string' e todos os valores devem ser 'boolean'
}

let example: Example = { 'myValue': true }
```

## Optional Type Members
Caso um tipo possa ser aplicado ou não ao dado, ele pode ser anotado como opcional com o símbolo `?`. Porém, é importante validar se o membro existe antes de chamá-lo.
```typescript
interface Example {
  prop: number,
  propOptional?: string
}

const example: Example = {
  prop: 123,
  propOptional: 'item'
}

const example2: Example = {
  prop: 456
}

example2.propOptional //não vai compilar, já que não existe
```


## Referências:
[Code Academy: Learn Typescript](https://www.codecademy.com/learn/learn-typescript)