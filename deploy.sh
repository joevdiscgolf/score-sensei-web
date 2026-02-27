#!/bin/bash
# Deploy ScoreSensei website to Netlify
# Usage: ./deploy.sh [--preview]

set -e

cd "$(dirname "$0")"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Deploying ScoreSensei to Netlify...${NC}"

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Deploy based on flag
if [ "$1" == "--preview" ]; then
    echo -e "${BLUE}📝 Creating preview deploy...${NC}"
    netlify deploy --dir .
else
    echo -e "${BLUE}🌐 Deploying to production...${NC}"
    netlify deploy --prod --dir .
fi

echo -e "${GREEN}✅ Deploy complete!${NC}"
echo -e "${GREEN}🔗 https://scoresensei-landing.netlify.app${NC}"
