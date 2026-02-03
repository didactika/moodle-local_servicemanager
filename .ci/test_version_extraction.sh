#!/bin/bash
# Local testing script for version extraction
# Usage: ./test_version_extraction.sh

set -e

echo "=== Testing Version Extraction Locally ==="
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TAG_CONTROL_DIR="${SCRIPT_DIR}/tag-control"
VERSION_FILE="${SCRIPT_DIR}/../version.php"

# Check if scripts exist
if [ ! -d "$TAG_CONTROL_DIR" ]; then
    echo "❌ Error: tag-control directory not found!"
    echo "Expected: $TAG_CONTROL_DIR"
    exit 1
fi

if [ ! -f "${TAG_CONTROL_DIR}/validate_version.sh" ]; then
    echo "❌ Error: validate_version.sh not found!"
    exit 1
fi

# Make scripts executable
chmod +x "${TAG_CONTROL_DIR}"/*.sh

# Run validation script
echo "Running validate_version.sh..."
echo ""

cd "${SCRIPT_DIR}/.."  # Change to plugin root
bash "${TAG_CONTROL_DIR}/validate_version.sh" "${VERSION_FILE}"

echo ""
echo "=== Reading extracted information ==="
echo ""

# Read the extracted values
if [ -f "version.env" ]; then
    source version.env
    echo "From version.env:"
    echo "  RELEASE=$RELEASE"
    echo "  MATURITY=$MATURITY"
    echo "  TAG_NAME=$TAG_NAME"
else
    echo "⚠️  Warning: version.env not found"
fi

echo ""

# Check if tag exists locally
if [ -n "$TAG_NAME" ]; then
    if git rev-parse "$TAG_NAME" >/dev/null 2>&1; then
        echo "ℹ️  Tag '$TAG_NAME' already exists locally"
        echo ""
        echo "Tag details:"
        git show "$TAG_NAME" --no-patch --format=medium
    else
        echo "✓ Tag '$TAG_NAME' does not exist yet"
        echo ""
        echo "To create this tag locally, run:"
        echo "  git tag -a '$TAG_NAME' -m 'Release $TAG_NAME'"
        echo ""
        echo "To push to remote:"
        echo "  git push origin '$TAG_NAME'"
    fi
fi

echo ""
echo "=== Test Complete ==="

# Cleanup test artifacts
rm -f version.env release.txt maturity.txt tag_name.txt
echo "✓ Test artifacts cleaned up"


