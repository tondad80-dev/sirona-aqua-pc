# SIRONA — Environment control for living worlds

[English website](https://sirona-living-systems.upbeatcomet6.chatgpt.site/en.html) · [Český web](https://sirona-living-systems.upbeatcomet6.chatgpt.site/) · [Česká dokumentace](README.cs.md) · [Public feedback thread](https://github.com/tondad80-dev/sirona-aqua-pc/issues/1)

**Sirona** is an environment-control project with two specialised branches:

- **Tera:** terrarium environments — air temperature, humidity, lighting, fogging and ventilation.
- **Aqua:** aquarium environments — water monitoring, lighting, filtration and circulation.

The shared system is Sirona. Aqua is not the digital layer for Tera.

## What exists today

As of 26 October 2026, the first Tera pilot has a glass terrarium, a pitcher plant labelled *Nepenthes* ‘Gaya’, a 6 W LED, a fogger and a standalone thermometer/hygrometer. Slate planting terraces, wood and moss are being planned. The terrarium design uses **only a fogger: no waterfall, stream, pond or circulation pump**. The fogger's reservoir remains accessible for refilling and removal. The planting hollow needs free drainage.

The verified software in this repository is a **static presentation website**, with an educational air-VPD calculator. Hardware telemetry, a working ESP32/MQTT connection to this pilot and autonomous control are **not yet verified**. Earlier software notes describe a separate application that is not implemented by this website.

The terrarium and aquarium images are **AI-generated concept visualisations**, not photographs of completed builds. The aquarium branch remains a concept and earlier web prototype, not a verified working aquarium controller.

## We would value practical feedback

1. Where would you place air-temperature and humidity sensors so fog and condensation do not dominate the readings?
2. Which faults should the first controller detect before it is allowed to switch equipment?
3. Which trend, warning or manual override would make this useful in your terrarium or aquarium?

Please share what you have actually observed, distinguish it from a proposed solution, and include the environment and sensor placement where relevant. [Open a feedback issue](https://github.com/tondad80-dev/sirona-aqua-pc/issues/new?template=feedback.md).

## Run locally

Open `index.html` (Czech) or `en.html` (English), or serve the repository with any static HTTP server. No build, package manager or API key is needed. Fonts optionally load from Google Fonts; system fonts provide a fallback.

| File | Purpose |
| --- | --- |
| `index.html`, `en.html` | Czech and English pages with a language switch |
| `style.css` | Shared responsive design, including reduced-motion support |
| `script.js`, `script-en.js` | Localised model, terrarium guide and mobile navigation |
| `assets/terrarium-fog.webp` | Tera concept, with fog and no running water |
| `assets/aquarium.webp` | Aqua concept |
| `docs/outreach/` | Audience-specific draft posts and a publication-status record |

The model uses slider values only, has no sensor connection and switches no equipment. Air VPD is not a leaf measurement or a prescribed growing range. The decorative curve is not historical telemetry.

```text
saturation_vapour_pressure_kPa = 0.6108 * exp(17.27 * T / (T + 237.3))
air_VPD_kPa = saturation_vapour_pressure_kPa * (1 - RH / 100)
```

`T` is air temperature in °C; `RH` is relative humidity in percent.

## Project boundary

This is a standalone Sirona presentation prototype. It is independent of ProcessCore, QCore, AgriCore, TDK and Golden and is not an authority for their project state. Autonomy, digital twins and expansion are development goals, not current capabilities demonstrated by the website.
