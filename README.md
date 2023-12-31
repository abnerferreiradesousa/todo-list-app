<h1 align="center">🚀 Bem vindo ao projeto Todo List App! 🚀</h1>

Deploy do projeto: https://todo-list-app-drab-beta.vercel.app/

<h3>💥 Rodando o projeto localmente via Docker </h3>

<details>
<summary><strong> Como? </strong></summary>  
<br/>
  
1. Clone o repositório com o comando:
  - `git clone git@github.com:abnerferreiradesousa/todo-list-app.git`;
    - Entre na pasta do repositório:
      - `cd todo-list-app`
    - Agora no arquivo `global.ts` faça a troca da URL sugerida no próprio arquivo:
      - `gedit todo-list-frontend-ivipcoin/src/app/global.ts`
      
2. Inicie a aplicação com o comando:
 - `docker-compose up --build`
   - *Obs: Este comando será responsável por criar três cointainers Docker: o primeiro para iniciar o banco de dados MongoDB, o segundo para iniciar o backend, e por fim, o terceiro para iniciar o frontend e disponilizar uma URL para acesso da aplicação, todo o processo levar alguns minutos quando feito pela primeira vez.*
  - Para parar os containers `docker-compose down`
3. Acesse a aplicação usando essa url `http://localhost:3000`.
   
</details>

<details>
  <summary><strong>Tecnologias utilizadas</strong></summary>
  <br/>
  
  <ul>
    <li>👉 TypeScript</li>
    <li>👉 React.js</li>
    <li>👉 Material UI</li>
    <li>👉 MongoDB</li>
    <li>👉 Node.js</li>
    <li>👉 Express.js</li>
    <li>👉 ODM Mongoose</li>
    <li>👉 Docker</li>
    <li>👉 Json Web Token</li>
    <li>👉 Mocha, Chai, Sinon, Jest para testes unitários.</li>
  </ul>

</details>

---

<h3>🗡️ Frontend (Opcional) </h3> 

<details>
<summary><strong> Login </strong></summary>  

  ![login](./images/foto5.png)

</details>

<details>
<summary><strong> Listagem de tarefas </strong></summary>  

  ![login](./images/foto3.png)

</details>

<details>
<summary><strong> Criar nova tarefa </strong></summary>  

  ![login](./images/foto7.png)

</details>

<details>
<summary><strong> Marcando tarefas como concluídas </strong></summary>  

  ![login](./images/foto4.png)

  ![login](./images/foto6.png)

</details>

---

<h3>✍️ Backend (Opcional) </h3>

Quer testar a API? Segue a documentação abaixo sobre como usá-lo. Deploy da API: https://todo-list-ofc.onrender.com

<details>

<summary><strong>Como usar cada rota?</strong></summary>  
</br>

[Rotas Documentadas](https://github.com/abnerferreiradesousa/todo-list-app/blob/main/todolist.md)

</details>

<details>

<summary><strong> Rodando Testes Unitários e Cobertura de Testes </strong></summary>  
</br>

1. Entra na pasta backend `cd todo-list-backend-ivipcoin`
2. Rodando Testes Unitários - `npm run test`.
3. Rodando Cobertura de Testes - `npm run test:coverage`.

</details>
