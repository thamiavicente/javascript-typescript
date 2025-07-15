# Testes automatizados
Existem três tipos principais de testes automatizados utilizados para garantir a qualidade do código:
- **Unit test** (teste unitário): verifica o funcionamento de uma unidade isolada do código, geralmente uma função ou método, garantindo que ela retorne os resultados esperados para diferentes entradas.
- **Integration test** (teste de integração): verifica se diferentes módulos ou componentes do sistema funcionam corretamente em conjunto, testando a interação entre eles.
- **Acceptance test ou Functional test** (teste de aceitação ou funcional): valida se a aplicação atende aos requisitos de negócio e funciona conforme o esperado do ponto de vista do usuário, simulando cenários reais de uso.

# TDD (Test-Driven Development)
Desenvolvimento orientado a testes é uma prática em que os testes são escritos antes da implementação da funcionalidade. O processo consiste em:

1. Escrever um teste que falhe (para a funcionalidade que se deseja implementar).
2. Escrever o código mínimo necessário para fazer o teste passar.
3. Refatorar o código, mantendo os testes passando.

Esse ciclo se repete até que a funcionalidade seja concluída.
O TDD ajuda a garantir alta cobertura de testes, código mais modular e maior confiança em futuras manutenções.

# BDD (Behavior-Driven Development)
Desenvolvimento orientado a comportamento foca em descrever o comportamento do sistema do ponto de vista do usuário ou do negócio, utilizando uma linguagem clara e compreensível para todas as partes envolvidas (desenvolvedores, QA, stakeholders).

No BDD, os testes são escritos em um formato que descreve o comportamento esperado em cenários específicos, por exemplo:

1. Dado que o usuário está logado,
2. Quando ele clica em “Finalizar compra”,
3. Então ele deve ver a tela de confirmação de pedido.

Essa prática facilita a colaboração, garantindo que o software faça o que o usuário espera, além de fornecer testes automatizados legíveis e alinhados aos requisitos de negócio.


# Referências:
[What’s the difference between Unit Testing, TDD and BDD?](https://codeutopia.net/blog/2015/03/01/unit-testing-tdd-and-bdd/)
[5 step method to make test-driven development and unit testing easy](https://codeutopia.net/blog/2016/10/10/5-step-method-to-make-test-driven-development-and-unit-testing-easy/)