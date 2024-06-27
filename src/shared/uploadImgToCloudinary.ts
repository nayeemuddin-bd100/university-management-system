/* eslint-disable @typescript-eslint/no-unused-vars */
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import multer from "multer";
import config from "../config";
import ApiError from "../errors/ApiError";

export const uploadImgToCloudinary = async (
  imageName: string,
  file: string
) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret, // Click 'View Credentials' below to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(file, {
      folder: "UMS",
      public_id: imageName,
    })
    .catch((error) => {
      console.log(error);
      throw new ApiError(StatusCodes.BAD_REQUEST, "Image upload failed");
    });

  // delete a file after upload
  fs.unlink(file, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File is deleted.");
    }
  });

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url(imageName, {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  return uploadResult;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
