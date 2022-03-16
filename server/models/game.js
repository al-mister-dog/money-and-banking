const mongoose = require("mongoose");
// const crypto = require("crypto");

const gameSchema = new mongoose.Schema(
  {
    country: {
      type: {},
    },
    tradeBloc: {
      type: {},
    },
    alliance: {
      type: {}
    },
    governmentControl: {
      type: Number
    },
    userId: {
      type: String
    }
  },
  { timestamps: true }
);

// gameSchema
//   .virtual("password")
//   .set(function (password) {
//     // create a temporarity variable called _password
//     this._password = password;
//     // generate salt
//     this.salt = this.makeSalt();
//     // encryptPassword
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

// gameSchema.methods = {
//   authenticate: function (plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },

//   encryptPassword: function (password) {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha1", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },

//   makeSalt: function () {
//     return Math.round(new Date().valueOf() * Math.random()) + "";
//   },
// };

module.exports = mongoose.model("Game", gameSchema);
