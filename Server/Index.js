const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config(); // ✅ Must come before using PORT or any config

const cors = require("cors"); // ✅ Only import once
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// Routes
const userRoutes = require("./Route/User");
const profileRoutes = require("./Route/Profile");
const courseRoutes = require("./Route/Course");
const paymentRoutes = require("./Route/Payment");
const contactUsRoute = require("./Route/Contact");

// Configs
const database = require("./Configuration/Database");
const { cloudinaryConnect } = require("./Configuration/Cloudinary");

// ✅ CORS must come before any route or middleware
app.use(
  cors({
    origin: "https://study-ease.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse cookies and JSON
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connect services
database.connect();
cloudinaryConnect();

// Mount routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome To StudyEase" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
