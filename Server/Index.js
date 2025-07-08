const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config(); // ✅ FIRST

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORRECT CORS SETUP (place before everything else)
app.use(
  cors({
    origin: ["https://study-ease.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ REMAINING MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ CONNECT SERVICES
const { cloudinaryConnect } = require("./Configuration/Cloudinary");
const database = require("./Configuration/Database");

cloudinaryConnect();
database.connect();

// ✅ ROUTES
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

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to StudyEase" });
});

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
