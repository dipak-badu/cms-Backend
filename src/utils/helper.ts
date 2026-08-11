import { appConfig } from "../config/appConfig";
export const ImageMapper = (file: Express.Multer.File) => {
  return {
    filename: file.filename,
    path: file.path,
    type: file.mimetype,
    size: file.size,
    url: `${appConfig.assetUrl}/${file.filename}`,
  };
};
