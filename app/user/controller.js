// import initDB from "../client.js";
import User from "./User.js";

const controller = {
  // Assumed lowercase username
  create(newUser) {
    return User.create(newUser);
  },
  show(username) {
    return User.findOne({ username });
  },
  async updatedByAddingFriend(username, friendId) {
    // Find user
    const user = await this.show(username);
    // find the friend
    const friendUser = await User.findById(friendId);

    if (!user || !friendUser) {
      throw new Error("Invalid username or friendId");
    }

    user.addFriend(friendId);
  },
};

// await initDB();

// (Step #1) Run this code to create users

// console.log("Creating users");
// controller
//   .create({ username: "john", email: "john@gmail.com" })
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((err) => {
//     console.error(err.message);
//   });

// controller
//   .create({ username: "jane", email: "jane-friend@gmail.com" })
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((err) => {
//     console.error(err.message);
//   })
//   .finally(() => {
//     console.log("Done creating users. Comment this code out!");
//   });

// (Step #2) Run this code to add friends. Comment out the code above first! In updateByAddingFriend, you pass in the username of the user gaining a friend & the friends ID. So ("username", "friendsID")

// console.log("Adding friends");
// controller
//   .updatedByAddingFriend("john", "63ff88e3c9ee5403f6b7f582")
//   .then((update) => {
//     console.log(update);
//   })
//   .catch((err) => {
//     console.error(err.message);
//   })
//   .finally(() => {
//     console.log("Added friend to User!");
//   });

export default controller;
