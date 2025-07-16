# ECMAScript

## ES Modules
São o sistema de módulos oficial do JavaScript, introduzido no ES6, permitindo importar e exportar código entre arquivos usando import e export, facilitando a organização, reutilização e otimização de projetos em JavaScript.

**Pontos importantes**
- Suporte oficial pelo ECMAScript.
- Carregamento assíncrono em navegadores.
- Suporte a tree-shaking (importação apenas do que é utilizado, eliminando código morto em bundlers).
- Scope próprio, evitando poluição do escopo global.
- Sempre executados em strict mode automaticamente.
- Utilização: coloque `.mjs` no tipo do arquivo OU configure "type": "module" no package.json.

### Common JS X ES Modules
|Característica|CommonJS (require)|ES Modules (import/export)|
|-|-|-|
|Carregamento|Síncrono|Assíncrono|
|Suporte oficial em JS|Não (é Node-specific)|Sim (ECMAScript)|
|Sintaxe|require, module.exports|import, export|
|Tree-shaking|Não|Sim|
|`this` no topo do módulo|{}|undefined|

### Modos de importação e exportação no JS:
#### Module.export -> ES Modules
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
#### Export -> Common JS
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

### Intl
Intl é um namespace global que fornece construtores e funções para formatar dados de forma internacionalizada em JavaScript, utilizando regras específicas de idiomas e países para datas, números, moedas e listas.

[Mais informações](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

## Referências
[Modules: ECMAScript modules](https://nodejs.org/api/esm.html)

[ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
