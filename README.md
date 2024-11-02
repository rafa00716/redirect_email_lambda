# AWS Lambda S3 Email Forwarding

This project is an AWS Lambda function that automatically forwards emails stored in an S3 bucket to specified recipients using AWS SES (Simple Email Service). The Lambda function is triggered by an S3 event whenever a new email is stored in the designated S3 bucket.

## Prerequisites

- AWS account
- An S3 bucket to store incoming emails
- AWS SES (Simple Email Service) configured and verified email addresses
- Node.js runtime environment for Lambda (e.g., Node.js 18.x)

## Setup

### Step 1: Clone the Repository

Clone this repository to your local environment:

```sh
git clone https://github.com/rafa00716/redirect_email_lambda.git
```

### Step 2: Install Dependencies

Install the required dependencies:

```sh
npm install @aws-sdk/client-s3 @aws-sdk/client-ses mailparser
```

### Step 3: Update the Configuration

In the Lambda function code, update the following placeholders:

- `YOUR_RECEIVER_EMAIL_1`, `YOUR_RECEIVER_EMAIL_2`, ...: Add your recipient email addresses.
- `YOU_SENDER_EMAIL`: Add the email address from which the forwarded emails will be sent (must be verified in AWS SES).

### Step 4: Deploy to AWS Lambda

1. Zip your function code along with the `node_modules` folder:

   ```sh
   zip -r lambda.zip .
   ```

2. Deploy the zip file to AWS Lambda using the AWS Console or AWS CLI.

3. Set up a trigger for the Lambda function from the S3 bucket where the emails are stored. This will allow the Lambda function to execute whenever a new email is stored in the bucket.

### Step 5: Configure IAM Role

Ensure that the Lambda function has the appropriate IAM permissions:

- Access to read from the S3 bucket.
- Permissions to send emails using AWS SES.

## Usage

The Lambda function listens for S3 events. When a new email is added to the S3 bucket, it retrieves the email, parses it, and forwards it to the specified recipients using AWS SES.

## Code Overview

The code consists of the following parts:

1. **AWS SDK Clients Initialization**: Initializes the S3 and SES clients.
2. **Event Handler**: Main Lambda function that is triggered by an S3 event. It retrieves the email from S3 and forwards it via SES.
3. **`getObject` Function**: Utility function to read the email object from S3.

## Example Usage

This Lambda function is useful in scenarios where emails are received via an S3 bucket (e.g., using Amazon SES to receive emails and store them in S3), and need to be forwarded to other addresses automatically.

## License

This project is licensed under the MIT License.

