const express = require('express');
const serveStatic = require('serve-static');
const secure = require('express-force-https');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

app.use(secure)
app.use(serveStatic(path.join(__dirname, 'dist')));
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port);

console.log('[SUCCESS] Server started on port ' + port);
