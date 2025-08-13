# Fundamentos

## Exceções
São eventos inesperados que podem ocorrer durante a execução do código e, se não tratados corretamente, podem interromper a aplicação. Diferenciam-se de `erros` por serem recuperáveis (podem ser capturados e tratados), enquanto erros são geralmente irrecuperáveis (ex.: falta de memória).

### Propriedades
- **Tipo:** classe/identificação da exceção (ex.: `TypeError`).
- **Mensagem:** descrição legível do problema.
- **Causa:** motivo da exceção existir
- **Stack Trace (localização):** pilha de chamadas (métodos que foram executados) até o ponto do erro.
- **Propagação:** sobe pela pilha de chamadas até ser tratada ou a exceção ser interrompida 

### Encapsulamento em OOP
É possível criar o encapsulamento de exceções, permitindo o controle do tratamento da exceção assim como a escolha de como e onde ela será mostrada.

#### Características
- **Abstração de detalhes:** exibir mensagens amigáveis ao usuário, mantendo os detalhes técnicos visíveis apenas para os desenvolvedores 
- **Facilidade de manutenção:** com o tratamento centralizado é possível evitar a duplicidade de código e facilitando o gerenciamento de exceções (ex.: classe `ErrorHandler`)
- **Comunicação de alto nível:** tratar a exceção em camadas mais baixas, permitindo que somente as informações essenciais subam para os mais altos níveis
- **Segurança:** evitar vazamento de informações sensíveis (ex.: exibição de stack traces em produção).

#### JavaScript (try-catch)
Permite que o código execute normalmente em caso de não haver exceção (try) e possa executar o tratamento da exceção caso uma exceção apareça (catch).

```javascript
try {
// Código que pode lançar exceção
} catch (error) {
  console.error("Mensagem amigável:", error.message); // Tratamento
}
```

## Promises
É um objeto que representa a eventual conclusão (ou falha) de uma operação `assíncrona` e seu resultado. Seus estados possíveis são:
- **Pending:** Estado inicial (ainda não resolvido ou rejeitado).
- **Fulfilled:** Operação concluída com sucesso (`.then()` é acionado).
- **Rejected:** Operação falhou (`.catch()` é acionado).

### Estrutura
Recebe uma função executora com dois callbacks:
```javascript
new Promise((resolve, reject) => { ... })
```
- **`resolve(valor)`:** Finaliza com sucesso (muda para `fulfilled`).
- **`reject(motivo)`:** Rejeita a Promise (muda para `rejected`).

#### Métodos de Consumo
- **`.then()`:** Executado em caso de sucesso (recebe o valor de `resolve`).
- **`.catch()`:** Executado em caso de falha (recebe o motivo de `reject`).
- **`.finally()`:** Sempre executado ao final, independente do resultado.

#### Exemplo
```javascript
function catSound(isMad) {
  return new Promise((resolve, reject) => { 
    if (!isMad) resolve("puur");
    else reject("roar");
  });
}

//Existem várias maneiras de usar a promise:
//Usando métodos diretamente na promise
catSound(true)
  .then((sound) => console.log(sound))
  .catch((error) => console.log(error, "The cat is mad, give them food!"))
  .finally(() => console.log("Give them treat!"));

//Usando try-catch + async-await
async function handleCat() {
  try {
      const sound = await catSound(false);
      console.log(sound);
  } catch (error) {
      console.log(error);
  }
}
```
### Benefícios
- Melhora o fluxo de operações assíncronas (evita "callback hell").
- Facilita o tratamento de erros centralizado (com `.catch()`).

### Desafios
- **Complexidade assíncrona:** Mais complexidade ao código devido à ordem não linear.
- **Gestão de erros:** Requer mais atenção ao tratar erros, já que o erro deve estar no mesmo tempo de execução que seu tratamento.
- **Encadeamento complexo:** Deixa o fluxo da aplicação mais complexo e possivelmente mais confuso quanto mais encadeamentos houverem.
- **Promessas não nativas:** dependências legadas podem ter implementações diferentes para as promises, o que gera comportamentos inesperados.