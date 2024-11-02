import { SES } from '@aws-sdk/client-ses';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { simpleParser } from 'mailparser';

const client = new S3Client();
const ses = new SES();
const toAddresses = ['YOUR_RECEIVER_EMAIL_1','YOUR_RECEIVER_EMAIL_2']; /// YOUR_RECEIVER_EMAIL_1 ..... YOUR_RECEIVER_EMAIL_N
const source = 'YOU_SENDER_EMAIL';


export const handler = async (event) => {
   const bucket = event.Records[0].s3.bucket.name;
   const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    const data = await getObject(bucket, key);
    const dataParsed = await simpleParser(data);
    const params = {
        Source: source,
        Destination: { ToAddresses: toAddresses },
        ReplyToAddresses: [dataParsed.from.value[0].address],
        Message: {
            Subject: {
                Data: dataParsed.subject,
            },
            Body: {
                Text: {
                    Data: dataParsed.text
                },
                Html: {
                    Data: dataParsed.textAsHtml
                },
            },
        },
    };
  
    try {
        await ses.sendEmail(params);
        console.log('Correo reenviado exitosamente');
    } catch (error) {
        console.error('Error al reenviar el correo:', error);
        throw error;
    }
};

function getObject (Bucket, Key) {
    return new Promise(async (resolve, reject) => {
      const getObjectCommand = new GetObjectCommand({ Bucket, Key })
  
      try {
        const response = await client.send(getObjectCommand)
        let responseDataChunks = [];
        response.Body.once('error', err => reject(err));
        response.Body.on('data', chunk => responseDataChunks.push(chunk));
        response.Body.once('end', () => resolve(responseDataChunks.join('')));
      } catch (err) {
        return reject(err)
      } 
    })
  }