(() => {
  const config = window.GIT_ADVENTURES_TEST_PRESETS;
  const root = document.getElementById('presetRoot');
  if (!config || !root) return;

  function list(items) {
    const ul = document.createElement('ul');
    for (const item of items) {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    }
    return ul;
  }

  function openMission(group, missionNumber) {
    localStorage.setItem('gitAdventuresMission', String(missionNumber - 1));
    localStorage.setItem('gitAdventuresFacilitatorGroup', group);
    window.location.href = '/';
  }

  for (const group of config.groups) {
    const preset = config.presets[group];
    const card = document.createElement('article');
    card.className = 'panel preset-card';

    const kicker = document.createElement('p');
    kicker.className = 'eyebrow';
    kicker.textContent = `${group.toUpperCase()} · ${preset.targetMinutes} MIN`;

    const title = document.createElement('h2');
    title.textContent = preset.title.en;

    const hypothesis = document.createElement('p');
    hypothesis.className = 'muted';
    hypothesis.textContent = preset.hypothesis.en;

    const missionHeader = document.createElement('h3');
    missionHeader.textContent = 'Mission preset';

    const missionButtons = document.createElement('div');
    missionButtons.className = 'mission-buttons';
    for (const number of preset.missionNumbers) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'button secondary mission-jump';
      button.textContent = `M${number}`;
      button.addEventListener('click', () => openMission(group, number));
      missionButtons.appendChild(button);
    }

    const observeTitle = document.createElement('h3');
    observeTitle.textContent = 'Observe';
    const stopTitle = document.createElement('h3');
    stopTitle.textContent = 'Stop / redesign signals';

    card.append(kicker, title, hypothesis, missionHeader, missionButtons, observeTitle, list(preset.observe.en), stopTitle, list(preset.stopSignals.en));
    root.appendChild(card);
  }
})();
