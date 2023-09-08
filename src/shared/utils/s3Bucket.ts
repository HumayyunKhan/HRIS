import AWSService from '../../core/config/aws.config';
const AWS = AWSService.getAWSConfig();
import { v4 as uuidv4 } from 'uuid';
const uploadFile = async (_buffer: any, fileName: string) => {
  const s3 = new AWS.S3({
    
    credentials: {
      accessKeyId:process.env.S3_ACCESS_KEY,
      secretAccessKey:AWSService.options.secret,
    },
    region:process.env.S3_REGION,
    endpoint:process.env.S3_ENDPOINT
    
  
});
  const fileKey = uuidv4()

  return new Promise((resolve, reject) => {
    const params = {
      Bucket: AWSService.options.bucket,
      Key: fileKey,
      Body: _buffer,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(`Could'nt upload Files!!!!! ${err}`);
      }
      console.log(data);
      resolve(data.Location);
    });
  });
};
// async function uploadFileToS3(bucketName: string, file: any): Promise<string> {
//   const fileKey = uuidv4(); // Generate a unique key for the file

//   const params: AWS.S3.PutObjectRequest = {
//     Bucket: bucketName,
//     Key: fileKey,
//     Body: file.buffer,
//     ACL: 'public-read', // Optional: Set the file ACL (Access Control List) as per your requirement
//   };

//   return new Promise((resolve, reject) => {
//     this.s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
//       if (err) {
//         console.error('Error uploading file to S3:', err);
//         reject(err);
//       } else {
//         const s3Url = data.Location;
//         resolve(s3Url);
//       }
//     });
//   });
// }

const readFileAsSignedUrl = async (file: string) => {

  const s3 = new AWS.S3();
  const myBucket = AWSService.options.bucket;
  const myKey = file;
  const signedUrlExpireSeconds = 300;

  try {
    const url = await s3.getSignedUrl('getObject', {
      Bucket: myBucket,
      Key: myKey,
      Expires: signedUrlExpireSeconds
    });

    return { file: url, message: 'file retreived successfully!' };

  } catch (error) {
    throw { message: error };
  }
}

const readFileAsBase64 = async (fileName: string) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: AWSService.options.bucket,
    Key: fileName,
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      const pdfData = {
        src: '',
        error: false,
        message: '',
      };

      if (err) {
        pdfData.error = true;
        pdfData.message = 's3 error: ' + err;
        reject(pdfData);
      }
      if (data) {
        const base64String = data.Body.toString('base64');
        pdfData.src = base64String;
      }
      resolve(pdfData);
    });
  });
};

export { uploadFile, readFileAsBase64, readFileAsSignedUrl };
