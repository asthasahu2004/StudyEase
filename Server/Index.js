const dotenv = require("dotenv");
dotenv.config(); // ✅ MUST come before anything uses process.env

const express = require("express");
const app = express();
const userRoutes = require("./Route/User");
const profileRoutes = require("./Route/Profile");
const courseRoutes = require("./Route/Course");
const paymentRoutes = require("./Route/Payment");
const contactUsRoute = require("./Route/Contact");
const database = require("./Configuration/Database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./Configuration/Cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

// ✅ CORS must be above all routes
app.use(
  cors({
    origin: "https://study-ease.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Connect DB
database.connect();

// ✅ Other middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Cloudinary
cloudinaryConnect();

// ✅ Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// ✅ Health check
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Welcome To StudyEase",
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
