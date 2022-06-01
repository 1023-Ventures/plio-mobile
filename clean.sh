# react clean

find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
find . -name "dist" -type d -prune -exec rm -rf '{}' +

# C# clean

# find . -name "bin" -type d -prune -exec rm -rf '{}' +
# find . -name "obj" -type d -prune -exec rm -rf '{}' 