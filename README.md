# Project Title

Sistemas de Matrículas MQLAB

## Getting Started

As instruções aqui descritas vão providenciar uma cópia funcional do projeto na própria máquina do usuário para motivos de testes.O sistema de matrículas sem uso de banco de dados é baseado apenas em retornar um relatório a cerca do aluno matriculado.

### Prerequisites

Para executar o projeto basta baixar os arquivos presentes no repositório, ter uma máquina conectada a internet e node.js instalado. Caso não possua o node na máquina basta fazer o download do pacote através do [site oficial](https://nodejs.org/en/). Além disso existem alguns modulos do node.js que devem ser instalados. Para isso deve-se acessar através da linha de comando, a partir da pasta root, a pasta server e em seguida executar a seguinte instrução. 

```
npm install --save express body-parser pdfkit string-pixel-width blob-stream
```

### Installing

A instalação consiste em apenas executar o download de todos os arquivos presentes neste repositório assim como dos pre-requisitos.

## Executing

Assim que todos os arquivos necessários estiverem na máquina local e os programas adicionais devidamente instalados deve-se então inicializar o servidor realizando os seguintes procedimentos. A partir da pasta root do projeto acesse, através da linha de comando, o diretorio denominado *server* e em seguida de um start no servidor, para isso os comandos necessários podem ser encontrados abaixo:

```
cd server

node server.js
```
Note que o servidor roda localmente fazendo uso da porta 3000, caso seja necessário alterar tal configuração acesse o arquivo *server.js* e altere, no fim do arquivo o número da porta a ser escutada pelo servidor. Esse arquivo pode ser encontrado dentro da mesma pasta anteriormente citada.

Em seguida deve-se executar também localmente o front end, para isso existem duas maneiras. A primeira delas consiste em usar um servidor como *XAMPP* ou *WAMPP* para executá-lo em localhost. A outra maneira é simplesmente abrir no navegador o arquivo denominado *index.js* encontrado dentro da pasta *layout*. Note também que caso seja necessário alterar a porta escutada pelo servidor a rota utilizada para a submissão do form deve ser também adaptada.

## Built With

* [Node.Js](https://nodejs.org/en/) - The web framework used
* [VueJS](https://vuejs.org/) - Web Framework utilizada

## Authors

* **Hiago Machado**    - [GitHub](https://github.com/HiagoMachado777/)
* **João Victor Tamm** - [GitHub](https://github.com/jvtamm)

## License

O projeto aqui presente está disponível apenas para fins de testes, não sendo autorizada a alteração do mesmo.


