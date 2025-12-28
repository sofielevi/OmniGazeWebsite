#!/usr/bin/env node

/**
 * OmniGaze Website - Production Backup Script
 * Downloads entire production site from omnigaze.com to local backup folder
 */

const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

const BACKUP_DIR = 'F:/websitebackup';

const FTP_CONFIG = {
  host: 'linux19.unoeuro.com',
  port: 21,
  user: 'omnigaze.com',
  password: 'Hm4hyxRz2nwB'
};

async function backupProduction() {
  console.log('\n' + '='.repeat(60));
  console.log('  OmniGaze Website - Production Backup');
  console.log('  Source: omnigaze.com');
  console.log('  Target: ' + BACKUP_DIR);
  console.log('='.repeat(60) + '\n');

  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('Connecting to FTP server...');
    await client.access({
      host: FTP_CONFIG.host,
      port: FTP_CONFIG.port,
      user: FTP_CONFIG.user,
      password: FTP_CONFIG.password,
      secure: false
    });
    console.log('Connected!\n');

    // Ensure backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    // Download entire public_html directory
    console.log('Downloading /public_html/ to ' + BACKUP_DIR + '...\n');

    await client.cd('/public_html');
    await client.downloadToDir(BACKUP_DIR, '/public_html');

    console.log('\n' + '='.repeat(60));
    console.log('  Backup completed successfully!');
    console.log('  Location: ' + BACKUP_DIR);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\nBackup FAILED!');
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

backupProduction();
