# SIRONA — Technologie v rytmu života

Prezentační stránka samostatného projektu Sirona: první živý pilot **Tera**, plánovaná digitální vrstva **Aqua** a cesta od ruční péče k autonomním mikrobiotopům.

## Spuštění

Statický web bez sestavení a bez závislostí: otevřete `index.html`, nebo adresář obslužte libovolným statickým HTTP serverem. Fonty se volitelně načítají z Google Fonts; při nedostupnosti funguje systémový sans-serif.

- `index.html` — český obsah, přístupná navigace a struktura.
- `style.css` — responzivní tmavý botanický design, reduced-motion varianta.
- `script.js` — průvodce návrhem terária, mobilní menu a výukový výpočet VPD.
- `assets/terrarium.webp` — AI koncepční vizualizace cílového vzhledu, nikoli fotografie existujícího pilotu.
- `assets/sirona.svg` — značka odvozená z původního trojúhelníkového symbolu.

## Skutečnost a vize

Stav obsahu k 26. říjnu 2026. Doložený fyzický základ: terárium, láčkovka označená Nepenthes ‘Gaya’, 6W LED, mlžič a samostatný teploměr/vlhkoměr. Skalka a zakrytí techniky jsou návrh k realizaci. Automatická telemetrie ani autonomní řízení prvního pilotu nejsou tímto webem doloženy.

Panel Aqua je výslovně označený **výukový model**. Vstupy jsou lokální hodnoty posuvníků; není připojen hardware ani MQTT broker a nic se nespíná. Původní náhodná „ONLINE“ data a neexistující odkaz `/dashboard` byly odstraněny.

Výpočet VPD vzduchu (kPa):

```
es = 0.6108 * exp(17.27 * T / (T + 237.3))
VPD = es * (1 - RH / 100)
```

T je teplota vzduchu v °C. Model nepočítá teplotu listu a neurčuje vhodný pěstební rozsah. Dekorativní křivka není historická telemetrie.

## Obsahové podklady

Stránka vychází z aktuálního projektového přehledu Sirony, návrhu Tera z 26. 10. 2026, historického master plánu a softwarové rekapitulace Aqua. Soukromé podklady, korespondence a osobní kontakty nejsou součástí repozitáře. Aktuální návrh s ‘Gaya’ má přednost před historickým plánem s N. ampullaria. Historické rozměry nejsou prezentovány jako změřené rozměry současné nádrže.

## Vizuální asset

Hero byl vytvořen vestavěným nástrojem ImageGen a optimalizován do WebP. Brief: filmová botanická vizualizace skleněného terária s láčkovkou, tmavou břidlicí, mechem, dutým dřevem a jemnou mlhou; tmavé zelené pozadí s místem pro text; technika skrytá, bez textu a bez lidí. Ilustrace je na stránce označena jako koncepční.

## Hranice projektu

> **Status: STANDALONE STATIC-WEB PROTOTYPE / PROJECT PRESENTATION**
>
> This repository is independent from the current ProcessCore, QCore, AgriCore, TDK and Golden project families. It must not be treated as their project-state authority. The website does not implement the historical Next.js/MQTT application.
