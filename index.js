const express = require('express');
const fs = require('fs');
const app = express();
const dataFilePath = './users.json';

// Функция для чтения пользователей из файла
function readUsersFromFile() {
if (fs.existsSync(dataFilePath)) {
const data = fs.readFileSync(dataFilePath, 'utf8');
return JSON.parse(data) || [];
}
return [];
}

function writeUsersToFile(users) {
fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
}

// Обработчик для получения списка пользователей
app.get('/users', (req, res) => {
const users = readUsersFromFile();
res.json(users);
});


app.post('/users/create', (req, res) => {
const users = readUsersFromFile();
const newUser = req.body;

users.push(newUser);

writeUsersToFile(users);

res.sendStatus(200);
});


const port = 3000;

// Запускаем сервер
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});