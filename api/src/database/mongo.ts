import Mongoose from "mongoose";
let database: Mongoose.Connection;

export const connect: any = async () => {
  const uri = "mongodb://localhost:27017/test";

  if (database) return;

  await Mongoose.connect(uri, {
    autoIndex: true,
  });
};
