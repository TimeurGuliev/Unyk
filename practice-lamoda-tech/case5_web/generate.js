const fs = require('node:fs');
const path = require('node:path');

// Источник контента: публичный сайт Lamoda Tech; юридическое название — данные ТЗ.
const organization = {
  name: 'ООО «ЛАМОДА ТЕХ»',
  legalName: 'Общество с ограниченной ответственностью «ЛАМОДА ТЕХ»',
  description: 'Lamoda Tech разрабатывает цифровые продукты для fashion e-commerce и retail в Lamoda. На сайте команды представлены проекты, направления работы и технологии.',
  link: 'https://latech.ru/'
};
const variants = [
  ['Arial', 'sample-arial'],
  ['Georgia', 'sample-georgia'],
  ['Verdana', 'sample-verdana'],
  ['Times New Roman', 'sample-times'],
  ['Courier New', 'sample-courier']
];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const fontSamples = variants.map(([name, cssClass], index) => `<article class="font-sample ${cssClass}"><div class="sample-label"><span>0${index + 1}</span><strong>${escapeHTML(name)}</strong></div><p>Цифровые продукты для моды и технологий.</p></article>`).join('\n');
const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Учебная страница об организации практики и примерах шрифтов">
  <title>Организация практики — ЛАМОДА ТЕХ</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="top"><a href="#main" class="brand">ПРАКТИКА / 2026</a><a href="#fonts">Шрифты <span aria-hidden="true">↗</span></a></header>
  <main id="main">
    <section class="hero">
      <p class="eyebrow">ИНФОРМАЦИОННЫЕ СИСТЕМЫ И ТЕХНОЛОГИИ <span> / 05</span></p>
      <h1>Наименование организации на базе, которой Вы проходите практическую подготовку</h1>
      <p class="company">${escapeHTML(organization.name)}</p>
      <div class="hero-bottom"><p>Учебная страница о компании и типографике</p><a href="#about">Об организации <span aria-hidden="true">↓</span></a></div>
    </section>
    <section class="about section" id="about">
      <div class="section-heading"><p class="eyebrow">01 / ОРГАНИЗАЦИЯ</p><h2>Технологии<br>для моды</h2></div>
      <div class="about-content"><p class="lead">${escapeHTML(organization.description)}</p>
      <dl><div><dt>Полное название</dt><dd>${escapeHTML(organization.legalName)}</dd></div><div><dt>Организационно-правовая форма</dt><dd>Общество с ограниченной ответственностью</dd></div><div><dt>Источник</dt><dd><a href="${organization.link}">Официальный сайт Lamoda Tech ↗</a></dd></div></dl>
      <p class="note">Наименование и правовая форма приведены по исходным данным задания. Страница создана в учебных целях.</p></div>
    </section>
    <section class="fonts section" id="fonts">
      <div class="section-heading"><p class="eyebrow">02 / ТИПОГРАФИКА</p><h2>Пять вариантов<br>шрифта</h2></div>
      <div class="font-content"><p class="lead">Один текст — пять разных характеров. Сравните, как меняется его восприятие.</p><p class="note">Основной текст страницы набран системным шрифтом sans-serif. Фирменный шрифт Lamoda Tech требует уточнения: его название не установлено по доступным материалам. Примеры используют локальные шрифты и могут заменяться браузером, если они не установлены.</p>
      <div class="font-list">${fontSamples}</div></div>
    </section>
  </main>
  <footer><p>УЧЕБНАЯ ПРАКТИКА / КЕЙС 05</p><a href="#main">Наверх ↑</a></footer>
</body>
</html>\n`;
const css = `:root{color-scheme:light;--ink:#171819;--paper:#f4f3ef;--line:#cac9c3;--accent:#fd5a38}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:system-ui,-apple-system,"Segoe UI",sans-serif}a{color:inherit;text-underline-offset:4px}a:focus-visible{outline:3px solid var(--accent);outline-offset:4px}.top{display:flex;align-items:center;justify-content:space-between;padding:24px 5vw;border-bottom:1px solid var(--line);font-size:12px;font-weight:700;letter-spacing:.08em}.top a{text-decoration:none}.brand{letter-spacing:.12em}.hero{padding:7vw 5vw 0;min-height:590px;display:flex;flex-direction:column}.eyebrow{font-size:11px;font-weight:700;letter-spacing:.13em;line-height:1.5}.eyebrow span{color:#777}.hero h1{max-width:880px;font-size:clamp(22px,3.2vw,44px);line-height:1.16;font-weight:450;letter-spacing:-.035em;margin:50px 0 20px}.company{font-size:clamp(46px,8.7vw,130px);line-height:.95;letter-spacing:-.065em;font-weight:750;margin:0 0 70px;max-width:1200px}.hero-bottom{margin-top:auto;display:flex;justify-content:space-between;align-items:end;padding:18px 0;border-top:1px solid var(--ink);font-size:14px}.hero-bottom p{margin:0}.section{padding:100px 5vw;display:grid;grid-template-columns:1fr 1.2fr;gap:8vw;border-top:1px solid var(--line)}h2{font-size:clamp(42px,5vw,74px);letter-spacing:-.055em;line-height:1.02;margin:28px 0 0}.lead{font-size:clamp(21px,2.3vw,30px);line-height:1.35;letter-spacing:-.025em;margin:0 0 42px;max-width:720px}.about{background:#e6e6e0}dl{margin:0}dl div{display:grid;grid-template-columns:1fr 1.5fr;gap:20px;border-top:1px solid #aaa;padding:16px 0;font-size:14px;line-height:1.5}dt{color:#565853}dd{margin:0}.note{font-size:13px;line-height:1.6;color:#595b56;max-width:680px}.fonts .note{margin:0 0 36px}.font-list{border-top:1px solid var(--ink)}.font-sample{padding:18px 0 22px;border-bottom:1px solid var(--line)}.sample-label{display:flex;gap:25px;align-items:center;font:700 11px system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase}.sample-label span{color:#888}.font-sample p{font-size:clamp(20px,2.2vw,29px);margin:18px 0 0;line-height:1.3}.sample-arial{font-family:Arial,sans-serif}.sample-georgia{font-family:Georgia,serif}.sample-verdana{font-family:Verdana,sans-serif}.sample-times{font-family:"Times New Roman",serif}.sample-courier{font-family:"Courier New",monospace}footer{background:var(--ink);color:white;display:flex;justify-content:space-between;align-items:center;padding:36px 5vw;font-size:11px;letter-spacing:.08em}footer p{margin:0}@media(max-width:700px){.top{padding:20px 5vw}.hero{min-height:520px;padding-top:60px}.hero h1{margin-top:40px}.company{overflow-wrap:anywhere;margin-bottom:55px}.hero-bottom{gap:24px;align-items:flex-start}.section{grid-template-columns:1fr;gap:40px;padding-top:70px;padding-bottom:70px}h2{margin-top:18px}dl div{grid-template-columns:1fr;gap:4px}.lead{margin-bottom:30px}footer{gap:20px}}
`;
const output = path.join(__dirname, 'output');
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(output, 'styles.css'), css, 'utf8');
console.log('Созданы output/index.html и output/styles.css');

