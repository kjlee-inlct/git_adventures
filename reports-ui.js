(() => {
  const aggregator = window.GIT_ADVENTURES_REPORT_AGGREGATOR;
  if (!aggregator) throw new Error('Report aggregator must load first');

  const $ = id => document.getElementById(id);
  let reports = [];
  let aggregate = null;

  const fmtMs = value => Number.isFinite(value) ? `${(value / 1000).toFixed(value >= 10000 ? 1 : 2)} s` : '—';
  const fmt = value => value === null || value === undefined ? '—' : String(value);
  const pct = value => Number.isFinite(value) ? `${value}%` : '—';

  function metricRows() {
    return [
      ['Sessions', g => g.sessions],
      ['Attempts', g => g.attempts],
      ['Completion rate', g => pct(g.completionRate)],
      ['Median first command', g => fmtMs(g.timeToFirstCommandMs.median)],
      ['Median mission duration', g => fmtMs(g.durationMs.median)],
      ['Hints / attempt', g => fmt(g.perAttempt.hints)],
      ['Inspections / attempt', g => fmt(g.perAttempt.inspections)],
      ['Unsafe / attempt', g => fmt(g.perAttempt.unsafe)],
      ['Detours / attempt', g => fmt(g.perAttempt.detours)],
      ['Wrong / attempt', g => fmt(g.perAttempt.wrong)],
      ['Assessment avg', g => fmt(g.assessment.averageTotal)],
      ['Assessment pass rate', g => pct(g.assessment.passRate)],
      ['Judgment avg', g => fmt(g.assessment.axes.judgment.average)],
      ['Safety avg', g => fmt(g.assessment.axes.safety.average)],
      ['Evidence avg', g => fmt(g.assessment.axes.evidence.average)],
      ['Efficiency avg', g => fmt(g.assessment.axes.efficiency.average)]
    ];
  }

  function renderGroupCards() {
    const root = $('groupSummary');
    root.innerHTML = '';
    for (const group of aggregator.GROUPS) {
      const data = aggregate.groups[group];
      const card = document.createElement('article');
      card.className = 'panel group-card';
      card.innerHTML = `<p class="eyebrow">${group.toUpperCase()}</p><h2>${data.sessions} sessions</h2>
        <div class="metric-pairs">
          <div><span>Completion</span><strong>${pct(data.completionRate)}</strong></div>
          <div><span>First command</span><strong>${fmtMs(data.timeToFirstCommandMs.median)}</strong></div>
          <div><span>Unsafe / attempt</span><strong>${fmt(data.perAttempt.unsafe)}</strong></div>
          <div><span>Assessment</span><strong>${fmt(data.assessment.averageTotal)}</strong></div>
        </div>`;
      root.appendChild(card);
    }
  }

  function renderComparison() {
    const body = $('comparisonTable').querySelector('tbody');
    body.innerHTML = '';
    for (const [label, getter] of metricRows()) {
      const row = document.createElement('tr');
      const cells = [label, ...aggregator.GROUPS.map(group => getter(aggregate.groups[group]))];
      row.innerHTML = cells.map((value, index) => index === 0 ? `<th>${value}</th>` : `<td>${value}</td>`).join('');
      body.appendChild(row);
    }
  }

  function renderMissions() {
    const body = $('missionTable').querySelector('tbody');
    body.innerHTML = '';
    const ranked = [...aggregate.missions].sort((a, b) => {
      const unsafeDelta = (b.unsafePerAttempt || 0) - (a.unsafePerAttempt || 0);
      if (unsafeDelta) return unsafeDelta;
      const completionDelta = (a.completionRate ?? 100) - (b.completionRate ?? 100);
      if (completionDelta) return completionDelta;
      return (b.hintsPerAttempt || 0) - (a.hintsPerAttempt || 0);
    });
    for (const mission of ranked) {
      const row = document.createElement('tr');
      row.innerHTML = `<th><code>${mission.missionId}</code></th><td>${mission.track}</td><td>${mission.attempts}</td><td>${pct(mission.completionRate)}</td><td>${fmtMs(mission.medianFirstCommandMs)}</td><td>${fmt(mission.hintsPerAttempt)}</td><td>${fmt(mission.unsafePerAttempt)}</td><td>${fmt(mission.assessmentAverage)}</td>`;
      body.appendChild(row);
    }
  }

  function render() {
    aggregate = aggregator.aggregateReports(reports);
    const rejected = aggregate.rejectedReports.length;
    $('loadStatus').textContent = `${aggregate.acceptedReports} reports accepted${rejected ? ` · ${rejected} rejected` : ''}.`;
    $('exportAggregate').disabled = aggregate.acceptedReports === 0;
    renderGroupCards();
    renderComparison();
    renderMissions();
  }

  async function loadFiles(fileList) {
    const loaded = [];
    for (const file of fileList) {
      try {
        loaded.push(JSON.parse(await file.text()));
      } catch {
        loaded.push({ sessionId: file.name, schemaVersion: null, attempts: null });
      }
    }
    reports = loaded;
    render();
  }

  function exportAggregate() {
    if (!aggregate || !aggregate.acceptedReports) return;
    const blob = new Blob([JSON.stringify(aggregate, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `git-adventures-aggregate-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  $('reportFiles').addEventListener('change', event => loadFiles(event.target.files));
  $('clearReports').addEventListener('click', () => {
    reports = [];
    aggregate = aggregator.aggregateReports([]);
    $('reportFiles').value = '';
    render();
  });
  $('exportAggregate').addEventListener('click', exportAggregate);

  render();
})();
