# Ciclos de Vida do Javascript

## [Projeto final](https://github.com/thamiavicente/javascript-typescript/tree/main/Capitulos-do-curso/ECMAScript/Project-ESModules)

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
A herança no JavaScript é feita por meio do `prototype`, que é um objeto onde ficam armazenadas as propriedades e funções que poderão ser herdadas (através do `extends`) por outros objetos criados a partir de uma função construtora ou classe. Quando uma propriedade ou método é chamado em um objeto, o motor do JavaScript primeiro verifica se essa propriedade ou método existe diretamente no próprio objeto. Caso não encontre, ele busca no `prototype` do objeto, e, se ainda não encontrar, continua procurando no `prototype` do `prototype`, formando uma cadeia de busca chamada de `prototype chain`. Essa busca continua até encontrar a propriedade ou método desejado ou até não haver mais protótipos na cadeia, retornando `undefined` nesse caso. Isso é possível por que na classe filha é guardada a referência para o `prototype` da classe mãe.

Quando um objeto é criado usando o operador `new`, dizemos que foi criada uma instância. Essa instância possui suas próprias propriedades e métodos específicos, de forma que modificá-la não afeta o `prototype` nem o objeto do qual foi criada. No entanto, a instância consegue acessar os métodos e propriedades herdados pelo `prototype` da função construtora, permitindo o uso compartilhado de métodos sem duplicação em cada instância.

No JavaScript, `prototype` e `class` são conceitos diferentes. A classe é um syntactic sugar (açúcar sintático) introduzido para facilitar a leitura e a escrita do código, mas, internamente, uma classe ainda é uma função construtora e utiliza o `prototype` para estruturar a herança. Em outras palavras, cada classe possui um objeto `prototype` associado a ela, no qual os métodos definidos na classe são armazenados e disponibilizados para todas as instâncias criadas a partir dela, mantendo o mecanismo de herança prototipal do JavaScript.

## .bind()
É um método responsável por definir o contexto de uma função, ou seja, indica qual será o `this` que ela deve considerar ao ser executada, independentemente de onde ou como for chamada. Opcionalmente, pode-se passar outros argumentos que sejam necessários para a execução da função.

## .call() e .apply()
São métodos que “interceptam” a chamada normal de uma função, permitindo definir explicitamente o `this` e os argumentos que a função usará ao ser executada.

A diferença entre eles é que `call` recebe argumentos individuais, enquanto que o `apply` recebe um array de argumentos.

Veja o exemplo dado na aula:
``` javascript
'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
    watch(event, filename) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

const file = new File()

watch(__filename, file.watch.bind(file))

//Nas chamadas a baixo, o "this" é alterado para um novo objeto que possui uma nova implementação de showContent, sendo assim, quando "watch" chamar "this.showContent", ele usará essa nova função e não a que está presente em File.
file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename )
file.watch.apply({ showContent: () => console.log('apply: hey sinon!') }, [null, __filename] )
```

## this
O `this` representa o contexto de execução da função, indicando a qual objeto ou escopo ela está relacionada no momento em que é chamada. Ele permite que a função acesse propriedades e métodos do objeto ao qual está vinculada, sem recorrer ao contexto global, garantindo que a função trabalhe de forma encapsulada dentro do seu contexto.

## Arguments x Parameters

- **Parâmetros:** são variáveis declaradas na definição da função e servem como espaços reservados para os valores que a função irá utilizar.
- **Argumentos:** são os valores reais passados para a função no momento em que ela é chamada, sendo utilizados para preencher os parâmetros.

Exemplo:
```javascript
//parametro = item
function exemplo(item = 0) { 
    return ++item
}

exemplo()  // 1
//argumento = 4
exemplo(4) // 5
```

### Arguments
Um objeto especial disponível dentro de funções não arrow em JavaScript, que contém todos os argumentos passados para a função, independentemente de terem sido definidos como parâmetros.

O arguments era muito usado antes do ES6, mas não é considerado boa prática atualmente por vários motivos:
1. Não funciona em arrow functions (não possuem arguments).
2. Não é um array real (é um objeto parecido com array), o que dificulta o uso de métodos de array diretamente, exigindo conversões (Array.from(arguments), [...], etc.).
3. Menos legibilidade: usando rest parameters (...args) torna o código mais claro e explícito sobre a coleta de múltiplos argumentos.
4. Pode gerar bugs e confusão ao acessar índices manualmente, principalmente em funções com muitos argumentos opcionais.