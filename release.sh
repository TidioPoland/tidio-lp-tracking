#!/bin/bash

# Release script for @TidioPoland/tidio-lp-tracking

set -e

# Check if version is provided
if [ -z "$1" ]; then
  echo "❌ Error: Please provide a version number"
  echo "Usage: ./release.sh <version>"
  echo "Example: ./release.sh 2.0.0"
  exit 1
fi

VERSION=$1

echo "🚀 Releasing @TidioPoland/tidio-lp-tracking v$VERSION"

# Validate version format (basic check)
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "❌ Error: Version must be in format x.y.z (e.g., 2.0.0)"
  exit 1
fi

# Update package.json version
echo "📝 Updating package.json version to $VERSION"
npm version $VERSION --no-git-tag-version

# Build the package
echo "🔨 Building package..."
npm run build

# Commit changes
echo "💾 Committing version bump..."
git add package.json
git commit -m "chore: bump version to v$VERSION"

# Create and push tag
echo "🏷️  Creating git tag v$VERSION"
git tag "v$VERSION"

# Push changes and tags
echo "⬆️  Pushing to remote..."
git push origin main
git push origin "v$VERSION"

echo "✅ Release v$VERSION complete!"
echo ""
echo "📦 To install this version:"
echo "npm install \"github:TidioPoland/tidio-lp-tracking#v$VERSION\""
echo ""
echo "📋 Add to package.json:"
echo "\"@TidioPoland/tidio-lp-tracking\": \"github:TidioPoland/tidio-lp-tracking#v$VERSION\""