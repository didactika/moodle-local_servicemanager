#!/bin/bash
# Verify that the tag was created successfully
# Author: Hector Arrechea <hector.arrechea@ct.uneatlantico.es>

set -e

echo "=== Verifying Tag Creation ==="

# Read tag name
if [ -z "$TAG_NAME" ]; then
    if [ -f "tag_name.txt" ]; then
        TAG_NAME=$(cat tag_name.txt)
    else
        echo "❌ Error: TAG_NAME not found!"
        exit 1
    fi
fi

echo "Verifying tag: $TAG_NAME"

# Fetch tags
git fetch --tags

# Check if tag exists
if git rev-parse "$TAG_NAME" >/dev/null 2>&1; then
    echo "✅ Tag '$TAG_NAME' verified successfully!"

    # Show tag information
    echo ""
    echo "Tag details:"
    git show "$TAG_NAME" --no-patch --format=medium

    exit 0
else
    echo "❌ Tag '$TAG_NAME' not found!"
    exit 1
fi
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

echo "✓ Version file exists"
echo ""
echo "=== Extracting version information ==="

# Extract release version
RELEASE=$(grep -oP "\\\$plugin->release\s*=\s*['\"]?\K[^'\";\s]+" "$VERSION_FILE" || echo "unknown")

# Extract maturity constant
MATURITY_CODE=$(grep -oP "\\\$plugin->maturity\s*=\s*\K[A-Z_]+" "$VERSION_FILE" || echo "")

# Convert maturity constant to lowercase string
case "$MATURITY_CODE" in
    "MATURITY_ALPHA")
        MATURITY="alpha"
        ;;
    "MATURITY_BETA")
        MATURITY="beta"
        ;;
    "MATURITY_RC")
        MATURITY="rc"
        ;;
    "MATURITY_STABLE")
        MATURITY="stable"
        ;;
    *)
        echo "❌ Error: Unknown maturity code: $MATURITY_CODE"
        exit 1
        ;;
esac

# Build tag name
if [ "$MATURITY" = "stable" ]; then
    TAG_NAME="v${RELEASE}"
else
    TAG_NAME="v${RELEASE}-${MATURITY}"
fi

echo "✓ Release: $RELEASE"
echo "✓ Maturity: $MATURITY ($MATURITY_CODE)"
echo "✓ Tag Name: $TAG_NAME"

# Save to dotenv file for GitLab CI
echo "RELEASE=$RELEASE" >> version.env
echo "MATURITY=$MATURITY" >> version.env
echo "TAG_NAME=$TAG_NAME" >> version.env

# Also save to individual files as backup
echo "$RELEASE" > release.txt
echo "$MATURITY" > maturity.txt
echo "$TAG_NAME" > tag_name.txt

echo ""
echo "✅ Version information extracted successfully"

