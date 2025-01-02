const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dh2ylhkdw",
  api_key: "447231722485335",
  api_secret: "ksBSNCjPmBQVBWKdyACGOu6GFtA",
});

module.exports = cloudinary;
