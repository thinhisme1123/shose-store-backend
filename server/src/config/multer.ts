import multer from "multer";

const storage = multer.memoryStorage();
export const uploadProductImgaes = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});