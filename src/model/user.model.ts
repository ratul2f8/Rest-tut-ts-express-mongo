import config from "config";
import mongoose, { HookNextFunction } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//BCrypt Password
UserSchema.pre("save", async function (next: HookNextFunction) {
  let user = this as UserDocument;

  //bcrypt only if it wasn't updated before
  if (!user.isModified("password")) return next();

  //generate random initial data aka salt
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  //generate hashed password
  const hashedPassword = await bcrypt.hashSync(user.password, salt);

  //replace the password
  user.password = hashedPassword;

  return next();
});

//Use for logging in
UserSchema.methods.comparePassword = function (candidatePassword) {
  const user = this as UserDocument;
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((error) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
