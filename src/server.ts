//! this is an http server
import http from "http";
import app from "./app";

// const PORT: number = parseInt(process.env.PORT|| 9005 , 10)
const PORT: number = 9005;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop the server.");
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Please choose a different port.`,
    );
  } else {
    console.error("Server Error: ", err.message);
  }
  process.exit(1);
});

//!server using express
