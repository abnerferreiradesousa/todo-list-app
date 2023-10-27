require("dotenv").config();

export const TODO_API_URI = process.env.TODO_API_URI || 'https://todo-list-ofc.onrender.com';


// Se usar Docker troque a URL acima à direita por essa: 'http://localhost:8000'