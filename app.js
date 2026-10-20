(() => {
  'use strict';
  const data = window.SITE_DATA;
  const arrow = '<svg class="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M3 13 13 3M3 3h10v10"/></svg>';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Only explicit HTTP(S) and site-relative links are accepted from content data.
  function safeUrl(value) {
    if (!value || typeof value !== 'string') return '';
    try {
      const url = new URL(value, location.href);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  }
  document.querySelectorAll('[data-name]').forEach(el => { el.textContent = data.name; });
  document.querySelectorAll('[data-initials]').forEach(el => { el.textContent = data.initials; });
  document.querySelector('[data-bio]').textContent = data.bio;
  document.querySelector('[data-education]').textContent = data.education;
  document.title = `${data.name} — CS & Data Science`;
  const cvUrl = safeUrl(data.cvUrl);
  const cv = document.querySelector('#cv-download');
  if (cvUrl) {
    cv.href = cvUrl;
    cv.target = '_blank';
    cv.rel = 'noopener noreferrer';
    cv.removeAttribute('aria-disabled');
    cv.innerHTML = `Open CV (PDF) ${arrow}`;
    document.querySelectorAll('.cv-link').forEach(link => { link.href = cvUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'; });
  } else {
    cv.removeAttribute('href'); cv.setAttribute('aria-disabled', 'true');
    cv.textContent = 'CV coming soon';
    document.querySelector('#cv-note').textContent = 'CV PDF will be added here.';
  }
  const emailLink = document.querySelector('#email-link');
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    emailLink.href = `mailto:${data.email}`;
    emailLink.removeAttribute('aria-disabled');
    emailLink.innerHTML = `${escape(data.email)} ${arrow}`;
  } else {
    emailLink.removeAttribute('href'); emailLink.setAttribute('aria-disabled', 'true');
    emailLink.textContent = 'Email coming soon';
  }
  const github = document.querySelector('#github-link');
  const githubUrl = safeUrl(data.github);
  if (githubUrl) github.href = githubUrl; else github.hidden = true;

  const visuals = {
    research: `<svg viewBox="0 0 520 230" aria-hidden="true"><g fill="none" stroke="#a1b18f" stroke-width="1"><path d="M100 75H175Q190 75 190 90V115H240M100 115H240M100 155H175Q190 155 190 140V115M280 115H330Q345 115 345 95V75H415M280 115H415M280 115H330Q345 115 345 135V155H415"/><circle cx="260" cy="115" r="62" stroke-dasharray="3 5"/></g><g fill="#f3f5ed" stroke="#bdc9b0"><rect x="48" y="61" width="82" height="28" rx="5"/><rect x="48" y="101" width="82" height="28" rx="5"/><rect x="48" y="141" width="82" height="28" rx="5"/><rect x="377" y="61" width="94" height="28" rx="5"/><rect x="377" y="101" width="94" height="28" rx="5"/><rect x="377" y="141" width="94" height="28" rx="5"/></g><rect x="231" y="86" width="58" height="58" rx="13" fill="#34543b"/><path d="M260 98v34m-17-17h34m-29-12 24 24m0-24-24 24" fill="none" stroke="#dbe6c8" stroke-width="2.5" stroke-linecap="round"/><g font-family="monospace" font-size="9" text-anchor="middle" fill="#5a7050"><text x="89" y="79">Local term</text><text x="89" y="119">Local term</text><text x="89" y="159">Local term</text><text x="424" y="79">SNOMED CT</text><text x="424" y="119">RxNorm</text><text x="424" y="159">LOINC</text></g></svg>`,
    engineering: `<svg viewBox="0 0 520 230" aria-hidden="true"><rect x="150" y="25" width="220" height="180" rx="6" fill="#d0dbd2" stroke="#99af9e"/><g fill="none" stroke="#e9eee7" stroke-width="19"><path d="M167 180V48H348M172 181H348V47M167 181L348 48"/></g><g stroke="#a6b9a6" stroke-width="1" fill="none"><path d="M168 141L219 141L219 103L271 103L271 62M215 180L215 162L304 162L304 104L350 104"/></g><g fill="#355744"><circle cx="204" cy="158" r="5"/><circle cx="281" cy="117" r="5"/><circle cx="316" cy="77" r="5"/></g><g stroke="#ae623f" fill="none" stroke-width="1.4"><rect x="194" y="148" width="20" height="20" rx="2"/><rect x="271" y="107" width="20" height="20" rx="2"/><rect x="306" y="67" width="20" height="20" rx="2"/></g><g font-family="monospace" font-size="8" fill="#6d846e"><text x="45" y="100">MINIMAP</text><text x="45" y="113">↓ DETECT</text><text x="45" y="126">↓ ANALYZE</text></g><path d="M374 81H411V149H374" stroke="#9eaf9a" fill="none"/><text x="396" y="171" font-size="8" fill="#70836c" font-family="monospace">EVENTS →</text></svg>`,
    imaging: `<svg viewBox="0 0 520 230" aria-hidden="true"><defs><radialGradient id="scan"><stop stop-color="#bec7b6"/><stop offset=".65" stop-color="#7e8e7b"/><stop offset="1" stop-color="#364d42"/></radialGradient><pattern id="noise" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="1.4" fill="#e7eadd" opacity=".45"/><circle cx="7" cy="7" r="1" fill="#263c32" opacity=".3"/></pattern></defs><g fill="#31483c"><rect x="82" y="44" width="132" height="132" rx="9"/><rect x="306" y="44" width="132" height="132" rx="9"/></g><ellipse cx="148" cy="110" rx="46" ry="51" fill="url(#scan)"/><ellipse cx="372" cy="110" rx="46" ry="51" fill="url(#scan)"/><rect x="82" y="44" width="132" height="132" rx="9" fill="url(#noise)"/><path d="M350 93Q367 72 391 96T382 140Q359 149 348 126T350 93Z" stroke="#cfddb8" fill="#b8c59e" fill-opacity=".2"/><path d="M234 110H284M277 104L284 110L277 116" fill="none" stroke="#859778"/><g fill="#708167" font-size="8" font-family="monospace" text-anchor="middle"><text x="148" y="197">INPUT / NOISE</text><text x="372" y="197">DENOISE / ANALYZE</text></g></svg>`,
    data: `<svg viewBox="0 0 520 230" aria-hidden="true"><g stroke="#cfc4b4" fill="none"><path d="M92 120H183M235 120H330M380 120H438M355 144V177H208V144"/><path d="M319 114L330 120L319 126M171 114L183 120L171 126"/></g><rect x="47" y="91" width="73" height="58" rx="7" fill="#f4efe6" stroke="#c7bda9"/><circle cx="83" cy="110" r="6" fill="#ae9e83"/><path d="M71 134Q71 119 83 119T95 134" fill="#ae9e83"/><rect x="182" y="88" width="57" height="64" rx="7" fill="#9b6c4d"/><text x="210" y="128" font-family="Georgia,serif" font-size="30" fill="#f1e8d5" text-anchor="middle">π</text><rect x="331" y="93" width="53" height="55" rx="7" fill="#f4efe6" stroke="#c7bda9"/><path d="M343 126L352 115L359 120L372 107" stroke="#8a9a71" stroke-width="2" fill="none"/><g font-size="8" font-family="monospace" fill="#8b7a63" text-anchor="middle"><text x="83" y="75">STATE</text><text x="211" y="75">POLICY</text><text x="357" y="75">ACTION</text><text x="283" y="194">← REWARD / LEARN</text></g><circle cx="440" cy="120" r="5" fill="#9c6a48"/></svg>`
  };
  const grid = document.querySelector('#project-grid');
  const count = document.querySelector('#project-count');
  document.querySelector('#template-notice').hidden = !data.projects.some(project => project.template);
  function renderProjects(filter = 'all') {
    const projects = data.projects.filter(project => filter === 'all' || project.category === filter);
    count.textContent = `${projects.length} project${projects.length === 1 ? '' : 's'}`;
    grid.innerHTML = projects.length ? projects.map(project => `<article class="project-card">
      <div class="project-visual ${escape(project.visual)}"><span class="visual-index">0${data.projects.indexOf(project) + 1}</span>${visuals[project.visual] || visuals.research}<span class="visual-note">${escape(project.template ? 'PROJECT OUTLINE' : project.category.toUpperCase())}</span></div>
      <div class="card-content"><div class="card-meta"><span>${escape(project.category)}</span>${project.template ? '<span class="template-badge">Template</span>' : '<span class="card-arrow" aria-hidden="true"><svg class="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M3 13 13 3M3 3h10v10"/></svg></span>'}</div><h3>${escape(project.title)}</h3><p>${escape(project.description)}</p><div class="tags">${project.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div><button class="project-open" data-project="${escape(project.id)}" aria-label="View ${escape(project.title)}">${project.template ? 'View project outline' : 'Inside the project'}${arrow}</button></div>
    </article>`).join('') : '<p class="empty-state">No projects in this category yet.</p>';
  }
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(item => {
        item.classList.toggle('active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      renderProjects(button.dataset.filter);
    });
  });
  const dialog = document.querySelector('#project-dialog');
  let opener;
  function openProject(project, trigger) {
    opener = trigger;
    const resourceLabels = { code: 'Source code', demo: 'Watch demo', report: 'Read report' };
    document.querySelector('#dialog-content').innerHTML = `<p class="dialog-category">${escape(project.category)} / ${escape(project.subtitle || 'Project outline')}</p>
      <h2 id="dialog-title">${escape(project.title)}</h2>
      ${project.context ? `<p class="project-context">${escape(project.context)}</p>` : ''}
      ${project.template ? '<p class="dialog-template">Editable project template — replace these prompts with your own work.</p>' : ''}
      ${project.metric ? `<div class="project-metric"><strong>${escape(project.metric)}</strong><span>${escape(project.metricLabel)}</span></div>` : ''}
      <section class="dialog-section"><h3>The question</h3><p>${escape(project.overview)}</p></section>
      <section class="dialog-section"><h3>My contribution</h3><p>${escape(project.contribution)}</p></section>
      <section class="dialog-section"><h3>The pipeline</h3><ol class="pipeline">${project.pipeline.map((step, index) => `<li><span class="pipeline-number">0${index + 1}</span><h4>${escape(step.title)}</h4><p>${escape(step.text)}</p></li>`).join('')}</ol><p class="resource-note">Conceptual workflow based on the project description.</p></section>
      <section class="dialog-section"><h3>Results & reflections</h3><p>${escape(project.outcome)}</p></section>
      <section class="dialog-section"><h3>Explore the work</h3><div class="resource-links">${Object.entries(resourceLabels).map(([key, label]) => {
        const url = safeUrl(project.links[key]);
        return url ? `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label} ${arrow}</a>` : `<span>${label} · not linked yet</span>`;
      }).join('')}</div>${Object.values(project.links).some(safeUrl) ? '' : '<p class="resource-note">Code, demo, and report links will appear here when available.</p>'}</section>`;
    document.body.classList.add('modal-open');
    dialog.showModal();
    dialog.scrollTop = 0;
  }
  grid.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project]');
    if (!trigger) return;
    const project = data.projects.find(item => item.id === trigger.dataset.project);
    if (project) openProject(project, trigger);
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    opener?.focus();
  });
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  function closeMenu() { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  renderProjects();
})();
