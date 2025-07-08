const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config(); // ✅ Load env variables

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS — MUST be at the top (and DO NOT override later)
app.use(
  cors({
    origin: "https://study-ease.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ DO NOT use this line — it overrides the correct CORS setup 👇
// app.options("*", cors()); ← ❌ REMOVE THIS LINE

// ✅ Optional: helpful CORS logger (after cors is set up)
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`CORS Check → ${req.method} ${req.originalUrl}`);
    console.log("Origin:", req.headers.origin);
    console.log("Sent Headers:", res.getHeaders());
  });
  next();
});

// ✅ Core Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ DB and Cloudinary Configs
const { cloudinaryConnect } = require("./Configuration/Cloudinary");
const database = require("./Configuration/Database");

cloudinaryConnect();
database.connect();

// ✅ All Routes
const userRoutes = require("./Route/User");
const profileRoutes = require("./Route/Profile");
const courseRoutes = require("./Route/Course");
const paymentRoutes = require("./Route/Payment");
const contactUsRoute = require("./Route/Contact");

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// ✅ Base route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to StudyEase" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ App is listening at ${PORT}`);
});
