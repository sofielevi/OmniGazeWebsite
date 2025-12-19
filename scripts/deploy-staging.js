#!/usr/bin/env node

/**
 * OmniGaze Website - Staging Deployment Script
 * Deploys to fingerscrossed.omnigaze.com via FTP
 *
 * Usage: npm run deploy:staging
 */

const FtpDeploy = require('ftp-deploy');
const path = require('path');
const { execSync } = require('child_process');

// FTP Configuration for staging
const FTP_CONFIG = {
  host: 'linux349.unoeuro.com',
  port: 21,
  user: 'fingerscrossed.com',
  password: 'xyfnwt9r3DeRHgF5AB2d',
  localRoot: path.join(__dirname, '..', 'out'),
  remoteRoot: '/public_html/',
  include: ['*', '**/*'],
  exclude: [
    '.git/**',
    '.git*',
    'node_modules/**',
    '.env*',
    '*.map'
  ],
  deleteRemote: true, // Clean deploy - removes old files
  forcePasv: true,    // Required for most shared hosts
  sftp: false
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  console.log(`\n${colors.cyan}[${step}]${colors.reset} ${colors.bright}${message}${colors.reset}`);
}

async function deploy() {
  const startTime = Date.now();

  console.log('\n' + '='.repeat(60));
  log('  OmniGaze Website - Staging Deployment', 'bright');
  log('  Target: fingerscrossed.omnigaze.com', 'yellow');
  console.log('='.repeat(60));

  try {
    // Step 1: Build the static site
    logStep('1/3', 'Building static site...');
    log('Running: STATIC_EXPORT=true npm run build', 'blue');

    execSync('npm run build', {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      env: {
        ...process.env,
        STATIC_EXPORT: 'true',
        NODE_ENV: 'production'
      }
    });

    log('Build completed successfully!', 'green');

    // Step 2: Verify build output
    logStep('2/3', 'Verifying build output...');
    const fs = require('fs');
    const outDir = path.join(__dirname, '..', 'out');

    if (!fs.existsSync(outDir)) {
      throw new Error('Build output directory "out" not found. Build may have failed.');
    }

    const files = fs.readdirSync(outDir);
    log(`Found ${files.length} items in build output`, 'green');

    // Step 3: Deploy via FTP
    logStep('3/3', 'Deploying to FTP server...');
    log(`Host: ${FTP_CONFIG.host}`, 'blue');
    log(`Remote path: ${FTP_CONFIG.remoteRoot}`, 'blue');

    const ftpDeploy = new FtpDeploy();

    // Progress tracking
    let uploadedCount = 0;
    let totalCount = 0;

    ftpDeploy.on('uploading', (data) => {
      totalCount = data.totalFilesCount;
      uploadedCount = data.transferredFileCount;
      const percent = Math.round((uploadedCount / totalCount) * 100);
      process.stdout.write(`\r  Uploading: ${uploadedCount}/${totalCount} files (${percent}%) - ${data.filename}`.padEnd(80));
    });

    ftpDeploy.on('uploaded', (data) => {
      // File uploaded
    });

    ftpDeploy.on('log', (data) => {
      // Verbose logging (disabled for cleaner output)
      // console.log(data);
    });

    await ftpDeploy.deploy(FTP_CONFIG);

    console.log('\n');
    log('Deployment completed successfully!', 'green');

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n' + '='.repeat(60));
    log('  Deployment Summary', 'bright');
    console.log('='.repeat(60));
    log(`  Status: SUCCESS`, 'green');
    log(`  Files uploaded: ${totalCount}`, 'blue');
    log(`  Duration: ${duration}s`, 'blue');
    log(`  URL: https://fingerscrossed.omnigaze.com`, 'yellow');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.log('\n');
    log('Deployment FAILED!', 'red');
    log(`Error: ${error.message}`, 'red');

    if (error.message.includes('Login')) {
      log('Check FTP credentials in scripts/deploy-staging.js', 'yellow');
    }

    process.exit(1);
  }
}

// Run deployment
deploy();
