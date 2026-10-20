// Run `npm run dev` first. Browser tooling is development-only.
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const { existsSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

(async () => {
  const executablePath = process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const base = process.env.BASE_URL || 'http://127.0.0.1:8000';
    await page.goto(base);
    assert.match(await page.title(), /Ikjoo Oh/);
    assert.equal(await page.locator('.project-card').count(), 4);
    assert.equal(await page.locator('#email-link').getAttribute('href'), 'mailto:ioh22@wisc.edu');

    for (const [category, count] of [['Research', 2], ['Data science', 1], ['Engineering', 1], ['all', 4]]) {
      await page.locator(`[data-filter="${category}"]`).click();
      assert.equal(await page.locator('.project-card').count(), count);
      assert.equal(await page.locator(`[data-filter="${category}"]`).getAttribute('aria-pressed'), 'true');
    }
    async function checkAccessibility(label) {
      const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      assert.deepEqual(violations.map(v => ({id: v.id, targets: v.nodes.map(n => n.target)})), [], label);
    }
    for (const trigger of await page.locator('[data-project]').all()) {
      await trigger.click();
      assert.equal(await page.locator('dialog').evaluate(el => el.open), true);
      assert.equal(await page.locator('.pipeline li').count(), 4);
      assert.equal(await page.locator('.resource-links span').count(), 3);
      await checkAccessibility('Project dialog accessibility');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog').evaluate(el => el.open), false);
      assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
    }
    await page.mouse.move(0, 0);
    await checkAccessibility('Desktop accessibility');
    const pdf = await page.request.get(`${base}/assets/CV_IkjooOh.pdf`);
    assert.equal(pdf.status(), 200);
    assert.equal((await pdf.body()).subarray(0, 5).toString(), '%PDF-');
    await page.screenshot({ path: join(tmpdir(), 'portfolio-desktop.png'), fullPage: true });

    // A newly supplied demo URL becomes a usable link in the project details.
    await page.evaluate(() => { window.SITE_DATA.projects[0].links.demo = 'https://example.com/demo'; });
    await page.locator('[data-project="clinical-mapping"]').click();
    assert.equal(await page.locator('.resource-links a').getAttribute('href'), 'https://example.com/demo');
    await page.locator('.dialog-close').click();
    await page.reload();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: join(tmpdir(), 'portfolio-mobile.png'), fullPage: true });
    await page.locator('.menu-toggle').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
    await page.locator('#main-nav a[href="#projects"]').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    await page.locator('[data-project="clinical-mapping"]').click();
    assert.equal(await page.locator('dialog').evaluate(el => el.scrollWidth <= el.clientWidth), true);
    await checkAccessibility('Mobile dialog accessibility');
    await page.screenshot({ path: join(tmpdir(), 'portfolio-detail.png') });
    await page.locator('.dialog-close').click();
    await checkAccessibility('Mobile accessibility');
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow at ${width}px`);
    }
    assert.deepEqual(errors, []);
    console.log('PASS: project filters, 4 dialogs and pipelines, demo URL configuration, keyboard focus, CV PDF, email, mobile navigation, responsive widths, and WCAG A/AA automated checks.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
