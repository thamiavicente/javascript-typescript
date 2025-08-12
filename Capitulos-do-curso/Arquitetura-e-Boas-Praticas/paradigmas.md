# Paradigmas

## Orientação a Objetos
É um paradigma de programação que organiza o código em objetos que são abstrações de entidades do mundo real, agrupando dados e comportamentos.
Entre as suas vantagens estão modularidade, flexibilidade, manutenibilidade e reutilização de código.

Os dois conceitos fundamentais da OO são:
- Classe: modelo que define as características (propriedades/atributos) e comportamentos (métodos/funções) de um tipo de objeto.
- Objeto: Exemplo concreto (instância) de uma classe

Os pilares da OO são:
- **Herança:** uma classe pode herdar atributos e métodos de outra classe, e partir daí alterar (sobrescrever) os métodos herdados e criar os seus próprios. Os métodos da classe mãe podem posteriormente serem acessados pela classe filha através do método super().
```javascript
class Animal {
    constructor(sound) {
        this.sound = sound
    }
}

class Cat extends Animal {
    constructor(sound, isMad) {
        super(sound)
        this.isMad = isMad
    }

    pet() {
        if(this.isMad) return 'roar'
        return 'pur'
    }
}
``` 
- **Encapsulamento:** os dados do objeto ficam protegidos (private) dentro da instancia e só podem ser modificados através de métodos específicos (como getters e setters).
```javascript
class Animal {
    constructor(sound) {
        //em código legado, pode-se ver
        //atributos e métodos privados
        //usando _ ao invés de #
        this.#sound = sound
    }

    getSound() {
        return this.#sound //não pode-se acessar sound diretamente
    }

    setSound(sound) {
        this.#sound = sound //e nem modificar diretamente
    }
}
``` 
- **Abstração:** a classe deve ser a forma simplificada do objeto do mundo real, mantendo as características importantes e ignorando os detalhes irrelevantes.
```javascript
class Animal() {
    constructor() { ... }
    addName() { ... }
    makeSound() { ... }
    pet() { ... }
    //nem todo animal pode-se acariciar, será que esse método é necessário?
}
``` 
- **Polimorfismo:** um mesmo método pode se comportar de maneira diferente em classes relacionadas (por herança ou interfaces).
```javascript
class Animal {
    makeSound() { throw new Error ('Add a sound method') }
}  

class Dog extends Animal {
    makeSound() { return "Au au!" }
} 

class Cat extends Animal {
    makeSound() { return "Miau!" }
}

const animals = [new Dog(), new Cat()] 
animals.forEach(animal => animal.makeSound()) // Saída diferente para cada classe
``` 

