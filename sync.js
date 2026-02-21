const fs = require('fs');
const path = require('path');

const SOURCE_DIR = __dirname;
const TARGET_DIR = 'C:/Users/HP PC/OneDrive/Desktop/Git Projects/anvil/anvil-extensions/galactic-sdk';

const syncItems = [
    { src: 'sdk-source', dest: 'SDK-Source' },
    { src: 'sdk', dest: 'SDK-Documentations' },
    { src: 'authentication.mdx', dest: 'authentication.mdx' },
    { src: 'quickstart.mdx', dest: 'quick-start.mdx' },
    { src: 'custom-integrations.mdx', dest: 'custom-integrations.mdx' }
];

/**
 * Recursively copies a directory or file.
 */
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        // Ensure parent directory exists for files
        const parentDir = path.dirname(dest);
        if (!fs.existsSync(parentDir)) {
            fs.mkdirSync(parentDir, { recursive: true });
        }
        fs.copyFileSync(src, dest);
    }
}

function sync() {
    console.log(`[${new Date().toLocaleTimeString()}] Starting sync...`);

    if (!fs.existsSync(TARGET_DIR)) {
        console.log(`Creating target directory: ${TARGET_DIR}`);
        fs.mkdirSync(TARGET_DIR, { recursive: true });
    }

    syncItems.forEach(item => {
        const srcPath = path.join(SOURCE_DIR, item.src);
        const destPath = path.join(TARGET_DIR, item.dest);

        if (fs.existsSync(srcPath)) {
            try {
                console.log(`Syncing ${item.src} -> ${item.dest}`);
                copyRecursiveSync(srcPath, destPath);
            } catch (err) {
                console.error(`Error syncing ${item.src}: ${err.message}`);
            }
        } else {
            console.warn(`Source item not found: ${srcPath}`);
        }
    });

    console.log('Sync completed successfully!');
}

// Watcher timeout storage
let syncTimeout;

// Check if we should watch
if (process.argv.includes('--watch')) {
    console.log('Watching for changes in GC-docs...');
    sync(); // Initial sync

    // Watch directories and files
    syncItems.forEach(item => {
        const watchPath = path.join(SOURCE_DIR, item.src);
        if (fs.existsSync(watchPath)) {
            fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
                // Debounce sync to avoid multiple triggers for single changes
                if (syncTimeout) clearTimeout(syncTimeout);
                syncTimeout = setTimeout(() => {
                    console.log(`Change detected in ${item.src}${filename ? ': ' + filename : ''}`);
                    sync();
                }, 300);
            });
        }
    });
} else {
    sync();
}
