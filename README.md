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
          
