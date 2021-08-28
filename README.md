# Tinder Like - Serverless Automation

Tired of liking over and over again on tinder, let lambda and event bridge do the work for you.
With this lambda function you will be able to auto like girls every 12 hours.

## How to setup

- Create an aws account and go to CloudFormation server, create an stack with `infra/stack.yml` yaml.
- It will ask you your email,password from facebook and the initial api key header of tinder as well the refresh token.
- Once the stack is created, fork this repo and modify the CI/CD pipeline to meet your aws credentials.
