#!/bin/bash

# Release script for @TidioPoland/tidio-lp-tracking (Option A — primary release path)

set -e

# Check if version is provided
if [ -z "$1" ]; then
  echo "❌ Error: Please provide a version number"
  echo "Usage: ./release.sh <version>"
  echo "Example: ./release.sh 0.2.2"
  exit 1
fi

VERSION=$1

echo "🚀 Releasing @TidioPoland/tidio-lp-tracking v$VERSION"

# Validate version format (basic check)
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "❌ Error: Version must be in format x.y.z (e.g., 0.2.2)"
  exit 1
fi

# Update package.json version (runs npm "version" script: build + git add dist)
echo "📝 Updating package.json version to $VERSION"
npm version "$VERSION" --no-git-tag-version

# Ensure dist matches the new version (npm "version" already built once)
echo "🔨 Building package..."
npm run build

# Stage version bump and compiled output (see package.json "version" script)
echo "💾 Committing version bump..."
git add package.json dist
git commit -m "chore: bump version to v$VERSION"

# Create and push tag
echo "🏷️  Creating git tag v$VERSION"
git tag "v$VERSION"

BRANCH=$(git branch --show-current)

echo "⬆️  Pushing branch and tag to origin..."
git push origin "$BRANCH"
git push origin "v$VERSION"

echo "✅ Release v$VERSION complete!"
echo ""
echo "📦 To install this version:"
echo "npm install \"github:TidioPoland/tidio-lp-tracking#v$VERSION\""
echo ""
echo "📋 Add to package.json:"
echo "\"@TidioPoland/tidio-lp-tracking\": \"github:TidioPoland/tidio-lp-tracking#v$VERSION\""
