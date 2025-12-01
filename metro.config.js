import { getDefaultConfig } from 'expo/metro-config.js';


const config = getDefaultConfig(import.meta.dirname || __dirname);

// Add web-specific extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'];

// Enable symlinks
config.resolver.unstable_enableSymlinks = true;

// Add node_modules to watch folders
config.watchFolders = [import.meta.dirname || __dirname];

export default config;
