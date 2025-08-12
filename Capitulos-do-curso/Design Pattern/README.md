# Design Pattern
Design patterns são soluções reutilizáveis para problemas comuns de design de software, através de descrições e/ou templates que podem ser usados em diferentes situações. Eles ajudam a tornar o código mais organizado, flexível e fácil de manter.

## Padrões Criacionais
Controlam a forma como objetos são instanciados.
Subtipos: 
- Abstract Factory
- Builder
- Factory Method
- Object Pool
- Prototype
- Singleton

### Singleton
Garante uma única instância de uma classe.
```javascript
class Database {  
    private static Database instance;  
    private Database() {}  
    public static Database getInstance() {  
        if (instance == null) instance = new Database();  
        return instance;  
    }  
}
```

### Factory Method
Abstrai a instanciação de objetos, centralizando a criação em uma única classe (a "fábrica"), de forma a reduzir acoplamento, evitar repetição de código e facilitar a manutenção.

#### Connection Factory
Pode ser usada para criar conexões com o banco de dados sem expor os detalhes de configuração (como URL, usuário, senha, etc.).
```javascript
class ConnectionFactory {
  static getConnection(databaseType) {
    switch (databaseType) {
      case "MySQL":
        return { connect: () => console.log("Conectado ao MySQL") };
      case "PostgreSQL":
        return { connect: () => console.log("Conectado ao PostgreSQL") };
      default:
        throw new Error("Banco de dados não suportado.");
    }
  }
}

// Uso:
const mysqlConnection = ConnectionFactory.getConnection("MySQL");
mysqlConnection.connect(); // Saída: "Conectado ao MySQL"

const postgresConnection = ConnectionFactory.getConnection("PostgreSQL");
postgresConnection.connect(); // Saída: "Conectado ao PostgreSQL"
```

#### Divisão em Camadas
A `factory` pode ser usada em conjunto com a arquitetura de `N` camadas, assim como no [exemplo de Factory](https://github.com/thamiavicente/javascript-typescript/tree/main/Capitulos-do-curso/Design%20Pattern/creational/factory), onde há as seguintes camadas:
- **Repository:** Camada de acesso a dados (operações como save, findById, delete).
- **Service:** Camada de regras de negócio (cálculos, validações, decisões).
- **Dependency Injection (Injeção de Dependência)**: Padrão onde as dependências são fornecidas externamente (ex: via construtor).

### Builder
O Builder é um padrão de projeto criacional que tem como objetivo separar a construção de um objeto complexo da sua representação, permitindo que o mesmo processo de construção possa criar diferentes representações.

Ele é usado quando a criação de um objeto envolve múltiplas etapas ou muitos parâmetros opcionais, e seu processo de construção é encapsulado em um Builder, que fornece métodos passo a passo. Ao final da construção, um método como build() retorna o objeto finalizado. Esse padrão promove a imutabilidade e melhora a legibilidade do código, especialmente quando há muitos parâmetros envolvidos. Além disso, facilita a criação de diferentes versões ou configurações de um objeto, sem a necessidade de utilizar múltiplos construtores.

Exemplo:
- new User.setNome("User Name").setIdade(51).setEmail("username@email.com").build()
  
#### Fluent API
A Fluent API tem como objetivo permitir chamadas encadeadas de métodos de forma clara e legível, facilitando a configuração de objetos ou a execução de processos em etapas. Essa abordagem evita variáveis intermediárias e torna o código mais expressivo e fluido.

Ela é frequentemente usada em conjunto com o padrão Builder, mas o foco da Fluent API está na forma de chamada dos métodos (encadeamento) e não necessariamente na construção de objetos. A principal diferença entre Fluent API e Builder é que a Fluent API pode ser aplicada em qualquer processo sequencial ou configuração fluida, enquanto o Builder é um padrão de projeto específico voltado para construção complexa de objetos passo a passo.
Exemplo: 
- new Person(personData).formatData().build()

#### Diferenças
|Característica|Builder Pattern|Fluent API|
|-|-|-|
|Foco|Construção de objetos complexos|Encadeamento fluido de métodos|
|Método final|build() geralmente|Pode terminar com execute(), send(), etc.|
|Retorno principal|Um novo objeto configurado|A própria instância ou resultado do processo|
|Aplicações comuns|Objetos com muitos parâmetros|Configuração, requisições, pipelines, DSLs|

## Padrões Estruturais
Definem como classes e objetos são compostos para formar estruturas maiores.
Subtipos:
- Adapter
- Bridge
- Composite
- Decorator
- Facade
- Fly weight
- Private Class Data
- Proxy

### Facade
O padrão Facade é usado para simplificar a interface de um sistema complexo, criando uma "fachada" que esconde os detalhes de implementação das classes ou subsistemas internos. Ele pode ser usado para organizar chamadas, mas esse não é seu propósito principal — a organização é uma consequência da simplificação da interface.
Exemplo:
- Método startVideo()
  - chama loadPlayer()
  - chama loadUserData()
  - chama loadVideo()
  - chama playVideo()
  
### Adapter
Converte a interface de uma classe em outra interface esperada pelo cliente.  
```javascript 
// Adaptador para usar um player de MP3 como player de WAV  
class WAVPlayer { void playWAV() { ... } }  
class MP3ToWAVAdapter extends WAVPlayer {  
    private MP3Player mp3;  
    void playWAV() { mp3.playMP3(); }  
}  
```

### Decorator
Adiciona responsabilidades dinamicamente a um objeto.  
```javascript
class Cafe { double custo() { return 5.0; } }  
class CafeComLeite extends Cafe {  
    double custo() { return super.custo() + 2.0; }  
}  
```  

## Padrões Comportamentais
Gerenciam comunicação e distribuição de responsabilidades entre objetos.
Subtipos:
- Chain of Responsibility
- Command
- Interpreter
- Iterator
- Mediator
- Null Object
- Observer
- State
- Strategy
- Template Method
- Visitor

### Observer
Notifica objetos sobre mudanças em outro objeto.  
  ```java  
  class Sensor {  
      private List<Observer> observers = new ArrayList<>();  
      void addObserver(Observer o) { observers.add(o); }  
      void notificar() { for (Observer o : observers) o.update(); }  
  }  
  ```
### Strategy
Define uma família de algoritmos intercambiáveis.  
  ```java  
  interface PagamentoStrategy { void pagar(); }  
  class CartaoCredito implements PagamentoStrategy { void pagar() { ... } }  
  class PayPal implements PagamentoStrategy { void pagar() { ... } }  
  ```  

## Anti-pattern
São "soluções" que parecem boas à primeira vista, mas geram complexidade desnecessária, débito técnico ou ineficiência.  
**Exemplos:**
- **God Class**: Uma classe que faz tudo.  
- **Over-Engineering**: Soluções excessivamente complexas para problemas simples.
- **Spaghetti Code**: Código desorganizado, com lógica embaralhada e alta dependência entre módulos.  

## Orientação a Objetos

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
    void salvarUsuario() { ... }  
    void enviarEmail() { ... }  
}  

// Bom: Separar responsabilidades  
class Usuario { void salvarUsuario() { ... } }  
class EmailService { void enviarEmail() { ... } }  
```

### Open/Closed Principle
Entidades devem ser abertas para extensão, mas fechadas para modificação, sou seja, adicione novos comportamentos via herança ou interfaces, sem alterar o código existente.  
```javascript  
// Ruim: Modificar a classe para adicionar novas formas  
class CalculadoraArea {  
    double calcularArea(Quadrado q) { ... }  
    // Adicionar novo método para Círculo → Quebra OCP!  
}  

// Bom: Usar interface (aberto para extensão)  
interface Forma { double calcularArea(); }  
class Quadrado implements Forma { ... }  
class Circulo implements Forma { ... }  
```

### Liskov Substitution Principle
Classes filhas devem poder substituir classes pai sem quebrar o sistema, sendo assim, subclasses devem respeitar o contrato da superclasse.  
```javascript 
// Ruim: Pato de borracha "quebra" o comportamento de Pato  
class Pato {  
    void voar() { ... }  
}  
class PatoDeBorracha extends Pato {  
    void voar() { throw new Error("Não voa!"); } // Viola LSP!  
}  

// Bom: Criar hierarquias coerentes  
class PatoVoador extends Pato { void voar() { ... } }  
class PatoDeBorracha extends Pato { void voar() { /* nada */ } }  
```  

### Interface Segregation Principle
Clientes não devem ser forçados a depender de interfaces que não usam, então divida interfaces granulares em vez de uma "interface gigante".
```javascript
// Ruim: Interface "gordura"  
interface Animal {  
    void comer();  
    void voar(); // Pinguim não voa!  
}  

// Bom: Interfaces específicas  
interface Animal { void comer(); }  
interface Voador { void voar(); }  
class Pinguim implements Animal { ... }  
class Aguia implements Animal, Voador { ... }  
```  

### Dependency Inversion Principle
Dependa de abstrações, não de implementações concretas, para isso, use interfaces ou classes abstratas para desacoplar módulos.  
```javascript
// Ruim: Classe depende de MySQL diretamente  
class PedidoService {  
    private MySQLDatabase db; // Acoplamento alto!  
}  

// Bom: Depender de uma abstração  
interface Database { void salvar(); }  
class PedidoService {  
    private Database db; // Pode ser MySQL, Oracle, etc.  
}  
```  

## Clean Code
Conjunto de práticas para escrever código legível, mantenível e eficiente.
