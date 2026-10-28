[English documentation](README.md) · [Anglický web](https://sirona-living-systems.upbeatcomet6.chatgpt.site/en.html) · [Veřejná zpětná vazba](https://github.com/tondad80-dev/sirona-aqua-pc/issues/1)

# SIRONA — Technologie v rytmu života

Prezentační stránka projektu **Sirona — systém řízení prostředí**. **Tera** je větev pro řízení prostředí **terárií**. **Aqua** je větev pro řízení prostředí **akvárií**. Jde o dvě specializace společného systému, nikoli o rozdělení na fyzické tělo a digitální vrstvu. Toto vymezení vychází z přímého upřesnění autora z 26. 10. 2026.

## Spuštění

Statický web bez sestavení a bez závislostí: otevřete `index.html`, nebo adresář obslužte libovolným statickým HTTP serverem. Fonty se volitelně načítají z Google Fonts; při nedostupnosti funguje systémový sans-serif.

- `index.html` — český obsah, přístupná navigace a struktura.
- `style.css` — responzivní tmavý botanický design, reduced-motion varianta.
- `script.js` — průvodce návrhem terária, mobilní menu a výukový výpočet VPD.
- `assets/terrarium-fog.webp` a `assets/aquarium.webp` — AI koncepční vizualizace terarijní a akvarijní větve, nikoli fotografie existujících pilotů.
- `assets/sirona.svg` — značka odvozená z původního trojúhelníkového symbolu.

## Skutečnost a vize

Stav obsahu k 26. říjnu 2026. Doložený fyzický základ: terárium, láčkovka označená Nepenthes ‘Gaya’, 6W LED, mlžič a samostatný teploměr/vlhkoměr. Skalka a zakrytí techniky jsou návrh k realizaci. Autor 26. 10. 2026 výslovně zvolil pouze mlžič: bez vodopádu, potůčku, otevřené vodní plochy a oběhového čerpadla. Voda zůstává v nádobě mlžiče; návrh zachovává drenáž a odvodnění kořenového prostoru. Automatická telemetrie ani autonomní řízení prvního pilotu nejsou tímto webem doloženy.

Panel **Tera** s VPD vzduchu je výslovně označený **výukový model**. Vstupy jsou lokální hodnoty posuvníků; není připojen hardware ani MQTT broker a nic se nespíná. Původní náhodná „ONLINE“ data a neexistující odkaz `/dashboard` byly odstraněny.

Výpočet VPD vzduchu (kPa):

```
es = 0.6108 * exp(17.27 * T / (T + 237.3))
VPD = es * (1 - RH / 100)
```

T je teplota vzduchu v °C. Model nepočítá teplotu listu a neurčuje vhodný pěstební rozsah. Dekorativní křivka není historická telemetrie. VPD je zde ukázka pro vzduch v teráriu, nikoli akvarijní parametr. Aqua má vlastní sekci zaměřenou na vodní prostředí, světlo, filtraci a cirkulaci.

## Obnovená simulace Aqua — 28. října 2026

Samostatná, místně otestovaná rekonstrukce historické aplikace Aqua obsahuje deterministický simulátor, místní MQTT broker a panel Next.js. Veřejný [balík simulace](simulation/README.md) nabízí pouze záznam **50 syntetických vzorků**, offline HTML prohlížeč a manifest SHA-256 s označením zdrojové revize.

Stáhněte složku `simulation/` a otevřete v ní `index.html`. GitHub u HTML souboru zobrazuje zdrojový kód, nikoli spuštěný panel. Ukázka není připojena k hardwaru a neověřuje automatizaci Tera, řízení akvária ani biologické výsledky. Přesná shoda s dosud neprohlédnutou verzí na lokálním disku není potvrzena. Tento balík sám neaktualizuje samostatně hostovaný web uvedený výše.

## Obsahové podklady

Stránka vychází z aktuálního projektového přehledu Sirony, návrhu Tera z 26. 10. 2026, historického master plánu a softwarové rekapitulace Aqua. Soukromé podklady, korespondence a osobní kontakty nejsou součástí repozitáře. Aktuální návrh s ‘Gaya’ má přednost před historickým plánem s N. ampullaria. Historické rozměry nejsou prezentovány jako změřené rozměry současné nádrže.

## Vizuální assety

Hero byl vytvořen vestavěným nástrojem ImageGen a optimalizován do WebP. Brief: filmová botanická vizualizace skleněného terária s láčkovkou, tmavou břidlicí, mechem, dutým dřevem a jemnou mlhou; tmavé zelené pozadí s místem pro text; technika skrytá, bez textu a bez lidí. Opravený Tera brief: odstranit všechny vodopády, potůček a jezírko, nahradit je pěstebními terasami; přidat jasně viditelnou, průsvitnou mlhu ze skrytého mlžiče mezi břidlicí. Ilustrace jsou na stránce označené jako koncepční. Doplněný Aqua brief: filmová vizualizace osázeného sladkovodního akvária, vodní rostliny, břidlice, dřevo, drobné ryby, čistá voda a tmavě zelené pozadí; bez mlhy, suchozemských rostlin, nápisů a viditelné elektroniky.

## Hranice projektu

> **Status: STANDALONE STATIC-WEB PROTOTYPE / PROJECT PRESENTATION**
>
> This repository is independent from the current ProcessCore, QCore, AgriCore, TDK and Golden project families. It must not be treated as their project-state authority. The website does not implement the historical Next.js/MQTT application.
