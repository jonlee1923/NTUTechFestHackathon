const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    //Controls which domains have access, * means any domain
    res.setHeader("Access-Control-Allow-Origin", "*");

    //Controls which headers are allowed and can be handled
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    //Controls which http methods are allowed
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/build")));

//     app.get("*", (req, res) =>
//         res.sendFile(
//             path.resolve(__dirname, "../", "frontend", "build", "index.html")
//         )
//     );
// } else {
//     app.get("/", (req, res) => res.send("Please set to production"));
// }

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
