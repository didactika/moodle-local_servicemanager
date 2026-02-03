#!/bin/bash
# Update sonar-project.properties with version from version.php
# Author: Hector Arrechea <hector.arrechea@ct.uneatlantico.es>

set -e

VERSION_FILE="${1:-version.php}"
SONAR_FILE="${2:-sonar-project.properties}"

echo "=== Updating SonarQube Project Version ==="

# Check if files exist
if [ ! -f "$VERSION_FILE" ]; then
    echo "❌ Error: $VERSION_FILE not found!"
    exit 1
fi

if [ ! -f "$SONAR_FILE" ]; then
    echo "❌ Error: $SONAR_FILE not found!"
    exit 1
fi

echo "✓ Files found"
echo ""

# Extract version from version.php
VERSION=$(grep -oP "\\\$plugin->version\s*=\s*\K[0-9]+" "$VERSION_FILE" || echo "")

if [ -z "$VERSION" ]; then
    echo "❌ Error: Could not extract version from $VERSION_FILE"
    exit 1
fi

echo "✓ Extracted version: $VERSION"

# Update sonar-project.properties
if grep -q "sonar.projectVersion=" "$SONAR_FILE"; then
    # Replace existing version
    sed -i "s/^sonar\.projectVersion=.*/sonar.projectVersion=$VERSION/" "$SONAR_FILE"
    echo "✓ Updated sonar.projectVersion to $VERSION"
else
    # Add version if not exists
    echo "sonar.projectVersion=$VERSION" >> "$SONAR_FILE"
    echo "✓ Added sonar.projectVersion=$VERSION"
fi

echo ""
echo "✅ SonarQube project version updated successfully"

# Show the updated line
echo ""
echo "Updated configuration:"
grep "sonar.projectVersion" "$SONAR_FILE"

