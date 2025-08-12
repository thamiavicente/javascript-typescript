# Fundamentos

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