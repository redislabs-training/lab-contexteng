npm run build

# Copy doc assets to the built site
# Astro with hybrid output creates dist/client for static assets
cp -r ./doc/* ./dist/client/ 2>/dev/null || true

