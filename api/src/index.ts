import express from "express";

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
 * Middleware to let the application use Cross-Origin Resource Sharing
 * This essentially means that our website can run on a different
 * domain:port than what our API server is running at
 */
const app = express();
const port = 3000;

//Define request response in root URL (/)
app.get("/", function (req, res) {
  res.send("Hello World!");
});
//Launch listening server on port 3000
app.listen(port, function () {
  console.log("app listening on port ${port}!");
});
