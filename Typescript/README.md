# Typescript

## Comentários
Em Typescript, são aceitos os comentários com `/** */` como forma de documentar o código. Dentro dos asteriscos pode-se passar argumentos como `@param` e `@returns` para descrever o comportamento esperado do código e como ele deve ser executado.

## Tipos:
- string
- number
- boolean
- null
- undefined
- any
- unknown
- void
- never
- Array<T>
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
- `Array<type1 | type2>`: O array pode receber qualquer combinação, desde que o tipo do dado seja `type1` OU `type2`
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