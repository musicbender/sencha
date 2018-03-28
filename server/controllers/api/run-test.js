import fs from 'fs';
import { AWS, S3_URL, S3_BUCKET, S3_BASEPATH } from '../../config';
import { getContentTypeByFile } from '../../util/util';

const s3 = new AWS.S3();

export const s3SendFile = (file, dest) => {
  const fileBuffer = fs.readFileSync(file);

  s3.putObject({
    ACL: 'private',
    Bucket: S3_BUCKET,
    Key: S3_BASEPATH + dest,
    Body: fileBuffer,
    ContentType: getContentTypeByFile(dest)
  }, (err, res) => {
    if (err) console.error(err);
    console.log(`sent to ${S3_BASEPATH + S3_BASEPATH + dest}`);
  });
}

export const s3GetLink = dest => {
  return `${S3_URL}${S3_BUCKET}/${S3_BASEPATH}${dest}`;
}
