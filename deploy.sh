#!/bin/sh

# Exit the script on any error
set -e

# Replace with your GitHub username and repository name
GITHUB_USERNAME="bash7325"
REPO_NAME="walk-o-clock"

# Build the project for production
ng build --configuration production --base-href "https://$GITHUB_USERNAME.github.io/$REPO_NAME/"

# Move to the dist folder
cd dist

# If your Angular project has a different folder name inside the `dist` folder,
# make sure to change to that folder instead
cd $REPO_NAME

# Initialize a new Git repository
git init

# Add all the files to the new Git repository
git add .

# Commit the changes
git commit -m "Automated GitHub Pages deployment"

# Add your remote repository using the SSH protocol
git remote add origin git@github.com:$GITHUB_USERNAME/$REPO_NAME.git

# Force-push the changes to the gh-pages branch of your remote repository
git push -u origin master:gh-pages --force

# Remove the dist folder
cd ../../
rm -rf dist

echo "Deployment completed successfully!"
