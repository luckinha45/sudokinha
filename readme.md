# Sudokinha

Basicamente, um projeto que fiz por diversão e para me desafiar. Há um bom tempo tenho jogado Sudoku, em um belo dia surgiu uma ideia, uma vontade dentro de mim: e se eu fizesse o meu próprio Sudoku?

O meu interesse inicial era criar um render em HTML, CSS e Javascript de um jogo de Sudoku. Eu tentei também fazer a parte de geração do Sudoku em si, mas no fim acabei pegando de um projeto pré-existente, que credito no final desse README.

Fiquei bem satisfeito com o resultado final, meu forte não é desenvolvimento frontend, e fiquei bem surpreso com o que consegui fazer, definitivamente um dos projetos que mais me diverti desenvolvendo.

## Rodando
Para rodar o projeto, é necessário compilar o **Typescript** para **Javascript**, e rodar o projeto com um servidor HTTP.

### Typescript
Para compilar o **Typescript** isso é necessário ter instalado o compilador dele, é possível instalá-lo pelo comando no terminal:

``` npm intall typescript ```

Após a instalação do compilador, abra o terminal na pasta raiz do projeto e digite:

``` tsc ```

Se apareceu a pasta *dist* na raiz do projeto então deu tudo certo!

### Servidor HTTP
A forma mais fácil é utilizando a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) do Visual Studio Code. Basta instalar a extensão, abrir o vscode na pasta raiz e ativar a extensão.

Caso não possua o Visual Studio Code, também é possível rodar um Servidor HTTP utilizando python. Para isso, abra o terminal na raiz do projeto e digite o comando:

``` python -m http.server 5000```

Isso rodará o projeto no endereço *localhost/5000* caso a porta *5000* esteja livre. Basta acessar esse endereço para utilizar a aplicação!

## Crédito
**Udbhav Regadamilli:** Utilizei do repositório dele [Sudoku](https://github.com/Udbhav-regadamilli/Sudoku) o arquivo *sudoku.js*, desse arquivo utilizei apenas a função *generateSudoku* que é usada para gerar o Sudoku em si.
