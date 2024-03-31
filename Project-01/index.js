const express = require("express");
const app = express();
const port = 8000;

const fs = require('fs');

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    fs.appendFile("./log.txt", `${Date.now()} : ${req.method} : ${req.path}\n`, (err, data) => {
        next();
    })
    // return res.json({ message: "hello from middleware 1" });
    // next();
})

app.use((req, res, next) => {
    console.log("Hello from middleware 2");
    // return res.json({ message: "hello from middleware 2" });
    next();
})

const users = require('./MOCK_DATA.json');

app.get('/', (req, res) => {
    return res.send('Mock API');
})

// server side rendering
app.get('/html/users', (req, res) => {
    const html = `
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    `
    res.send(html);
})

// hybrid - good practice
// Routes
// REST API
app.get('/users', (req, res) => {
    // always add X to custom headers
    // res.setHeader('X-myName', 'Nirob');
    return res.json(users);
})

// app.route('/users/:id').get((req, res) => {
//     // TODO: Get the user
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// }).patch((req, res) => {
//     // TODO: Edit the user
// }).delete((req, res) => {
//     // TODO: Delete the user
// })

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})

app.post('/users', (req, res) => {
    // TODO: Create a new user
    const body = req.body;
    // console.log(body);
    users.push({...body,id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ message: 'User creation success', id: users.length + 1 });
    })
    // res.json({ message: 'User creation pending' });
})

// app.patch('/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     // TODO: Edit the user
//     res.json({ message: 'User update pending' });
// })

// app.delete('/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     // TODO: Delete the user
//     res.json({ message: 'User deletion pending' });
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})