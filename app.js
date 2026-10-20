(() => {
  'use strict';
  const data = window.SITE_DATA;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));

  // Accept HTTPS/HTTP or same-site relative paths; reject script and data URLs.
  function safeUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value.trim(), location.href);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  }

  function link(label, value, options = {}) {
    const url = options.email ? value : safeUrl(value);
    if (!url) {
      return `<span class="unavailable" aria-disabled="true" title="${escape(label)} link coming soon">${escape(label)}${options.soon ? ' <small>soon</small>' : ''}</span>`;
    }
    const target = options.email ? '' : ' target="_blank" rel="noopener noreferrer"';
    const accessibleLabel = options.context ? ` aria-label="${escape(label)}: ${escape(options.context)}"` : '';
    return `<a href="${escape(url)}"${target}${accessibleLabel}>${escape(label)}</a>`;
  }

  const labels = { pdf: 'PDF', paper: 'Paper', code: 'Code', demo: 'Demo', pipeline: 'Pipeline' };
  function resources(entry) {
    return `<div class="resource-links" role="group" aria-label="Resources for ${escape(entry.title)}">${Object.entries(entry.links || {}).map(([key, url]) => link(labels[key] || key, url, { context: entry.title })).join('')}</div>`;
  }

  document.title = data.name;
  document.querySelector('#name').innerHTML = `${escape(data.name)}<span class="name-period" aria-hidden="true">.</span>`;
  document.querySelector('#affiliation').textContent = data.affiliation;
  document.querySelector('#degree').textContent = data.degree;
  document.querySelector('#biography').innerHTML = data.bio.map(paragraph => `<p>${escape(paragraph)}</p>`).join('');
  document.querySelector('#footer-name').textContent = data.name;
  document.querySelector('#location').textContent = data.location;
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? `mailto:${data.email}` : '';
  document.querySelector('#profile-links').innerHTML = [
    link('Email', email, { email: true }),
    link('CV', data.cvUrl),
    link('SOP', data.sopUrl, { soon: true }),
    link('GitHub', data.github)
  ].join('<span class="link-separator" aria-hidden="true">/</span>');

  document.querySelector('#publication-list').innerHTML = data.publications.map(publication => {
    const titleUrl = safeUrl(publication.links.paper) || safeUrl(publication.links.pdf);
    const title = titleUrl ? `<a href="${escape(titleUrl)}" target="_blank" rel="noopener noreferrer">${escape(publication.title)}</a>` : escape(publication.title);
    const authors = publication.authors.map(author => author === data.name ? `<strong>${escape(author)}</strong>` : escape(author)).join(', ');
    return `<article class="entry publication" id="${escape(publication.id)}"><h3>${title}</h3><p class="authors">${authors}</p>${publication.venue ? `<p class="venue">${escape(publication.venue)}</p>` : ''}${resources(publication)}</article>`;
  }).join('');

  document.querySelector('#project-list').innerHTML = data.projects.length ? data.projects.map(project => {
    const titleUrl = safeUrl(project.links.demo) || safeUrl(project.links.code) || safeUrl(project.links.pdf);
    const title = titleUrl ? `<a href="${escape(titleUrl)}" target="_blank" rel="noopener noreferrer">${escape(project.title)}</a>` : escape(project.title);
    return `<article class="entry project" id="${escape(project.id)}"><h3>${title}</h3><p class="project-description">${escape(project.description)}</p>${resources(project)}</article>`;
  }).join('') : '<p class="empty-projects">Project materials will be added here.</p>';
})();
