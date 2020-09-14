# Projeto Vizinhando
App em Angular para o projeto da disciplina cliente servidor CLiente Servidor


## DOCUMENTAÇÃO ANGULAR
https://angular.io/


## INSTALAÇÃO DO ANGULAR

FERRAMENTAS DO ANGULAR (para o computador)

Preparando o ambiente de trabalho Linux (para Widowns tirar o sudo):

instalar o npm: ```sudo apt install npm```

instalar o Angular CLI: ```sudo npm install -g @angular/cli```

verificar se foram instalados: 

Node: ```nodejs -v```

Gerenciador de pacotes NPM: ```npm -v```

Angular CLI: ```ng version```


Atualizar: 
    ```npm install -g npm```
ou 
    ```npm install```
ou
    ```ng update```

ou atualizar globalmente:
```
    npm uninstall --save-dev angular-cli
    npm install --save-dev @angular/cli@latest
    npm install
```

## COMPILANDO O PROJETO

https://github.com/Kleber2018/form.git

Na pasta do projeto executar o comando para instalar as dependencias:

    ```npm install```
    ```npm install firebase @angular/fire```
 
## EXECUÇÃO

Abre a aplicação no browser:
```ng serve```


## Git
    
**BAIXAR/CLONAR DO GIT**
    git clone https://github.com/Kleber2018/nome-projeto.gi

**EMPURRAR/COMMIT NO GIT**
Para add todas as alterações na lista de commit
    --PRIMEIRO
        git add *

        Montando o pacote de commit com comentário

        git commit -m "Comentário!" - feito pelo vc code



ssda
        ou

        confirma via VS code

    --SEGUNDO
        Puch empurrando para o Git

            git push https://github.com/Kleber2018/nome-projeto.git master

        Vai pedir usuário e senha do Git

**ALTERAR ORIGEM NO GIT**
    git remote set-url origin https://github.com/Kleber2018/nome-projeto.git

**ALTERAR PARA O BRANCH**
    git branch teste master

**MANUAL:**
    https://rogerdudler.github.io/git-guide/index.pt_BR.html


## COMPONENTES EXTERNOS

    Biblioteca Angular/fire para FIrebase:
        https://www.npmjs.com/package/@angular/fire

    TIME PICKER
    	https://www.npmjs.com/package/ngx-material-timepicker
 
 ## TEMPLATE

https://material.angular.io


 ## CONFIGURAÇÃO, BUILD E DEPLOY NO FIREBASE

Necessário ter instalado o Firebase Tools através de linha de comando
```npm install -g firebase-tools```

logando na conta:
    ```firebase login```

Configurando (Para caso preciso trocar a conta do Firebase, ver mais detalhes na documentação do Firebase):

  firebase init

    configurando:

      Hosting (escolhe com barra espaço, Enter confirma)

      Escolhe o diretório public (dist/pasta)

      Sigle-page: y

      Overwite index.html: n


DEPOIS DE CONFIGURADO O FIREBASE:

  ```ng build```

  ```firebase deploy```

