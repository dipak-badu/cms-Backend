import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
    },
    path: {
      type: String,
    },
    size: {
      type: Number,
    },
    mimetype: {
      type: String,
    },
    type: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { _id: false },
);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },

    phone: String,

    address: {
      province: {
        type: String,
        enum: [
          "Koshi",
          "bagmati",
          "gandaki",
          "lumbini",
          "karnali",
          "sudurpaschim",
        ],
      },
      district: String,
    },

    image: {
      type: ImageSchema,
      required: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  },
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
