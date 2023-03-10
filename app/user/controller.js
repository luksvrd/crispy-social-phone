// import initDB from "../db-client.js";
import User from "./User.js";

const controller = {
  // Assumed lowercase username
  create(newUser) {
    return User.create(newUser);
  },
  show(username) {
    return User.findOne({ username });
  },
  index() {
    return User.find({});
  },

  async updatedByAddingFriend(username, friendId) {
    // Find user
    const user = await this.show(username);
    // Does user already have this friend?
    if (user.friends.includes(friendId)) {
      throw new Error("User already has this friend");
    }
    // find the friend
    const friendUser = await User.findById(friendId);

    if (!user || !friendUser) {
      throw new Error("Invalid username or friendId");
    }

    user.friends.push(friendUser._id);
    // Save the user
    return user.save();
  },

  async deleteFriend(username, friendId) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error(`User ${username} not found`);
    }
    if (!user.friends.includes(friendId)) {
      throw new Error(`User ${username} doesn't have friend ${friendId}`);
    }
    user.friends = user.friends.filter(
      (id) => id.toString() !== friendId.toString()
    );
    await user.save();
    return user;
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
//   .create({ username: "jane", email: "jane@gmail.com" })
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
//   .updatedByAddingFriend("john", "63ffb93276a5a594544761c8")
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
