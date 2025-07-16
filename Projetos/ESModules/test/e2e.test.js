/* 1️⃣ Defina o objetivo do teste e2e
Verificar se a aplicação completa funciona como esperado do início ao fim.

No seu caso:

Inicia o terminal.

Recebe entrada do usuário.

Adiciona pessoa formatada na tabela.

Salva no repositório.

Sai ao digitar :q.

2️⃣ Escolha a ferramenta de e2e
Para CLI apps, você pode usar:

Mocha (com testes reais e mocks)

execa (executar o binário em um processo separado)

Node child_process para rodar seu arquivo CLI

Decida se irá simular entradas do usuário ou usar arquivos de input pré-definidos.

3️⃣ Configure ambiente isolado
Crie um arquivo de database de teste separado (ex: database.test.json) para não poluir dados reais.

Se necessário, ajuste package.json para rodar o script e2e separadamente.

Garanta que ao finalizar o teste o terminal seja fechado.

4️⃣ Simule entradas do usuário
Para testar o fluxo:

Simule entradas como se o usuário estivesse digitando no terminal.

Inclua valores válidos para gerar uma pessoa.

Inclua :q para finalizar o processo.

Valide se:

O console imprime a tabela corretamente.

O arquivo de repositório recebe os dados.

O processo fecha corretamente.

5️⃣ Valide os efeitos colaterais
Verifique:

Se os dados foram salvos corretamente no arquivo.

Se a tabela no terminal refletiu os dados inseridos.

Se o processo finalizou sem erros.

6️⃣ Limpeza após o teste
Remova ou limpe o arquivo de teste (database.test.json) ou use um mock de filesystem.

Restaure qualquer stub/mocks utilizados.

7️⃣ Execute e ajuste
Execute o teste e observe se:

O terminal não trava.

O fluxo ocorre sem erros.

A cobertura é registrada se desejar.

Resumo simplificado
✅ Defina o que testar (fluxo completo).
✅ Escolha ferramenta de execução (execa / child_process).
✅ Use banco de dados isolado.
✅ Simule entradas do usuário.
✅ Valide efeitos colaterais e prints.
✅ Limpe após o teste.
✅ Rode e ajuste se necessário.

 */