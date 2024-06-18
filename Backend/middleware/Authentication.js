import express from "express";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "yyyyddd",
    resave: false,
    saveUninitialized: false,
  })
);

function auth(req, res, next) {
  if (req.query.admin === "true") {
    req.admin = true;
    next();
    return;
  }
  res.send("no auth");
}
export default auth;
