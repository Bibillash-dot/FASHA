// Sticker helper (image -> webp) using ffmpeg/imagemagick externally
// For Termux: ensure ffmpeg and imagemagick are installed
const { exec } = require('child_process');
module.exports = {
  async imageToSticker(inputPath, outputPath) {
    // example ffmpeg command to convert
    // ffmpeg -i input.jpg -vcodec libwebp -filter:v "scale=512:512:force_original_aspect_ratio=decrease" -lossless 1 -qscale 75 -preset default output.webp
    return new Promise((res, rej) => {
      const cmd = `ffmpeg -i "${inputPath}" -vcodec libwebp -filter:v "scale=512:512:force_original_aspect_ratio=decrease" -lossless 1 -qscale 75 -preset default "${outputPath}"`;
      exec(cmd, (e, so, se) => e ? rej(se || e) : res(outputPath));
    });
  }
};
