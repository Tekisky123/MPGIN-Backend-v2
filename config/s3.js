import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import multer from 'multer';

const s3Client = new S3Client({
  region: process.env.AWSS_REGION,
  credentials: {
    accessKeyId: process.env.AWSS_OPEN_KEY,
    secretAccessKey: process.env.AWSS_SEC_KEY
  }
});

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG/PNG images are allowed'));
    }
  }
});

export const uploadFileToS3 = async (file, folder = 'alumni') => {
  const params = {
    Bucket: process.env.AWSS_BUCKET_NAME,
    Key: `${folder}/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype
    // Removed ACL: 'public-read' since bucket doesn't allow ACLs
  };

  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params
    });

    const result = await parallelUploads3.done();
    return {
      url: `https://${process.env.AWSS_BUCKET_NAME}.s3.${process.env.AWSS_REGION}.amazonaws.com/${result.Key}`,
      key: result.Key
    };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

export const deleteFileFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWSS_BUCKET_NAME,
    Key: key
  };

  try {
    await s3Client.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error('Error deleting from S3:', error);
    throw error;
  }
};

export { s3Client };