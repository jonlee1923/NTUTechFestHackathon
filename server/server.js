const cors =require("cors");
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cors());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));


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
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/education", require("./routes/educationRoutes"));
app.use("/api/experience", require("./routes/expRoutes"));
app.use("/api/company", require("./routes/companyRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
