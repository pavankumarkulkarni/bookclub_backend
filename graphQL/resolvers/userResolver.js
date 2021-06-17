const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userResolvers = {
  Mutation: {
    register: async (_, { input }, { userCollection }) => {
      try {
        const { email, password, confirmPassword } = input;
        if (password !== confirmPassword) {
          throw new Error("password and confirm password don't match!");
        }
        if (password.length < 6) {
          throw new Error("password must be atleast 6 characters long!");
        }
        const passwordHash = await bcrypt.hash(input.password, 12);
        const newUser = new userCollection({
          email: input.email,
          password: passwordHash,
          name: input.email,
        });
        await newUser.save();
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async (_, { input }, { userCollection }) => {
      try {
        const { email, password } = input;
        const userInDB = await userCollection.findOne({ email: email });
        if (!userInDB) {
          throw new Error("Account not found");
        }
        const isCorrectPassword = await bcrypt.compare(
          password,
          userInDB.password
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect credentials!");
        }

        const token = await jwt.sign(
          { id: userInDB._id, email: userInDB.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return token;
      } catch (err) {
        throw new Error(err);
      }
    },
    updateDisplayName: async (_, { input }, { userCollection, me }) => {
      try {
        if (!me) {
          throw new Error("Login to update display Name");
        }
        const updatedUser = await userCollection.findOneAndUpdate(
          { _id: me.id },
          { $set: { name: input.name } },
          { new: true }
        );
        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = userResolvers;
