const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware для обработки JSON
app.use(bodyParser.json());

// Пример данных
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

// Получить все элементы
app.get('/items', (req, res) => {
    res.json(items);
});

// Получить элемент по ID
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// Добавить новый элемент
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Обновить элемент по ID
app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);
    if (item) {
        item.name = req.body.name;
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// Удалить элемент по ID
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});