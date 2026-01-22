#!/usr/bin/env node

/**
 * OmniGaze Website - Staging Deployment Script
 * Deploys to fingerscrossed.omnigaze.com via FTP
 *
 * Features:
 * - Incremental deployment: only uploads changed files
 * - Uses .ftp-deploy-sync-state.json to track file hashes
 * - Much faster deployments after initial sync
 *
 * Usage: npm run deploy:staging
 */

const { deploy } = require('@samkirkland/ftp-deploy');
const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// .htaccess for no-cache headers on installer
const HTACCESS_PATH = path.join(__dirname, 'install-folder', '.htaccess');

// State file location (tracks what's been deployed for incremental sync)
// Must be relative to cwd when running the script
const STATE_FILE = '.ftp-deploy-sync-state.json';

// FTP Configuration for staging
const FTP_CONFIG = {
  host: 'linux349.unoeuro.com',
  port: 21,
  user: 'fingerscrossed.com',
  password: 'xyfnwt9r3DeRHgF5AB2d'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  console.log(`\n${colors.cyan}[${step}]${colors.reset} ${colors.bright}${message}${colors.reset}`);
}

async function deployStaging() {
  const startTime = Date.now();

  console.log('\n' + '='.repeat(60));
  log('  OmniGaze Website - Staging Deployment', 'bright');
  log('  Target: fingerscrossed.omnigaze.com', 'yellow');
  log('  Mode: INCREMENTAL (only changed files uploaded)', 'green');
  console.log('='.repeat(60));

  try {
    // Step 1: Build the static site
    logStep('1/4', 'Building static site...');
    log('Running: STATIC_EXPORT=true npm run build', 'blue');

    execSync('npm run build', {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      env: {
        ...process.env,
        STATIC_EXPORT: 'true',
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_URL: 'https://api.omnigaze.com'
      }
    });

    log('Build completed successfully!', 'green');

    // Step 2: Verify build output
    logStep('2/4', 'Verifying build output...');
    const outDir = path.join(__dirname, '..', 'out');

    if (!fs.existsSync(outDir)) {
      throw new Error('Build output directory "out" not found. Build may have failed.');
    }

    // Count total files in output
    const countFiles = (dir) => {
      let count = 0;
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        if (item.isDirectory()) {
          count += countFiles(path.join(dir, item.name));
        } else {
          count++;
        }
      }
      return count;
    };
    const totalFiles = countFiles(outDir);
    log(`Found ${totalFiles} files in build output`, 'green');

    // Step 3: Deploy via FTP with incremental sync
    logStep('3/4', 'Deploying to FTP server (incremental sync)...');
    log(`Host: ${FTP_CONFIG.host}`, 'blue');
    log(`Remote path: /public_html/`, 'blue');
    log('Comparing local files with server state...', 'dim');

    // Track stats
    let uploadCount = 0;
    let deleteCount = 0;
    let skipCount = 0;

    await deploy({
      server: FTP_CONFIG.host,
      port: FTP_CONFIG.port,
      username: FTP_CONFIG.user,
      password: FTP_CONFIG.password,
      protocol: 'ftp',
      'local-dir': './out/',
      'server-dir': '/public_html/',
      'state-name': STATE_FILE,
      'dry-run': false,
      'dangerous-clean-slate': false, // Don't delete everything on first run
      timeout: 600000, // 10 minute timeout for large files (like video)
      exclude: [
        '.git/**',
        '.gitignore',
        'node_modules/**',
        '.env*',
        '*.map',
        '.DS_Store',
        'Thumbs.db',
        'install/**'  // Don't delete manually-uploaded installer files
      ],
      log: (message) => {
        // Parse log messages for stats
        if (message.includes('uploading:') || message.includes('Upload:')) {
          uploadCount++;
          const file = message.split(/uploading:|Upload:/)[1]?.trim() || '';
          process.stdout.write(`\r  Uploading: ${file}`.padEnd(80));
        } else if (message.includes('deleting:') || message.includes('Delete:')) {
          deleteCount++;
        } else if (message.includes('no changes')) {
          // No changes detected
        }
      }
    });

    console.log('\n');

    if (uploadCount === 0 && deleteCount === 0) {
      log('No changes detected - nothing to deploy!', 'green');
    } else {
      log(`Deployment completed! Uploaded ${uploadCount} files.`, 'green');
      if (deleteCount > 0) {
        log(`Removed ${deleteCount} obsolete files from server.`, 'yellow');
      }
    }

    // Step 4: Upload .htaccess files
    logStep('4/4', 'Uploading .htaccess files...');

    const client = new ftp.Client();
    try {
      await client.access({
        host: FTP_CONFIG.host,
        port: FTP_CONFIG.port,
        user: FTP_CONFIG.user,
        password: FTP_CONFIG.password,
        secure: false
      });

      // Upload root .htaccess for 404 and caching
      const rootHtaccess = path.join(outDir, '.htaccess');
      if (fs.existsSync(rootHtaccess)) {
        await client.uploadFrom(rootHtaccess, '/public_html/.htaccess');
        log('.htaccess uploaded to /public_html/', 'green');
      }

      // Upload installer .htaccess for no-cache headers
      if (fs.existsSync(HTACCESS_PATH)) {
        await client.ensureDir('/install');
        await client.uploadFrom(HTACCESS_PATH, '/install/.htaccess');
        log('.htaccess uploaded to /install/', 'green');
      }
    } finally {
      client.close();
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n' + '='.repeat(60));
    log('  Deployment Summary', 'bright');
    console.log('='.repeat(60));
    log(`  Status: SUCCESS`, 'green');
    log(`  Mode: Incremental`, 'blue');
    log(`  Files uploaded: ${uploadCount}`, 'blue');
    if (deleteCount > 0) {
      log(`  Files removed: ${deleteCount}`, 'yellow');
    }
    log(`  Duration: ${duration}s`, 'blue');
    log(`  URL: https://fingerscrossed.omnigaze.com`, 'yellow');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.log('\n');
    log('Deployment FAILED!', 'red');
    log(`Error: ${error.message}`, 'red');

    if (error.message.includes('Login') || error.message.includes('auth')) {
      log('Check FTP credentials in scripts/deploy-staging.js', 'yellow');
    }

    process.exit(1);
  }
}

// Run deployment
deployStaging();
