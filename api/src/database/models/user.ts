import {
  getModelForClass,
  DocumentType,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";

import config from "../../config/bcrypt";
import bcrypt from "bcrypt";

@pre<User>("save", async function () {
  if (!this.isModified("password")) return;
  const hash = await bcrypt.hash(this.password, config.salt);
  this.password = hash;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop({ required: true, unique: true, lowercase: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: false, default: 0 })
  actvityTime?: number;

  @prop({ required: false })
  firstName!: string;

  @prop({ required: false })
  lastName!: number;

  async validatePassword(candidatePassword: string) {
    try {
      console.log();
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (e) {
      console.log("could not compare password due to an unknown error");
    }
  }
}

export const UserModel = getModelForClass(User);
