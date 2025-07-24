# Regex
São padrões usados para analisar, buscar, validar ou manipular strings com base em regras específicas. Elas permitem encontrar partes de texto que seguem um formato (ex.: e-mails, datas, números) sem precisar percorrer manualmente cada caracter.
Você pode usar o site [Regex 101](https://regex101.com/) para validar suas Regex ou obter mais informações sobre como montar uma Regex.

## Parametros comuns
- **\\**= início da Regex OU sinaliza que o caracter a seguir é literal
- **d**= dígito de 0 a 9
- **{}** = quantificador `//{2} = pega 2 caracteres`
- **^**= indica o início da linha
- **$**= indica o final da linha para não pegar a próxima
- **[]** = pega os caracteres que são iguais aos dentro do colchete `//[-] pega todos os "-"`
- **w**= qualquer caracter que seja número ou letra [a-zA-Z0-9]
- **+**= seleciona de 1 a infinito caracter que dê match com o padrão passado
- **\s** = seleciona os espaços [\r\n\t\f\v]
- **()** = agrupa a seleção
- **.\*** = seleciona qualquer caracter de 0 a infinito
- **?** = a seleção deve encerrar quando achar o caracter a seguir `//?) encerra quando achar ")"`
- **|** = seleciona A OU B

### Exemplos
**CPF** = ^\d{3}.\d{3}.\d{3}-\d{2}$ = 123.456.789-00
**Link de .md** = \[(.*?)\]\(([http|https].*?)\) = [Texto do link](http://link.com.br)