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
   git clone https://github.com/Spyderware/spyder.git
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

This project uses NodeJS.

#### API

**Found in `spyder/api`**

1. Install Dependencies

```bash
npm install
```

2. Copy the `.env` file into the `api` directory
3. Run the API backend

```bash
npm run start:dev
```
