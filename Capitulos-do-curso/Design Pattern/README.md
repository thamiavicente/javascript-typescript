# Design Pattern
Design patterns são soluções reutilizáveis para problemas comuns de design de software. Eles ajudam a tornar o código mais organizado, flexível e fácil de manter.

## Facade
O padrão Facade é usado para simplificar a interface de um sistema complexo, criando uma "fachada" que esconde os detalhes de implementação das classes ou subsistemas internos. Ele pode ser usado para organizar chamadas, mas esse não é seu propósito principal — a organização é uma consequência da simplificação da interface.
Exemplo:
- Método startVideo()
  - chama loadPlayer()
  - chama loadUserData()
  - chama loadVideo()
  - chama playVideo()

## Builder
O Builder é um padrão de projeto criacional que tem como objetivo separar a construção de um objeto complexo da sua representação, permitindo que o mesmo processo de construção possa criar diferentes representações.

Ele é usado quando a criação de um objeto envolve múltiplas etapas ou muitos parâmetros opcionais, e seu processo de construção é encapsulado em um Builder, que fornece métodos passo a passo. Ao final da construção, um método como build() retorna o objeto finalizado. Esse padrão promove a imutabilidade e melhora a legibilidade do código, especialmente quando há muitos parâmetros envolvidos. Além disso, facilita a criação de diferentes versões ou configurações de um objeto, sem a necessidade de utilizar múltiplos construtores.

Exemplo:
- new User.setNome("User Name").setIdade(51).setEmail("username@email.com").build()
  
### Fluent API
A Fluent API tem como objetivo permitir chamadas encadeadas de métodos de forma clara e legível, facilitando a configuração de objetos ou a execução de processos em etapas. Essa abordagem evita variáveis intermediárias e torna o código mais expressivo e fluido.

Ela é frequentemente usada em conjunto com o padrão Builder, mas o foco da Fluent API está na forma de chamada dos métodos (encadeamento) e não necessariamente na construção de objetos. A principal diferença entre Fluent API e Builder é que a Fluent API pode ser aplicada em qualquer processo sequencial ou configuração fluida, enquanto o Builder é um padrão de projeto específico voltado para construção complexa de objetos passo a passo.
Exemplo: 
- new Person(personData).formatData().build()

### Diferenças
|Característica|Builder Pattern|Fluent API|
|-|-|-|
|Foco|Construção de objetos complexos|Encadeamento fluido de métodos|
|Método final|build() geralmente|Pode terminar com execute(), send(), etc.|
|Retorno principal|Um novo objeto configurado|A própria instância ou resultado do processo|
|Aplicações comuns|Objetos com muitos parâmetros|Configuração, requisições, pipelines, DSLs|

