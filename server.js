exports.handler = async (event) => {
    const AWS = require('aws-sdk');
    const moment = require('moment-timezone');
    const currentDate = moment().tz("Asia/Kolkata").format('MMMM DD');
    const s3 = new AWS.S3();
    const ses = new AWS.SES({region: process.env.REGION});
    const promise = new Promise(function(resolve, reject) {
        const params = {
            Bucket: event.Records[0].s3.bucket.name,
            Key: event.Records[0].s3.object.key,
        };
        s3.getObject(params, function(err, data) {
            if(err) {
                console.log("s3 file upload failed");
                reject(Error(err));
            } else {
                console.log(data);
                const sesParams = {
                    Destination: {
                        ToAddresses: process.env.EMAIL_RECIPIENT.split(',')
                    }, 
                    Message: {
                        Body: {
                            Html: {
                                Charset: "UTF-8", 
                                Data: data.Body.toString('utf-8')
                            }
                        }, 
                        Subject: {
                            Charset: "UTF-8", 
                            Data: "Status update - " + currentDate
                        }
                    }, 
                    Source: process.env.EMAIL_SENDER
                };
                ses.sendEmail(sesParams, function(err, data) {
                    if (err) {
                        console.log("Failed to Send Email");
                        reject(Error(err));
                    }
                    else {
                        console.log(data);
                        resolve(JSON.stringify(data));
                    }
                });
            }
        });
    });
    return promise;
};