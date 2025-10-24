import { v2 as cloudnary } from "cloudinary";

cloudnary.config({
  cloud_name: process.env.CLOUCNARY,
  api_key: process.env.CLOUDN_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default cloudnary;
