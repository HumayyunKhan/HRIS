import AWSService from '../../core/config/aws.config';
const AWS = AWSService.getAWSConfig();

const uploadFile = async (_buffer: any, fileName: string) => {
  const s3 = new AWS.S3();

  return new Promise((resolve, reject) => {
    const params = {
      Bucket: AWSService.options.bucket,
      Key: fileName,
      Body: _buffer,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(`Could'nt upload Files!!!!! ${err}`);
      }
      console.log(data.Location);
      resolve(data.Location);
    });
  });
};

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
