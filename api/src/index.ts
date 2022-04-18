import express, { Application } from "express";
import tedious from "tedious";
import { connect } from "./database/mongo";
import routeUsers from "./routes/user-route";
import cors from "cors";

const app: Application = express();

connect();
/***********************
 * Express Middlewares *
 ***********************/

/**
 * Middlewares happen between when express recieves a request
 * and when we get to know about and process it.
 *
 * E.g.
 * 1. Client Makes a request to this API server
 * 2. Express recieves the request.
 * 3. Express gets these middlewares to pre-process this request
 * 4. Express gets us to handle the request.
 * 5. We send a response to the client
 */

/**
 * Allow the application to parse the request body data type to be a json.
 * Before we recieve the request, we would like the data the client sent over
 * to be in a json.
 */
app.use(cors({ origin: true }));
app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const port = process.env.port || 3000;
const users = [];
app.use("/api/users", routeUsers);

//Launch listening server on port 3000
app.listen(port, function () {
  console.log(`app listening on port ${port}!`);
});
