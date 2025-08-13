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

## SOLID
É um conjunto de 5 princípios de design de software que, quando aplicados, melhoram a arquitetura, flexibilidade, manutenção e clareza do código.
Alguns benefícios do SOLID são:
- **Código mais limpo**: Facilita leitura e manutenção.  
- **Menos bugs**: Reduz efeitos colaterais de mudanças.  
- **Escalável**: Novas funcionalidades são adicionadas sem refatorar tudo. 

### Single Responsibility Principle
Uma classe deve ter apenas um motivo para mudar, que pode ser traduzido como: cada classe deve ter uma única responsabilidade.
```javascript
// Ruim: Uma classe fazendo duas coisas (gerenciar usuário + enviar e-mail)  
class Usuario {  
    salvarUsuario() { ... }  
    enviarEmail() { ... }  
}  

// Bom: Separar responsabilidades  
class Usuario {
    salvarUsuario() { ... }
}

class EmailService {
    enviarEmail() { ... }
}  
```

### Open/Closed Principle
Entidades devem ser abertas para extensão, mas fechadas para modificação, sou seja, adicione novos comportamentos via herança ou interfaces, sem alterar o código existente.  
```javascript  
// Ruim: Modificar a classe para adicionar novas formas  
class CalculadoraArea {  
    calcularArea(quadrado) { ... }  
    // Adicionar novo método para Círculo → Quebra OCP!  
}  

// Bom: Usar interface (aberto para extensão)  
interface Forma { 
    calcularArea()
}

class Quadrado implements Forma { 
    calcularArea() { ... }
}

class Circulo implements Forma{ 
    calcularArea() { ... }
}
```

### Liskov Substitution Principle
Classes filhas devem poder substituir classes pai sem quebrar o sistema, sendo assim, subclasses devem respeitar o contrato da superclasse.  
```javascript 
// Ruim: Pato de borracha "quebra" o comportamento de Pato  
class Pato {  
    voar() { ... }
}  
class PatoDeBorracha extends Pato {  
    voar() { throw new Error("Não voa!"); } // Viola LSP!  
}  

// Bom: Criar hierarquias coerentes  
class PatoVoador extends Pato { voar() { ... } }  
class PatoDeBorracha extends Pato { voar() { /* nada */ } }  
```  

### Interface Segregation Principle
Clientes não devem ser forçados a depender de interfaces que não usam, então divida interfaces granulares em vez de uma "interface gigante".
```javascript
// Ruim: Interface "gordura"  
interface Animal {  
    comer();  
    voar(); // Pinguim não voa!  
}  

// Bom: Interfaces específicas  
interface Animal { comer(); }  
interface Voador { voar(); }  
class Pinguim implements Animal { ... }  
class Aguia implements Animal, Voador { ... }  
```  

### Dependency Inversion Principle
Dependa de abstrações, não de implementações concretas, para isso, use interfaces ou classes abstratas para desacoplar módulos.  
```javascript
// Ruim: Classe depende de MySQL diretamente  
class PedidoService {  
    #db: mySQLDatabase; // Acoplamento alto!  
}  

// Bom: Depender de uma abstração  
interface Database { salvar(); }  
class PedidoService {  
    #db: Database; // Pode ser MySQL, Oracle, etc.  
}  
```  

## Clean Code
Conjunto de práticas para escrever código legível, mantenível e eficiente.
- Nomenclatura Significativa
- Funções Pequenas e Únicas
- Comentários (Quando Usar/Avoid)
- Tratamento de Erros