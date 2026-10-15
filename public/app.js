(() => {
  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const languageButton = document.querySelector('#language-toggle');
  const motionButton = document.querySelector('#motion-toggle');
  const motionLabel = document.querySelector('#motion-label');
  let language = 'zh';
  let motionEnabled = !reducedMotion.matches;
  const readPreference = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const savePreference = (key,value) => { try { localStorage.setItem(key,value); } catch {} };
  language = readPreference('river-language') === 'en' ? 'en' : 'zh';
  const savedMotion = readPreference('river-motion');
  if (savedMotion !== null) motionEnabled = savedMotion === 'on';

  function renderPreferences() {
    root.dataset.language = language;
    root.lang = language === 'en' ? 'en' : 'zh-CN';
    languageButton.innerHTML = `${language === 'en' ? '中文' : 'EN'} <span aria-hidden="true">↗</span>`;
    languageButton.setAttribute('aria-label', language === 'en' ? '切换为中文' : 'Switch to English');
    body.classList.toggle('motion-paused', !motionEnabled);
    body.classList.toggle('motion-enabled', motionEnabled);
    motionButton.setAttribute('aria-pressed', String(motionEnabled));
    motionLabel.textContent = language === 'en' ? (motionEnabled ? 'Motion on' : 'Motion off') : (motionEnabled ? '动画开启' : '动画暂停');
    motionButton.setAttribute('aria-label', language === 'en' ? (motionEnabled ? 'Pause animations' : 'Enable animations') : (motionEnabled ? '暂停动画' : '开启动画'));
    if (!motionEnabled) { root.style.setProperty('--px','0px'); root.style.setProperty('--py','0px'); }
  }
  renderPreferences();
  languageButton.addEventListener('click', () => { language = language === 'zh' ? 'en' : 'zh'; savePreference('river-language',language); renderPreferences(); });
  motionButton.addEventListener('click', () => { motionEnabled = !motionEnabled; savePreference('river-motion',motionEnabled ? 'on' : 'off'); renderPreferences(); });
  reducedMotion.addEventListener('change',event => { if (readPreference('river-motion') === null) { motionEnabled = !event.matches; renderPreferences(); } });

})();
