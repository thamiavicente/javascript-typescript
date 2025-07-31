# Regex
São padrões usados para analisar, buscar, validar ou manipular strings com base em regras específicas. Elas permitem encontrar partes de texto que seguem um formato (ex.: e-mails, datas, números) sem precisar percorrer manualmente cada caracter.
Você pode usar o site [Regex 101](https://regex101.com/) para validar suas Regex ou obter mais informações sobre como montar uma Regex.

## [Projeto final](https://github.com/thamiavicente/javascript-typescript/tree/main/Capitulos-do-curso/Regex/Project-Regex)

## Parametros comuns
- **\\** = início da Regex OU sinaliza que o caracter a seguir é literal
- **{}** = quantificador `//{2} = pega 2 caracteres`
- **^** = indica o início da linha
- **$** = indica o final da linha para não pegar a próxima
- **[]** = pega os caracteres que são iguais aos dentro do colchete `//[-] pega todos os "-"`
- **d** = dígito de 0 a 9
- **w** = qualquer caracter que seja número ou letra [a-zA-Z0-9]
- **D & W** = indicam o contrário de d e w, ou seja, "D" é tudo que não é dígito e "W" é tudo que não é número ou letra
- **+** = seleciona de 1 a infinito caracter que dê match com o padrão passado
- **\s** = seleciona os espaços [\r\n\t\f\v]
- **()** = agrupa a seleção
- **.\*** = seleciona qualquer caracter de 0 a infinito
- **?** = a seleção deve encerrar quando achar o caracter a seguir `//?) encerra quando achar ")"`
- **|** = seleciona A OU B
- **(?<=)** = positive lookbehind -> seleciona o que vier depois do padrão que é passado `//(?<=[exemplo:]) pega o que vem depois de exemplo:`
- **(?!)** = negative lookahead -> ignora o que dá match com o padrão passado `//(?!\s{3}) ignora se a string recebida tem 2 espaços`
- **g** = global -> procura na string inteira, e não só pega o primeiro trecho a dar match com o padrão
- **m** = multiline -> procura em várias linhas
- **i** = insensitive -> ignora o case das letras

### Exemplos
**CPF** = ^\d{3}.\d{3}.\d{3}-\d{2}$ = 123.456.789-00
**Link de .md** = ^\[(.*?)\]\(([http|https].*?)\)$ = [Texto do link](http://link.com.br)