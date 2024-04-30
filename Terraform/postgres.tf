module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.5.3"

  name = "main-vpc"
  cidr = "10.0.0.0/16"

  azs              = ["eu-west-1a", "eu-west-1b"]
  private_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets   = ["10.0.101.0/24", "10.0.102.0/24"]
  database_subnets = ["10.0.201.0/24", "10.0.202.0/24"]

  create_database_subnet_group           = true
  create_database_subnet_route_table     = true
  create_database_internet_gateway_route = true
  database_subnet_group_name             = "db-weblevelup"

  enable_dns_hostnames = true
  enable_dns_support   = true
}

resource "aws_security_group" "rds" {
  vpc_id = module.vpc.vpc_id
  ingress {
    description = "http access"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
variable "username" {
  type = string
}

variable "password" {
  type = string
  sensitive = true
}

resource "aws_db_instance" "default" {
  allocated_storage      = 20
  instance_class         = "db.t3.micro"
  identifier             = "spyderware"
  db_name                = "spyderdb"
  engine                 = "postgres"
  db_subnet_group_name = module.vpc.database_subnet_group_name
  publicly_accessible    = true
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.rds.id]
  username               = var.username
  password               = var.password
}