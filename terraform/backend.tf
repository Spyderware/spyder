terraform {
  backend "s3" {
    bucket         = "574836245203-state"
    key            = "state/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "574836245203-state"
  }
}