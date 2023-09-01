import * as AWS from 'aws-sdk';
import registerAs from './services';

AWS.config.update({
  accessKeyId: registerAs().accessKey,
  secretAccessKey: registerAs().secretAccessKey,
  region: registerAs().region,
});

export default {
  getAWSConfig: () => AWS,
  options: {
    key: registerAs().accessKey,
    secret: registerAs().secretAccessKey,
    bucket: registerAs().bucketName,
    region: registerAs().region,
  },
};
