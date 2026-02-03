#!/bin/bash
# Configure git for CI/CD environment
# Author: Hector Arrechea <hector.arrechea@ct.uneatlantico.es>

set -e

echo "=== Configuring Git ==="

# Configure git user
git config --global user.email "ci@${CI_SERVER_HOST:-gitlab.com}"
git config --global user.name "GitLab CI/CD"

# Setup authentication - Try different methods in order of preference
# 1. Project Access Token (recommended for write access)
if [ -n "$PROJECT_ACCESS_TOKEN" ] && [ -n "$CI_SERVER_HOST" ] && [ -n "$CI_PROJECT_PATH" ]; then
    SERVER_HOST="${CI_SERVER_HOST#https://}"
    git remote set-url origin "https://oauth2:${PROJECT_ACCESS_TOKEN}@${SERVER_HOST}/${CI_PROJECT_PATH}.git"
    echo "✓ Git remote configured with PROJECT_ACCESS_TOKEN"

# 2. Personal Access Token
elif [ -n "$GITLAB_TOKEN" ] && [ -n "$CI_SERVER_HOST" ] && [ -n "$CI_PROJECT_PATH" ]; then
    SERVER_HOST="${CI_SERVER_HOST#https://}"
    git remote set-url origin "https://oauth2:${GITLAB_TOKEN}@${SERVER_HOST}/${CI_PROJECT_PATH}.git"
    echo "✓ Git remote configured with GITLAB_TOKEN"

# 3. CI Job Token (limited permissions - may not work for push)
elif [ -n "$CI_JOB_TOKEN" ] && [ -n "$CI_SERVER_HOST" ] && [ -n "$CI_PROJECT_PATH" ]; then
    SERVER_HOST="${CI_SERVER_HOST#https://}"
    git remote set-url origin "https://gitlab-ci-token:${CI_JOB_TOKEN}@${SERVER_HOST}/${CI_PROJECT_PATH}.git"
    echo "✓ Git remote configured with CI_JOB_TOKEN"
    echo "⚠️  Note: CI_JOB_TOKEN may have limited write permissions"

else
    echo "⚠️  Warning: No authentication token found, using default git configuration"
    echo "   To enable tag creation, add one of the following variables:"
    echo "   - PROJECT_ACCESS_TOKEN (recommended)"
    echo "   - GITLAB_TOKEN"
fi

echo "✓ Git configuration complete"

