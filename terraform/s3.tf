resource "aws_s3_bucket" "beanstalk_file_bucket" {
  bucket        = "spyder-file-storage"
  force_destroy = true
}