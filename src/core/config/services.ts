import { registerAs } from '@nestjs/config';

// all third-party services' configurations to go here
export default registerAs('services', () => ({
  region: process.env.S3_BUCKET_REGION,
  accessKey: process.env.S3_BUCKET_ID,
  secretAccessKey: process.env.S3_BUCKET_KEY,
  bucketName: process.env.S3_BUCKET_NAME,
}));
