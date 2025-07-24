# a partir da pasta atual, seleciona os arquivos teste
find . -name "*.test.js"

# não seleciona os arquivos de node_modules
find . -name "*.test.js" -not -path "*node_modules**"
find . -name "*.js" -not -path "*node_modules**"

# envia os arquivos para ipt
## instale o ipt -globalmente para ele funcionar da forma correta
find . -name "*.js" -not -path "*node_modules**" | ipt

# vamos adicionar "use strict" nos arquivos JS do projeto TDD
## 1. acha todos os arquivos que seja .js e não estejam em node_modules
## 2. seleciona os arquivos com o ipt
## 3. modifica os arquivos diretamente no disco,
## substituindo o início da primeira linha pelo CONTENT
## e quebra a linha
### sintaxe para linux
#### sem o ipt -o ele modifica todos os arquivos
CONTENT="'use strict';" 
find . -name "*.js" -not -path "*node_modules**" \
| ipt -o \
| xargs -I '{file}' sed -i -e "1s/^/$CONTENT\n/g" '{file}'
