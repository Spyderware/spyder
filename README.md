<div align="center">

# Spyder - Project Description

<br>
  
[![Commits](https://img.shields.io/github/commit-activity/w/Spyderware/spyder)](https://github.com/Spyderware/spyder/activity)
[![CI/CD](https://github.com/Spyderware/spyder/actions/workflows/proj-ci-cd.yaml/badge.svg)](https://github.com/Spyderware/spyder/actions)

</div>

Welcome to Spyder, the premier forum for developers dedicated to uncovering vulnerabilities within applications and frameworks. Dive deep into discussions, share insights, and collaborate on identifying potential security loopholes. Let's weave a web of knowledge and vigilance to ensure the digital world remains secure and resilient. Join Spyder today and become a guardian of cybersecurity!

## Project Resources:

[![Documentation](https://img.shields.io/badge/View-Project%20Documentation-blue?style=for-the-badge)](https://rockshopgraduate.atlassian.net/wiki/spaces/SWLC/pages)&ensp;

[![Project Management](https://img.shields.io/badge/View-Project%20Issue%20Board-blue?style=for-the-badge)](https://rockshopgraduate.atlassian.net/jira/software/projects/SWLU/boards/7)&ensp;


## Setup
1. Clone this repository to your local machine. 
   ```bash
   git clone https://github.com/bbd-grad-levelups/Documentation-Language-Translator/
   ```

2. Set up a role in your AWS account for this repository. Follow the instructions provided in the AWS Security Blog: [Use IAM Roles to Connect GitHub Actions to Actions in AWS](https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/).

3. Configure secret variables in the GitHub repository settings:
   - Go to Settings > Secrets and Variables.
   - Under Actions, set the secret variable "AWS_ASSUME_ROLE" to the ARN of your IAM role.

4. Setup Terraform
   - Setup local AWS auth for account
   - Navigate to bootstrap folder
   - Run "terraform init" and then "terraform apply"
   - Pipeline deploys the actual app

## Runing fully locally
This project uses .NET 8.

#### API
**Found in `DocumentationTranslator/WebServer`**

The .NET application sources an enviroment variables file for secrets. The required values are as follows:
```env
DocServer_ConnectionString = 
Server=<url>;Database=<db_name>;User Id=<username>;Password=<password>;
DocServer_TranslationAPIKey = <translation_key>
DocServer_WEB_audience = <web_oauth_id>
DocServer_CLI_audience = <cli_oauth_id>
DocServer_FileBucket = <bucket_name>
```

To run this, we can use `dotnet run` to run in the terminal.

#### Database
Requires a MS SQL Server database. You can set this up however you want, and choose your own username and password, as long as you set the env variables.
