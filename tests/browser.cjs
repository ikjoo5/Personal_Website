// Run `npm run dev` first. Browser tooling is development-only.
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

(async () => {
  const executablePath = process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const base = process.env.BASE_URL || 'http://127.0.0.1:8000';
    await page.goto(base);
    assert.equal(await page.title(), 'Ikjoo Oh');
    assert.equal(await page.locator('.publication').count(), 2);
    assert.equal(await page.locator('.project').count(), 0);
    assert.equal(await page.locator('.empty-projects').count(), 1);
    assert.equal(await page.locator('.authors strong').count(), 2);
    assert.equal(await page.getByRole('link', { name: 'Email', exact: true }).getAttribute('href'), 'mailto:ioh22@wisc.edu');
    assert.equal(await page.locator('#profile-links .unavailable').innerText(), 'SOP soon');
    assert.equal(await page.locator('.unavailable[href]').count(), 0);
    assert.equal(await page.locator('.resource-links a').count(), 0, 'Missing URLs must not generate broken links');
    const pdf = await page.request.get(await page.getByRole('link', { name: 'CV', exact: true }).getAttribute('href'));
    assert.equal(pdf.status(), 200);
    assert.equal((await pdf.body()).subarray(0, 5).toString(), '%PDF-');
    assert.ok((await page.locator('main').innerText()).split(/\s+/).length < 400, 'Keep the homepage concise');

    async function checkAccessibility(label) {
      const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      assert.deepEqual(violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })), [], label);
    }
    await checkAccessibility('Desktop accessibility');
    await page.screenshot({ path: join(tmpdir(), 'portfolio-desktop.png'), fullPage: true });
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Publications' }).click();
    assert.equal(new URL(page.url()).hash, '#publications');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base);
    await page.screenshot({ path: join(tmpdir(), 'portfolio-mobile.png'), fullPage: true });
    await checkAccessibility('Mobile accessibility');
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow at ${width}px`);
    }

    // Exercise the editing workflow: local PDFs, external URLs, author highlighting,
    // an added project, and refusal to turn unsafe URLs into active links.
    const content = readFileSync(join(__dirname, '..', 'site-data.js'), 'utf8');
    await page.route('**/site-data.js', route => route.fulfill({
      contentType: 'text/javascript',
      body: `${content}\n
        window.SITE_DATA.sopUrl = 'assets/CV_IkjooOh.pdf';
        window.SITE_DATA.publications[0].links.pdf = 'assets/CV_IkjooOh.pdf';
        window.SITE_DATA.publications[0].venue = 'Test venue';
        window.SITE_DATA.projects.push({ id: 'configured-project', title: 'Configured project', description: 'A newly added project.', links: { demo: 'https://example.com/demo', code: 'javascript:alert(1)' } });
        window.SITE_DATA.projects.push({ id: 'new-project', title: '<New project>', description: 'Added in the data file.', links: { pdf: 'assets/CV_IkjooOh.pdf' } });`
    }));
    await page.reload();
    assert.match(await page.getByRole('link', { name: 'SOP', exact: true }).getAttribute('href'), /\/assets\/CV_IkjooOh\.pdf$/);
    assert.equal(await page.locator('#clinical-terminology h3 a').count(), 1);
    assert.equal(await page.locator('.venue').innerText(), 'Test venue');
    assert.equal(await page.locator('#configured-project .resource-links a').getAttribute('href'), 'https://example.com/demo');
    assert.equal(await page.locator('#configured-project .resource-links [aria-disabled="true"]').filter({ hasText: 'Code' }).count(), 1);
    assert.equal(await page.locator('a[href^="javascript:"]').count(), 0);
    assert.equal(await page.locator('#new-project h3').innerText(), '<New project>');
    assert.equal(await page.locator('.project').count(), 2);
    assert.equal(await page.locator('.empty-projects').count(), 0);
    assert.deepEqual(errors, []);
    console.log('PASS: concise publication/project lists, navigation, CV PDF, editable SOP/PDF/demo links, adding entries, safe URLs, 320–1440px layouts, and automated WCAG A/AA checks.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
