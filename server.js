const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

/*
* делаем редирект, чтобы на любой роут возвращался index.html, например, когда пользователь входит по прямой ссылке
* или нажимает ф5
* */
app.get('*', (request, response) => {
    return response.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});
