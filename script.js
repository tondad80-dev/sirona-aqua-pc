'use strict';
const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');
const format = (value, digits = 1) => value.toLocaleString('cs-CZ', {minimumFractionDigits: digits, maximumFractionDigits: digits});
function updateModel() {
  const t = Number(temperature.value);
  const rh = Number(humidity.value);
  const vpd = 0.6108 * Math.exp((17.27 * t) / (t + 237.3)) * (1 - rh / 100);
  document.querySelector('#temperature-output').textContent = format(t) + ' °C';
  document.querySelector('#humidity-output').textContent = format(rh, 0) + ' %';
  document.querySelector('#vpd-output').textContent = format(vpd, 2);
  document.querySelector('#model-insight').textContent = rh === 100
    ? 'Při 100% relativní vlhkosti je vzduch nasycený a vypočtené VPD je nulové.'
    : 'V tomto modelu má vzduch při ' + format(t) + ' °C a ' + format(rh, 0) + ' % RH VPD ' + format(vpd, 2) + ' kPa. Vyšší VPD znamená větší vysušující působení vzduchu.';
}
temperature.addEventListener('input', updateModel);
humidity.addEventListener('input', updateModel);
document.querySelector('#reset-model').addEventListener('click', () => {temperature.value = '21.3'; humidity.value = '76'; updateModel();});
updateModel();
const details = {
 plant: {number: '01', title: 'Láčkovka jako živé centrum', text: 'První pilot vzniká kolem láčkovky označené Nepenthes ‘Gaya’. V návrhu ji usazujeme do vzdušné dutiny dřeva, s volným prostorem pro láčky a odtokem přebytečné vody.'},
 rock: {number: '02', title: 'Malá krajina, skutečné souvislosti', text: 'Místní břidlice tvoří nízké terasy. Rašeliník s perlitem, dřevo a mech mají vytvořit přirozenou pěstební skalku. Návrh počítá s drenáží a možností odsát přebytečnou vodu.'},
 fog: {number: '03', title: 'Technika ustupuje přírodě', text: 'Terárium využije pouze mlžič, bez vodopádu, potůčku nebo oběhového čerpadla. Celý mlžný set má skrýt odnímatelná kulisa z kůry a mechu. Nádoba přitom zůstane přístupná pro dolévání i úplné vyjmutí. Servisní přístup je třeba ověřit při sestavení nasucho.'}
};
document.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => {
  const detail = details[button.dataset.detail];
  document.querySelectorAll('[data-detail]').forEach(item => {item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button));});
  document.querySelector('#detail-number').textContent = detail.number;
  document.querySelector('#detail-title').textContent = detail.title;
  document.querySelector('#detail-text').textContent = detail.text;
}));
const menu = document.querySelector('.menu');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {menu.setAttribute('aria-expanded', 'false');menu.setAttribute('aria-label', 'Otevřít menu');mobileNav.hidden = true;}
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded', String(open));menu.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');mobileNav.hidden = !open;});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {if (event.key === 'Escape') closeMenu();});
