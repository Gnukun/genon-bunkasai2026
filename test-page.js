const { chromium } = require('playwright');

(async () => {
  console.log('--- Starting Automated Site Verification ---');
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });
  page.on('response', resp => {
    if (resp.status() >= 400) {
      consoleErrors.push(`HTTP ${resp.status()} on ${resp.url()}`);
    }
  });

  // 1. PC Viewport Test
  console.log('Testing PC viewport (1440x900)...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Check scroll width vs client width (no horizontal scroll)
  const pcOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('PC Horizontal Overflow:', pcOverflow ? 'FAIL (Horizontal scroll exists!)' : 'PASS (No overflow)');

  // Capture screenshot of PC Hero & full page
  await page.screenshot({ path: 'screenshot-pc-hero.png' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshot-pc-full.png', fullPage: true });
  console.log('Captured screenshot-pc-full.png');

  // Test Navigation Click
  console.log('Testing navigation click to #timetable...');
  await page.click('a[href="#timetable"]');
  await page.waitForTimeout(600);

  // 2. Mobile Viewport Test
  console.log('Testing Mobile viewport (375x812)...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Mobile Horizontal Overflow:', mobileOverflow ? 'FAIL (Horizontal scroll exists!)' : 'PASS (No overflow)');

  // Scroll through sections to verify reveal
  console.log('Testing full page scroll...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshot-sp-full.png', fullPage: true });

  console.log('Console Errors Count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console Errors:', consoleErrors);
  } else {
    console.log('Zero console errors detected: PASS');
  }

  await browser.close();
  console.log('--- Verification Complete ---');
})();
