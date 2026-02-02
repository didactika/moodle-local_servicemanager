#!/bin/bash
# Validate and extract version information from version.php
# Author: Hector Arrechea <hector.arrechea@ct.uneatlantico.es>

set -e

VERSION_FILE="${1:-version.php}"

echo "=== Validating version.php ==="

# Check if file exists
if [ ! -f "$VERSION_FILE" ]; then
    echo "❌ Error: $VERSION_FILE not found!"
    exit 1
fi

echo "✓ File found: $VERSION_FILE"
echo ""

# Extract version (YYYYMMDDXX format)
RELEASE=$(grep "plugin->release" "$VERSION_FILE" | sed -E "s/.*['\"]([^'\"]+)['\"].*/\1/")

# Extract maturity (MATURITY_ALPHA, MATURITY_BETA, MATURITY_RC, MATURITY_STABLE)
MATURITY=$(grep "plugin->maturity" "$VERSION_FILE" | sed -E "s/.*=\s*(MATURITY_[A-Z]+).*/\1/")

# Validate extracted data
if [ -z "$RELEASE" ]; then
    echo "❌ Error: Could not extract release version from $VERSION_FILE"
    exit 1
fi

if [ -z "$MATURITY" ]; then
    echo "❌ Error: Could not extract maturity from $VERSION_FILE"
    exit 1
fi

echo "📦 Release: $RELEASE"
echo "🏷️  Maturity: $MATURITY"

# Convert maturity to tag suffix
case "$MATURITY" in
    "MATURITY_ALPHA")
        MATURITY_TAG="alpha"
        ;;
    "MATURITY_BETA")
        MATURITY_TAG="beta"
        ;;
    "MATURITY_RC")
        MATURITY_TAG="rc"
        ;;
    "MATURITY_STABLE")
        MATURITY_TAG="stable"
        ;;
    *)
        echo "❌ Error: Unknown maturity level: $MATURITY"
        exit 1
        ;;
esac

# Create tag name
TAG_NAME="v${RELEASE}-${MATURITY_TAG}"

echo "🔖 Tag name: $TAG_NAME"
echo ""

# Save to files for artifact passing
echo "$RELEASE" > release.txt
echo "$MATURITY" > maturity.txt
echo "$TAG_NAME" > tag_name.txt

# Create dotenv file for GitLab CI variables
cat > version.env << EOF
RELEASE=$RELEASE
MATURITY=$MATURITY
TAG_NAME=$TAG_NAME
EOF

echo "✅ Version validation complete!"
echo ""
echo "Artifact files created:"
echo "  - release.txt"
echo "  - maturity.txt"
echo "  - tag_name.txt"
echo "  - version.env"

