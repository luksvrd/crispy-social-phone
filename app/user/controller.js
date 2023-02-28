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

    // User already have this friend?
    if (user.friends.includes(friendId)) {
      return;
    }

    // find the friend
    const friendUser = await User.findById(friendId);

    if (!user || !friendUser) {
      throw new Error("Invalid username or friendId");
    }

    // Add friend to users friends list
    user.friends.push(friendUser._id);

    // save user in db
    return user.save();
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
//   .updatedByAddingFriend("john", "63fe7d8f54167944abf0a843")
//   .then((update) => {
//     console.log(update);
//   })
//   .catch((err) => {
//     console.error(err.message);
//   });

export default controller;
