const md5 = require("md5");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tblConf = require("../config/tablemanage");
const mainConf = require("../config");

// const AutoIncrement = require("mongoose-sequence")(mongoose);

const mainSchema = new Schema(
  {
    fname: { type: String },
    lname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permission: {
      type: Schema.Types.ObjectId,
      ref: tblConf.main_permission,
      default: mongoose.Types.ObjectId(mainConf.USERS.user),
    },
  },
  { timestamps: true }
);

mainSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.id = this._id;
    this.password = md5(this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});

mainSchema.methods.comparePassword = function (password) {
  return this.password == md5(password);
};

const sessionSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      ref: "users",
    },
    accessToken: {
      type: String,
    },
    permission: {
      type: String,
      ref: tblConf.main_permission,
    },
  },
  { timestamps: true }
);
const waitListSchema = new Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    work_email: {
      type: String
    },
    department: {
      type: String
    },
    typeface: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = {
  MainUser: mongoose.model(tblConf.users, mainSchema),
  Sessions: mongoose.model(tblConf.user_session, sessionSchema),
  WaitList: mongoose.model(tblConf.wait_list, waitListSchema)
};
