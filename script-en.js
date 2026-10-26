'use strict';
const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');
const format = (value, digits = 1) => value.toLocaleString('en-GB', {minimumFractionDigits: digits, maximumFractionDigits: digits});
function updateModel() {
  const t = Number(temperature.value);
  const rh = Number(humidity.value);
  const vpd = 0.6108 * Math.exp((17.27 * t) / (t + 237.3)) * (1 - rh / 100);
  document.querySelector('#temperature-output').textContent = format(t) + ' °C';
  document.querySelector('#humidity-output').textContent = format(rh, 0) + ' %';
  document.querySelector('#vpd-output').textContent = format(vpd, 2);
  document.querySelector('#model-insight').textContent = rh === 100
    ? 'At 100% relative humidity, the air is saturated and calculated VPD is zero.'
    : 'In this model, air at ' + format(t) + ' °C and ' + format(rh, 0) + '% RH has a VPD of ' + format(vpd, 2) + ' kPa. Higher VPD means greater drying potential.';
}
temperature.addEventListener('input', updateModel);
humidity.addEventListener('input', updateModel);
document.querySelector('#reset-model').addEventListener('click', () => {temperature.value = '21.3'; humidity.value = '76'; updateModel();});
updateModel();
const details = {
 plant: {number: '01', title: 'A pitcher plant at the centre', text: 'The first pilot centres on a pitcher plant labelled Nepenthes ‘Gaya’. The concept places it in an airy planting hollow in wood, leaving room for hanging pitchers and free drainage.'},
 rock: {number: '02', title: 'A small landscape, real relationships', text: 'Local slate forms low planting terraces. Sphagnum with perlite, wood and moss create a natural planting landscape. The concept includes drainage and access to remove excess water.'},
 fog: {number: '03', title: 'Equipment makes room for nature', text: 'The terrarium will use only a fogger, with no waterfall, stream or circulation pump. Removable bark and moss conceal the fogger while keeping its container accessible for refilling and removal. Maintenance access must be checked in a dry fit.'}
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
function closeMenu() {menu.setAttribute('aria-expanded', 'false');menu.setAttribute('aria-label', 'Open menu');mobileNav.hidden = true;}
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded', String(open));menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');mobileNav.hidden = !open;});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {if (event.key === 'Escape') closeMenu();});
