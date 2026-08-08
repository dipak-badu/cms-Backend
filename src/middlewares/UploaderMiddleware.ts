import multer from "multer";
import type { Request } from "express";
import path from "node:path";
import fs from "fs";

const uploader = (dir: string = "/") => {
  // Define storage configuration for multer
  const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      try {
        const dirname = process.cwd();
        const filePath = path.join(dirname, `/public/uploads${dir}`);
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
        }
        cb(null, filePath);
      } catch (err) {
        cb(new Error("Failed to create directory") as any, "");
      }
    },

    filename: (req, file, cb) => {
      // const fileNamePifix = dir!=='/' ? dir.replace('/', '-'): "Uploads-";
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });
  // Define file validation configuration for multer
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    const ext = file.originalname.split(".").pop() as string;
    const allowedExts = ["jpg", "png", "svg", "bmp", "webp", "pdf"];
    if (allowedExts.includes(ext.toLocaleLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${ext} is not allowed`) as any, false);
    }
  };

  return multer({
    storage: myStorage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 3 * 1024 * 1024,
    },
  });
};

export default uploader;
