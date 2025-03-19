#!/bin/bash

# deploy.sh - Deployment script for the banking-gateway application

# Exit immediately if a command exits with a non-zero status
set -e

# Function to display usage information
usage() {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  -h, --help      Show this help message and exit"
  echo "  -e, --env       Set the environment (e.g., production, staging)"
  exit 1
}

# Parse command line arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    -h|--help) usage ;;
    -e|--env) ENVIRONMENT="$2"; shift ;;
    *) echo "Unknown parameter passed: $1"; usage ;;
  esac
  shift
done

# Check if environment is set
if [ -z "$ENVIRONMENT" ]; then
  echo "Error: Environment not specified"
  usage
fi

# Main deployment logic
deploy() {
  echo "Starting deployment to $ENVIRONMENT environment..."
  docker service update banking_gateway_app --force
  docker service update banking_gateway_listener --force
  echo "Deployment to $ENVIRONMENT environment completed successfully."
}

# Execute the deployment
deploy
