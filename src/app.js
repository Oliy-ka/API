const express = require('express');
const {users_router} = require("./routers/users.route");
const {HTTPStatus, PORT} = require("./constants");

const app = express();

app.use(express.json({
  verify: (req, res, buf, encoding) => {
    req.rawBody = buf.toString();
  }
}));

app.use('*', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/user', users_router);
app.use((req, res) => {
  res
    .status(HTTPStatus.NotFound.code)
    .json(HTTPStatus.NotFound)
    .end();
});


app.use((error, req, res, next) => {
  if (error) {
    res
      .status(HTTPStatus.InternalServerError.code)
      .json({error})
      .end()
  }
});

try {
  app.listen(PORT, (err) => {
    if (err) {
      return console.log(err);
    }

    return console.log(`server is listening on ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
