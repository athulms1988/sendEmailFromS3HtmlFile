# Send Email from html file inside an s3 bucket

This code works on the AWS Lambda running on Nodejs version 10.x. 

**Requirements**

AWS Account

1. Create a lambda function to execute the code
2. S3 Bucket to save the html file
3. SES to send the email

**Setup**

1. Clone the repo 
2. Run ```npm install```
3. Create a zip file by selecting ```server.js``` and the ```node_modules``` folder
4. Upload the package to your lambda function

**Environment Variables**

- ```EMAIL_RECIPIENT``` The recipient email (comma seperated)
- ```EMAIL_SENDER``` Sender Email
- ```REGION``` The region in which the SES is configured

**Permissions**

- Lambda should have the s3 object creation trigger enabled
- Lambda should have the permission to send email via SES
- Configure the handler name as ```server.handler```
- You will have to set up a timeout for lambda according to the content of the html file you are accessing
