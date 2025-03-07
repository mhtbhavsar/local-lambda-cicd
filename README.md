# multiple lambda functions deployment using aws, github CICD

## prerequisites
### AWS 
 - setup IAM user and create new user for lambda functions. Don't use root user.
 - created new role and add necessary permission to it ex. accessLambda
 - assign this accessLambda role to user, who is going to work on that
 - other users wont access until they get assign with same role
 - Create lambda functions from aws console OR aws cli by right clicking on lambda from AWS/explorer/lambda -> create lambda with template
 - user .github folder and make neccessary changes to add multiple lambda functions
 - push the code.
 - check github action if pipeline for deployment is running
### Github
 - create repo
 - add secrets for aws using settings->Secrets and variables->Actions->new repository secret
 - I removed my secrets.

#### Make sure other unneccesary files should not get pushed along with function
##### To make this project arn specific if dealing with different aws accounts and permission Follow next step and make some code changes

##### Add a Secret in GitHub
 - Go to GitHub Repository → Settings → Secrets and Variables → Actions
 - Click "New repository secret"
 - Name it: LAMBDA_FUNCTION_ARNS
 - Paste the JSON:

```
{
  "demoLambda1": "arn:aws:lambda:us-east-1:123456789012:function:demoLambda1",
  "demoLambda2": "arn:aws:lambda:us-east-1:123456789012:function:demoLambda2"
}
```
 - modify yml:
```
jobs:
  deploy:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        function: [demoLambda1, demoLambda2]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies (Monorepo)
        run: npm install

      - name: Get Lambda ARN from Secret
        id: get-arn
        run: |
          echo "LAMBDA_ARN=$(echo '${{ secrets.LAMBDA_FUNCTION_ARNS }}' | jq -r '."${{ matrix.function }}"')" >> $GITHUB_ENV

      - name: Zip Lambda function
        run: |
          cd ${{ matrix.function }}
          zip -r ../${{ matrix.function }}.zip . -x '*.git*' 'node_modules/*'

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to AWS Lambda
        run: |
          aws lambda update-function-code \
            --function-name $LAMBDA_ARN \
            --zip-file fileb://${{ matrix.function }}.zip

```
          
