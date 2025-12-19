#!/usr/bin/env node

/**
 * OmniGaze Installer Upload Script
 * Uploads the latest installer from OmniGazeRoot/Output to the main site FTP
 *
 * Usage: node scripts/upload-installer.js
 *
 * Prerequisites:
 * - npm install basic-ftp
 * - Installer must exist at F:\RootContext\OmniGazeRoot\Output\OmniGazeSetup.exe
 */

const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

// FTP Configuration for main omnigaze.com site
const FTP_CONFIG = {
  host: 'linux349.unoeuro.com',
  port: 21,
  user: 'omnigaze.com',
  password: 'xyfnwt9r3DeRHgF5AB2d', // Same password as staging
  secure: false
};

// Paths
const LOCAL_INSTALLER_PATH = path.resolve('F:\\RootContext\\OmniGazeRoot\\Output\\OmniGazeSetup.exe');
const REMOTE_PATH = '/install/OmniGazeSetup.exe';

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

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function uploadInstaller() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  console.log('\n' + '='.repeat(60));
  log('  OmniGaze Installer Upload', 'bright');
  console.log('='.repeat(60));

  try {
    // Check if local file exists
    if (!fs.existsSync(LOCAL_INSTALLER_PATH)) {
      throw new Error(`Installer not found at: ${LOCAL_INSTALLER_PATH}`);
    }

    const stats = fs.statSync(LOCAL_INSTALLER_PATH);
    log(`\nLocal file: ${LOCAL_INSTALLER_PATH}`, 'blue');
    log(`File size: ${formatBytes(stats.size)}`, 'blue');
    log(`Modified: ${stats.mtime.toISOString()}`, 'blue');

    // Connect to FTP
    log('\nConnecting to FTP server...', 'cyan');
    await client.access({
      host: FTP_CONFIG.host,
      port: FTP_CONFIG.port,
      user: FTP_CONFIG.user,
      password: FTP_CONFIG.password,
      secure: FTP_CONFIG.secure
    });
    log('Connected!', 'green');

    // Ensure /install directory exists
    log('\nEnsuring /install directory exists...', 'cyan');
    try {
      await client.ensureDir('/install');
    } catch {
      // Directory might already exist
    }

    // Upload the file with progress tracking
    log(`\nUploading to ${REMOTE_PATH}...`, 'cyan');
    const startTime = Date.now();

    client.trackProgress(info => {
      const percent = stats.size > 0 ? Math.round((info.bytes / stats.size) * 100) : 0;
      process.stdout.write(`\r  Progress: ${formatBytes(info.bytes)} / ${formatBytes(stats.size)} (${percent}%)`.padEnd(60));
    });

    await client.uploadFrom(LOCAL_INSTALLER_PATH, REMOTE_PATH);
    client.trackProgress(); // Stop tracking

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n');
    log('Upload completed successfully!', 'green');

    // Verify the upload
    log('\nVerifying upload...', 'cyan');
    const remoteList = await client.list('/install');
    const uploadedFile = remoteList.find(f => f.name === 'OmniGazeSetup.exe');

    if (uploadedFile) {
      log(`Remote file size: ${formatBytes(uploadedFile.size)}`, 'green');
      if (uploadedFile.size === stats.size) {
        log('File size verified!', 'green');
      } else {
        log('WARNING: File sizes do not match!', 'yellow');
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    log('  Upload Summary', 'bright');
    console.log('='.repeat(60));
    log(`  Status: SUCCESS`, 'green');
    log(`  File: OmniGazeSetup.exe`, 'blue');
    log(`  Size: ${formatBytes(stats.size)}`, 'blue');
    log(`  Duration: ${duration}s`, 'blue');
    log(`  URL: https://omnigaze.com/install/OmniGazeSetup.exe`, 'yellow');
    console.log('='.repeat(60) + '\n');

    log('Remember to update the version in src/config/site.ts!', 'yellow');

  } catch (error) {
    console.log('\n');
    log('Upload FAILED!', 'red');
    log(`Error: ${error.message}`, 'red');
    process.exit(1);
  } finally {
    client.close();
  }
}

// Run upload
uploadInstaller();
