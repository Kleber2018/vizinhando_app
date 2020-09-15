# Projeto Vizinhando
App em Angular para o projeto da disciplina cliente servidor CLiente Servidor


Desenvolvido por Kleber e Michel


O código não gerado automáticamentepelo framework está nas pastas 


src/app/user => usuário

src/app/ocurrence => ocorrências

src/app/authentication => login e authenticação



As funções utilizadas estão com comentário nós arquivos com os respectivos nomes:

(...)-form.(...).ts => se refere á formulários de cadastro e update

(...)-list.(..).ts => se refere a lista

(...).service.ts => se refere ao módulo de comunicação direta com o servidor


Nomes de arquivos com final:


.ts são das regras de back end do framework

.css são da estilização css do html daquele módulo

.html são do html da página com regras executadas no (...).component.ts

.spec.ts são criadas automatícamente pelo framework para criar políticas de teste












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

  ```ng build && firebase deploy```

