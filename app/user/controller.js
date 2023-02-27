import initDB from "../client.js";
import User from "./User.js";

const controller = {
  create(newUser) {
    return User.create(newUser);
  },
};

await initDB();

controller
  .create({ username: "John Doe", email: "john@gmail.com" })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err.message);
  });

export default controller;
