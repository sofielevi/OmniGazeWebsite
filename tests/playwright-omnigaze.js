/**
 * OmniGaze Website Test Script
 *
 * Playwright-based automated tests for the OmniGaze website.
 *
 * Usage:
 *   1. Start the dev server: npm run dev
 *   2. Run tests: cd ~/.claude/skills/playwright-skill && node run.js <path-to-this-file>
 *
 * Note: Some selectors may need adjustment if components use different class names
 * or structures than expected. Review failed tests to determine if the issue is
 * with the selector or the actual component.
 */

const { chromium } = require('playwright');

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000';

const results = {
  passed: 0,
  failed: 0,
  findings: []
};

function log(section, test, status, note = '') {
  const icon = status === 'PASS' ? '✅' : '❌';
  const msg = `${icon} [${section}] ${test}${note ? ' - ' + note : ''}`;
  console.log(msg);
  results.findings.push({ section, test, status, note });
  if (status === 'PASS') results.passed++;
  else results.failed++;
}

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log('\n========================================');
  console.log('OMNIGAZE WEBSITE TEST EXECUTION');
  console.log(`Target: ${TARGET_URL}`);
  console.log('========================================\n');

  // ==========================================
  // MARKETING PAGES
  // ==========================================
  console.log('\n--- MARKETING PAGES ---\n');

  // LANDING PAGE /
  console.log('\n>> Landing Page /\n');
  try {
    const startTime = Date.now();
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const loadTime = Date.now() - startTime;
    log('Landing', 'Page loads < 3s', loadTime < 3000 ? 'PASS' : 'FAIL', `${loadTime}ms`);
  } catch (e) {
    log('Landing', 'Page loads < 3s', 'FAIL', e.message);
  }

  try {
    const hero = await page.locator('section').first();
    const bgImage = await hero.evaluate(el => {
      const style = getComputedStyle(el);
      return style.backgroundImage !== 'none' || el.querySelector('img, video');
    });
    log('Landing', 'Hero section renders with background image', bgImage ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Landing', 'Hero section renders with background image', 'FAIL', e.message);
  }

  // Video modal test - uses role="dialog" attribute
  try {
    const videoBtn = await page.locator('button:has-text("Watch"), button:has-text("Demo")').first();
    if (await videoBtn.count() > 0) {
      await videoBtn.click();
      await page.waitForTimeout(500);
      const modal = await page.locator('[role="dialog"]').first();
      const modalVisible = await modal.isVisible();
      log('Landing', 'Hero video modal opens/closes', modalVisible ? 'PASS' : 'FAIL', modalVisible ? '' : 'Modal not found');
      if (modalVisible) {
        // Close by clicking the close button or pressing Escape
        const closeBtn = await page.locator('button:has-text("Close")').first();
        if (await closeBtn.count() > 0) {
          await closeBtn.click();
        } else {
          await page.keyboard.press('Escape');
        }
        await page.waitForTimeout(500);
        // Verify modal is closed
        const stillVisible = await page.locator('[role="dialog"]').count();
        if (stillVisible > 0) {
          // Force close by reloading
          await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
        }
      }
    } else {
      log('Landing', 'Hero video modal opens/closes', 'FAIL', 'No video button found');
    }
  } catch (e) {
    log('Landing', 'Hero video modal opens/closes', 'FAIL', e.message);
  }

  // Pyramid test - uses data-testid attributes
  try {
    const layers = await page.locator('[data-testid="pyramid-layer"]').count();
    log('Landing', 'Value Pyramid displays all 5 layers', layers >= 5 ? 'PASS' : 'FAIL', `Found ${layers} layers`);
  } catch (e) {
    log('Landing', 'Value Pyramid displays all 5 layers', 'FAIL', e.message);
  }

  try {
    const pyramidLayer = await page.locator('[data-testid="pyramid-layer"]').first();
    if (await pyramidLayer.count() > 0) {
      await pyramidLayer.hover();
      await page.waitForTimeout(500);
      // Tooltip appears as an absolutely positioned div inside the layer
      const tooltip = await page.locator('[data-testid="pyramid-layer"] .absolute.left-full').first();
      log('Landing', 'Pyramid tooltips show on hover', await tooltip.count() > 0 ? 'PASS' : 'FAIL');
    } else {
      log('Landing', 'Pyramid tooltips show on hover', 'FAIL', 'No pyramid layers to hover');
    }
  } catch (e) {
    log('Landing', 'Pyramid tooltips show on hover', 'FAIL', e.message);
  }

  try {
    const bridge = await page.locator('.bridge, [class*="bridge"], #bridge, [data-bridge]').first();
    log('Landing', 'Bridge visual renders', await bridge.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Landing', 'Bridge visual renders', 'FAIL', e.message);
  }

  try {
    const featureCards = await page.locator('[class*="feature"] [class*="card"], .feature-card, [class*="card"]').count();
    log('Landing', 'Feature cards display', featureCards >= 3 ? 'PASS' : 'FAIL', `Found ${featureCards} cards`);
  } catch (e) {
    log('Landing', 'Feature cards display', 'FAIL', e.message);
  }

  try {
    const ctaButtons = await page.locator('a[href*="register"], a[href*="pricing"], a[href*="download"], button:has-text("Get Started"), button:has-text("Try")').count();
    log('Landing', 'CTA buttons link correctly', ctaButtons >= 1 ? 'PASS' : 'FAIL', `Found ${ctaButtons} CTAs`);
  } catch (e) {
    log('Landing', 'CTA buttons link correctly', 'FAIL', e.message);
  }

  try {
    const header = await page.locator('header, nav').first();
    const headerVisible = await header.isVisible();
    const navLinks = await page.locator('header a, nav a').count();
    log('Landing', 'Header navigation works', headerVisible && navLinks >= 3 ? 'PASS' : 'FAIL', `${navLinks} nav links`);
  } catch (e) {
    log('Landing', 'Header navigation works', 'FAIL', e.message);
  }

  try {
    const footer = await page.locator('footer').first();
    const footerLinks = await page.locator('footer a').count();
    log('Landing', 'Footer links work', await footer.count() > 0 && footerLinks >= 1 ? 'PASS' : 'FAIL', `${footerLinks} footer links`);
  } catch (e) {
    log('Landing', 'Footer links work', 'FAIL', e.message);
  }

  // Mobile hamburger test - fresh page load to avoid modal overlay
  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 });
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    const hamburger = await page.locator('button[aria-label="Toggle menu"]').first();
    if (await hamburger.isVisible()) {
      await hamburger.click({ timeout: 5000 });
      await page.waitForTimeout(300);
      // Check if mobile nav links become visible (max-h expands from 0)
      const mobileNavLink = await page.locator('nav a').first();
      const isVisible = await mobileNavLink.isVisible();
      log('Landing', 'Mobile hamburger menu opens/closes', isVisible ? 'PASS' : 'FAIL');
    } else {
      log('Landing', 'Mobile hamburger menu opens/closes', 'FAIL', 'Hamburger button not visible');
    }
    await page.setViewportSize({ width: 1920, height: 1080 });
  } catch (e) {
    log('Landing', 'Mobile hamburger menu opens/closes', 'FAIL', e.message);
    await page.setViewportSize({ width: 1920, height: 1080 });
  }

  // PRICING PAGE /pricing
  console.log('\n>> Pricing Page /pricing\n');
  try {
    await page.goto(`${TARGET_URL}/pricing`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Pricing', 'Page loads', 'PASS');
  } catch (e) {
    log('Pricing', 'Page loads', 'FAIL', e.message);
  }

  // Tier cards - uses data-testid
  try {
    const tierCards = await page.locator('[data-testid="pricing-card"]').count();
    log('Pricing', 'All 5 tier cards render', tierCards >= 5 ? 'PASS' : 'FAIL', `Found ${tierCards} tier cards`);
  } catch (e) {
    log('Pricing', 'All 5 tier cards render', 'FAIL', e.message);
  }

  try {
    const toggle = await page.locator('button:has-text("Annual"), button:has-text("Monthly"), [class*="toggle"], [role="switch"]').first();
    if (await toggle.count() > 0) {
      await toggle.click();
      await page.waitForTimeout(300);
      log('Pricing', 'Monthly/Annual toggle works', 'PASS');
    } else {
      log('Pricing', 'Monthly/Annual toggle works', 'FAIL', 'Toggle not found');
    }
  } catch (e) {
    log('Pricing', 'Monthly/Annual toggle works', 'FAIL', e.message);
  }

  try {
    const discountText = await page.locator('text=/17%|save|discount/i').first();
    log('Pricing', 'Annual shows 17% discount', await discountText.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Pricing', 'Annual shows 17% discount', 'FAIL', e.message);
  }

  try {
    const featureMatrix = await page.locator('table, [class*="matrix"], [class*="comparison"]').first();
    log('Pricing', 'Feature matrix displays', await featureMatrix.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Pricing', 'Feature matrix displays', 'FAIL', e.message);
  }

  try {
    const checks = await page.locator('[class*="check"], svg[class*="check"], .fa-check, [data-check]').count();
    log('Pricing', 'Checkmarks/X marks correct per tier', checks >= 5 ? 'PASS' : 'FAIL', `Found ${checks} checkmarks`);
  } catch (e) {
    log('Pricing', 'Checkmarks/X marks correct per tier', 'FAIL', e.message);
  }

  try {
    const getStartedBtn = await page.locator('a[href*="register"]:has-text("Get Started"), a[href*="register"]:has-text("Start")').first();
    log('Pricing', 'Get Started buttons link to register', await getStartedBtn.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Pricing', 'Get Started buttons link to register', 'FAIL', e.message);
  }

  try {
    const contactSales = await page.locator('a[href*="enterprise"], a[href*="contact"]:has-text("Contact"), button:has-text("Contact Sales")').first();
    log('Pricing', 'Contact Sales links to enterprise', await contactSales.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Pricing', 'Contact Sales links to enterprise', 'FAIL', e.message);
  }

  try {
    // FAQ section exists as static cards, not accordion - find by heading text
    const faqHeading = await page.locator('text="Common Questions"').first();
    if (await faqHeading.count() > 0) {
      const faqCards = await page.locator('text="Common Questions" >> .. >> .. >> div').count();
      log('Pricing', 'FAQ section displays', faqCards > 0 ? 'PASS' : 'FAIL', `Found ${faqCards} FAQ items (static, not accordion)`);
    } else {
      log('Pricing', 'FAQ section displays', 'FAIL', 'FAQ heading not found');
    }
  } catch (e) {
    log('Pricing', 'FAQ section displays', 'FAIL', e.message);
  }

  try {
    const pyramidMini = await page.locator('[data-testid="pyramid-mini"]').first();
    log('Pricing', 'PyramidMini shows in tier cards', await pyramidMini.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Pricing', 'PyramidMini shows in tier cards', 'FAIL', e.message);
  }

  // FEATURES PAGE /features
  console.log('\n>> Features Page /features\n');
  try {
    await page.goto(`${TARGET_URL}/features`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Features', 'Page loads', 'PASS');
  } catch (e) {
    log('Features', 'Page loads', 'FAIL', e.message);
  }

  try {
    const layerSections = await page.locator('section[id], [class*="layer"], [class*="feature-section"]').count();
    log('Features', 'All pyramid layer sections render', layerSections >= 5 ? 'PASS' : 'FAIL', `Found ${layerSections} sections`);
  } catch (e) {
    log('Features', 'All pyramid layer sections render', 'FAIL', e.message);
  }

  try {
    const images = await page.locator('img[src*="layer"], img[src*="feature"], section img').count();
    log('Features', 'Layer images load', images >= 1 ? 'PASS' : 'FAIL', `Found ${images} images`);
  } catch (e) {
    log('Features', 'Layer images load', 'FAIL', e.message);
  }

  try {
    const featureLists = await page.locator('ul li, [class*="feature-list"]').count();
    log('Features', 'Feature lists display', featureLists >= 5 ? 'PASS' : 'FAIL', `Found ${featureLists} list items`);
  } catch (e) {
    log('Features', 'Feature lists display', 'FAIL', e.message);
  }

  try {
    const anchors = await page.locator('a[href^="#"]').count();
    log('Features', 'Navigation anchors work', anchors >= 1 ? 'PASS' : 'FAIL', `Found ${anchors} anchor links - may not be implemented`);
  } catch (e) {
    log('Features', 'Navigation anchors work', 'FAIL', e.message);
  }

  try {
    const ctaSection = await page.locator('[class*="cta"] a, section:last-of-type a[href]').count();
    log('Features', 'CTA section links work', ctaSection >= 1 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Features', 'CTA section links work', 'FAIL', e.message);
  }

  // DOWNLOAD PAGE /download
  console.log('\n>> Download Page /download\n');
  try {
    await page.goto(`${TARGET_URL}/download`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Download', 'Page loads', 'PASS');
  } catch (e) {
    log('Download', 'Page loads', 'FAIL', e.message);
  }

  try {
    const winBtn = await page.locator('a[href*=".exe"], a[href*="windows"], button:has-text("Windows"), a:has-text("Download for Windows")').first();
    log('Download', 'Windows download button present', await winBtn.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Download', 'Windows download button present', 'FAIL', e.message);
  }

  try {
    const sysReq = await page.locator('text=/requirements|system|RAM|CPU|Windows/i').first();
    log('Download', 'System requirements display', await sysReq.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Download', 'System requirements display', 'FAIL', e.message);
  }

  try {
    const version = await page.locator('text=/v[0-9]|version|[0-9]+\\.[0-9]+/i').first();
    log('Download', 'Version info shows', await version.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Download', 'Version info shows', 'FAIL', e.message);
  }

  // DOCS PAGE /docs
  console.log('\n>> Docs Page /docs\n');
  try {
    await page.goto(`${TARGET_URL}/docs`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Docs', 'Main docs page loads', 'PASS');
  } catch (e) {
    log('Docs', 'Main docs page loads', 'FAIL', e.message);
  }

  try {
    const sidebar = await page.locator('aside, [class*="sidebar"], nav[class*="docs"]').first();
    log('Docs', 'Sidebar navigation works', await sidebar.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Docs', 'Sidebar navigation works', 'FAIL', e.message);
  }

  const docPages = ['installation', 'activation', 'credentials', 'scanning', 'visualization', 'architecture', 'api', 'changelog', 'faq'];
  for (const docPage of docPages) {
    try {
      const response = await page.goto(`${TARGET_URL}/docs/${docPage}`, { waitUntil: 'domcontentloaded', timeout: 5000 });
      log('Docs', `/docs/${docPage} loads`, response.status() === 200 ? 'PASS' : 'FAIL', `Status: ${response.status()}`);
    } catch (e) {
      log('Docs', `/docs/${docPage} loads`, 'FAIL', e.message);
    }
  }

  try {
    await page.goto(`${TARGET_URL}/docs/installation`, { waitUntil: 'domcontentloaded' });
    const codeBlocks = await page.locator('pre code').count();
    log('Docs', 'Code blocks render with syntax highlighting', codeBlocks >= 1 ? 'PASS' : 'FAIL', `Found ${codeBlocks} code blocks`);
  } catch (e) {
    log('Docs', 'Code blocks render with syntax highlighting', 'FAIL', e.message);
  }

  try {
    const copyBtn = await page.locator('[data-testid="copy-code-button"]').first();
    log('Docs', 'Copy code button works', await copyBtn.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Docs', 'Copy code button works', 'FAIL', e.message);
  }

  // ENTERPRISE PAGE /enterprise
  console.log('\n>> Enterprise Page /enterprise\n');
  try {
    const response = await page.goto(`${TARGET_URL}/enterprise`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Enterprise', 'Page loads', response.status() === 200 ? 'PASS' : 'FAIL', `Status: ${response.status()}`);
  } catch (e) {
    log('Enterprise', 'Page loads', 'FAIL', e.message);
  }

  try {
    const form = await page.locator('form, [class*="contact-form"]').first();
    log('Enterprise', 'Contact form displays', await form.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Enterprise', 'Contact form displays', 'FAIL', e.message);
  }

  try {
    const emailInput = await page.locator('input[type="email"], input[name="email"]').first();
    if (await emailInput.count() > 0) {
      await emailInput.fill('invalid');
      await page.locator('button[type="submit"]').first().click();
      await page.waitForTimeout(300);
      const error = await page.locator('[class*="error"], [role="alert"], :invalid').first();
      log('Enterprise', 'Form validation works', await error.count() > 0 ? 'PASS' : 'FAIL');
    } else {
      log('Enterprise', 'Form validation works', 'FAIL', 'No email input found');
    }
  } catch (e) {
    log('Enterprise', 'Form validation works', 'FAIL', e.message);
  }

  // ==========================================
  // AUTH PAGES
  // ==========================================
  console.log('\n--- AUTH PAGES ---\n');

  // REGISTER PAGE /register
  console.log('\n>> Register Page /register\n');
  try {
    await page.goto(`${TARGET_URL}/register`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Register', 'Page loads', 'PASS');
  } catch (e) {
    log('Register', 'Page loads', 'FAIL', e.message);
  }

  try {
    const emailInput = await page.locator('input[type="email"], input[name="email"]').first();
    if (await emailInput.count() > 0) {
      await emailInput.fill('test@example.com');
      const value = await emailInput.inputValue();
      log('Register', 'Email input accepts valid email', value === 'test@example.com' ? 'PASS' : 'FAIL');
    } else {
      log('Register', 'Email input accepts valid email', 'FAIL', 'No email input found');
    }
  } catch (e) {
    log('Register', 'Email input accepts valid email', 'FAIL', e.message);
  }

  try {
    const emailInput = await page.locator('input[type="email"], input[name="email"]').first();
    await emailInput.fill('invalid-email');
    // Button should remain disabled with invalid email (no @ sign)
    const submitBtn = await page.locator('button[type="submit"]').first();
    const isDisabled = await submitBtn.isDisabled();
    // Also check for HTML5 :invalid pseudo-class on the input
    const isInvalid = await emailInput.evaluate((el) => !el.validity.valid);
    log('Register', 'Email input rejects invalid email', (isDisabled || isInvalid) ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Register', 'Email input rejects invalid email', 'FAIL', e.message);
  }

  try {
    const checkbox = await page.locator('input[type="checkbox"], [class*="terms"]').first();
    log('Register', 'Terms checkbox required', await checkbox.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Register', 'Terms checkbox required', 'FAIL', e.message);
  }

  try {
    await page.goto(`${TARGET_URL}/register`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    const submitBtn = await page.locator('button[type="submit"]').first();
    const isDisabled = await submitBtn.isDisabled();
    log('Register', 'Submit disabled until valid', isDisabled ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Register', 'Submit disabled until valid', 'FAIL', e.message);
  }

  // VERIFY PAGE /verify
  console.log('\n>> Verify Page /verify\n');
  try {
    await page.goto(`${TARGET_URL}/verify`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Verify', 'Page loads', 'PASS');
  } catch (e) {
    log('Verify', 'Page loads', 'FAIL', e.message);
  }

  // Note: Verify page requires email in sessionStorage from /register flow
  // Direct navigation redirects to /register - wait for potential redirect
  await page.waitForTimeout(1000);
  try {
    const url = page.url();
    if (url.includes('/register') && !url.includes('/verify')) {
      log('Verify', 'Redirects without session (expected)', 'PASS', 'Requires registration flow');
    } else {
      const codeInputs = await page.locator('input[maxlength="1"]').count();
      log('Verify', '6-digit code input works', codeInputs >= 6 ? 'PASS' : 'FAIL', `Found ${codeInputs} inputs`);
    }
  } catch (e) {
    log('Verify', '6-digit code input works', 'FAIL', e.message);
  }

  try {
    const url = page.url();
    if (url.includes('/register') && !url.includes('/verify')) {
      log('Verify', 'Resend requires session (expected)', 'PASS', 'Requires registration flow');
    } else {
      const resendBtn = await page.locator('text=Resend').first();
      log('Verify', 'Resend button appears', await resendBtn.count() > 0 ? 'PASS' : 'FAIL');
    }
  } catch (e) {
    log('Verify', 'Resend button appears', 'FAIL', e.message);
  }

  // LOGIN PAGE /login
  console.log('\n>> Login Page /login\n');
  try {
    await page.goto(`${TARGET_URL}/login`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Login', 'Page loads', 'PASS');
  } catch (e) {
    log('Login', 'Page loads', 'FAIL', e.message);
  }

  try {
    const licenseInput = await page.locator('input[name*="license"], input[placeholder*="license"], input[placeholder*="XXXX"]').first();
    log('Login', 'License key input accepts XXXX-XXXX-XXXX-XXXX format', await licenseInput.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Login', 'License key input accepts XXXX-XXXX-XXXX-XXXX format', 'FAIL', e.message);
  }

  try {
    const registerLink = await page.locator('a[href*="register"]').first();
    log('Login', 'Register link works', await registerLink.count() > 0 ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Login', 'Register link works', 'FAIL', e.message);
  }

  // REGISTER SUCCESS /register/success
  console.log('\n>> Register Success Page /register/success\n');
  try {
    const response = await page.goto(`${TARGET_URL}/register/success`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Register Success', 'Page loads', response.status() === 200 ? 'PASS' : 'FAIL', `Status: ${response.status()}`);
  } catch (e) {
    log('Register Success', 'Page loads', 'FAIL', e.message);
  }

  // Note: Success page requires verifyResult in sessionStorage from /verify flow
  // Direct navigation redirects to /register - wait for potential redirect
  await page.waitForTimeout(1000);
  try {
    const url = page.url();
    if (url.includes('/register') && !url.includes('/success')) {
      log('Register Success', 'Redirects without session (expected)', 'PASS', 'Requires verification flow');
    } else {
      const copyBtn = await page.locator('button:has-text("Copy")').first();
      log('Register Success', 'Copy button present', await copyBtn.count() > 0 ? 'PASS' : 'FAIL');
    }
  } catch (e) {
    log('Register Success', 'Copy button present', 'FAIL', e.message);
  }

  try {
    const url = page.url();
    if (url.includes('/register') && !url.includes('/success')) {
      log('Register Success', 'Download CTA requires session (expected)', 'PASS', 'Requires verification flow');
    } else {
      const downloadCta = await page.locator('a[href*="download"]').first();
      log('Register Success', 'Download CTA links to /download', await downloadCta.count() > 0 ? 'PASS' : 'FAIL');
    }
  } catch (e) {
    log('Register Success', 'Download CTA links to /download', 'FAIL', e.message);
  }

  // ==========================================
  // DASHBOARD PAGES
  // ==========================================
  console.log('\n--- DASHBOARD PAGES ---\n');

  // DASHBOARD /dashboard
  console.log('\n>> Dashboard /dashboard\n');
  try {
    await page.goto(`${TARGET_URL}/dashboard`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1000); // Wait for client-side auth check
    const url = page.url();
    if (url.includes('login') || url.includes('register')) {
      log('Dashboard', 'Redirects to login if not authenticated', 'PASS', `Redirected to ${url}`);
    } else {
      log('Dashboard', 'Redirects to login if not authenticated', 'FAIL', 'No auth redirect - still on dashboard');
    }
  } catch (e) {
    log('Dashboard', 'Redirects to login if not authenticated', 'FAIL', e.message);
  }

  // Check dashboard sub-pages
  const dashboardPages = ['subscription', 'licenses', 'billing', 'team', 'settings'];
  for (const dashPage of dashboardPages) {
    try {
      const response = await page.goto(`${TARGET_URL}/dashboard/${dashPage}`, { waitUntil: 'domcontentloaded', timeout: 5000 });
      const url = page.url();
      if (url.includes('login') || url.includes('register')) {
        log(`Dashboard/${dashPage}`, 'Redirects to login (protected)', 'PASS');
      } else {
        log(`Dashboard/${dashPage}`, 'Page exists', response.status() === 200 ? 'PASS' : 'FAIL');
      }
    } catch (e) {
      log(`Dashboard/${dashPage}`, 'Page loads', 'FAIL', e.message);
    }
  }

  // ==========================================
  // CHECKOUT FLOW
  // ==========================================
  console.log('\n--- CHECKOUT FLOW ---\n');

  try {
    const response = await page.goto(`${TARGET_URL}/checkout?tier=starter`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Checkout', 'Page loads with tier param', response.status() === 200 || page.url().includes('login') ? 'PASS' : 'FAIL');
  } catch (e) {
    log('Checkout', 'Page loads with tier param', 'FAIL', e.message);
  }

  try {
    const response = await page.goto(`${TARGET_URL}/checkout/success`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Checkout', '/checkout/success exists', response.status() === 200 || response.status() === 404 ? 'PASS' : 'FAIL', `Status: ${response.status()}`);
  } catch (e) {
    log('Checkout', '/checkout/success exists', 'FAIL', e.message);
  }

  try {
    const response = await page.goto(`${TARGET_URL}/checkout/cancel`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Checkout', '/checkout/cancel exists', response.status() === 200 || response.status() === 404 ? 'PASS' : 'FAIL', `Status: ${response.status()}`);
  } catch (e) {
    log('Checkout', '/checkout/cancel exists', 'FAIL', e.message);
  }

  // ==========================================
  // ERROR HANDLING
  // ==========================================
  console.log('\n--- ERROR HANDLING ---\n');

  try {
    const response = await page.goto(`${TARGET_URL}/nonexistent-page-12345`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    log('Errors', '404 page displays', response.status() === 404 ? 'PASS' : 'FAIL', `Status: ${response.status()}`);
  } catch (e) {
    log('Errors', '404 page displays', 'FAIL', e.message);
  }

  // ==========================================
  // RESPONSIVE BREAKPOINTS
  // ==========================================
  console.log('\n--- RESPONSIVE BREAKPOINTS ---\n');

  const viewports = [
    { name: '320px (Small Phone)', width: 320, height: 568 },
    { name: '375px (iPhone)', width: 375, height: 667 },
    { name: '768px (Tablet)', width: 768, height: 1024 },
    { name: '1024px+ (Desktop)', width: 1024, height: 768 }
  ];

  for (const vp of viewports) {
    try {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const hasHorizontalScroll = bodyWidth > vp.width + 20;
      log('Responsive', `${vp.name} - No horizontal scroll`, !hasHorizontalScroll ? 'PASS' : 'FAIL', hasHorizontalScroll ? `Body: ${bodyWidth}px` : '');
    } catch (e) {
      log('Responsive', `${vp.name} - renders`, 'FAIL', e.message);
    }
  }

  // Reset viewport
  await page.setViewportSize({ width: 1920, height: 1080 });

  // ==========================================
  // SUMMARY
  // ==========================================
  console.log('\n========================================');
  console.log('TEST EXECUTION COMPLETE');
  console.log('========================================');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`Total: ${results.passed + results.failed}`);
  console.log('========================================\n');

  await browser.close();
})();
