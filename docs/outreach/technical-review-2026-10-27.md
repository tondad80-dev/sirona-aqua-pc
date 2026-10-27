# Tera technical review and Arduino Forum reply — 27 October 2026

This is a documentation review of the historical component list and public manufacturer documentation. No physical wiring, current draw, power-cycle behaviour or automatic control was tested.

## Outcome

Published as **tondad80**, replying directly to **Railroader, post #2**:
https://forum.arduino.cc/t/before-automating-a-nepenthes-terrarium-sensor-placement-and-failure-handling-for-an-esp32-controller/1465328/4

The browser verified author, exact reply text, parent relationship and public visibility. This was a request for component datasheets, not independent validation of the design. No duplicate was submitted.

## Findings from the historical parts review

- The old ESP32 / BME280 / relay / MOSFET / fan list is historical background, not the current bill of materials or a confirmed selection.
- BME280's non-condensing operating condition is a material limitation in a fogged enclosure. Its stated ±3 %RH accuracy has defined temperature/humidity conditions.
- D4184 on-resistance is not guaranteed at 3.3 V in the linked manufacturer datasheet. Identify the actual HW-532 circuit and any gate driver before deciding GPIO compatibility. A generic 5 V low-trigger relay also needs its own input specifications.
- Identify the fogger and adapter, including AC/DC output and current, and the fans' model/current/wiring before choosing output stages.
- The lamp requires genuinely dry placement under its manufacturer's instructions. External PWM compatibility and behaviour after power interruption remain unverified.
- Begin with identified components and logging. Startup/reset behaviour, sensor loss and maximum fogging duration are proposed tests, not reported results.

## Public primary sources used

- REPTI PLANET 007-43802 instructions: https://reptiplanet.pet/portfolio-items/repti-planet-led-light-lamp-6w/
- Espressif ESP32-WROOM-32 module datasheet (not documentation for the unidentified development-board PCB): https://documentation.espressif.com/esp32-wroom-32_datasheet_en.html
- Bosch BME280 datasheet, humidity specifications and non-condensing footnote: https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme280-ds002.pdf
- AOS AOD4184/AOI4184 datasheet: https://www.aosmd.com/res/data_sheets/AOI4184.pdf

## Current corrected reply

At the user's request, post #4 was edited in place on 27 October 2026 to distinguish historical planning from the present build. The browser verified the saved correction, public visibility, retained author/post/parent relationship and manufacturer links. Post #5 was unchanged.

**Correction — 27 October 2026**

I should clarify the basis of my earlier reply: I used an old planning document when answering which components are intended. The BME280, HW-532/D4184 module, generic 5 V relay and two 12 V fans were historical suggestions. **They are not confirmed as the selected or installed hardware for the present Tera build.**

What actually exists is the terrarium with Nepenthes ‘Gaya’, the REPTI PLANET 007-43802 6 W light with its original adapter/controller, an ultrasonic fogger and a standalone thermometer/hygrometer.

The current aim is to control the existing light and fogger and add appropriate ventilation and monitoring. The final controller, sensors and output stages remain under consideration. ESP32 is a proposed platform; I am not claiming a working automatic control system or completed hardware tests. There is no waterfall, stream or circulation pump. Any revised component suggestions are also proposals, not a confirmed replacement bill of materials.

The manufacturer links from my earlier reply remain relevant as background, with these limits:

- [REPTI PLANET instructions](https://reptiplanet.pet/portfolio-items/repti-planet-led-light-lamp-6w/): the lamp requires dry placement; its behaviour after power is restored still needs testing.
- [BME280 datasheet](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme280-ds002.pdf): non-condensing operation.
- [AOD4184/AOI4184 datasheet](https://www.aosmd.com/res/data_sheets/AOI4184.pdf): no guaranteed on-resistance at 3.3 V. The exact module circuit matters.
- [Espressif module datasheet](https://documentation.espressif.com/esp32-wroom-32_datasheet_en.html): this does not identify the exact development board or shield.

The fogger’s actual model and adapter must be checked directly; the old “24 V” entry is not verification of the present unit.

I use AI for research and drafting, but the design must be supported by manufacturer specifications and measurements. I should have separated historical ideas from the current build more clearly.

## Original reply — superseded by the correction above

This text records the first publication for traceability. It is not the current forum wording or a component selection.

Thanks — asking for datasheets is fair. I checked the original parts list against manufacturer documentation; here is what is known and what is still missing.

**Existing equipment**
- **Light: REPTI PLANET 007-43802, 6 W**, with its original 12 V DC / max. 0.5 A adapter and touch controller. [Manufacturer specifications and instructions](https://reptiplanet.pet/portfolio-items/repti-planet-led-light-lamp-6w/). The instructions specify a non-waterproof lamp and prohibit use in damp conditions, so it needs a dry location outside the fogged enclosure. They do not specify an external PWM interface or explicitly guarantee the state after a power interruption. I have not tested that behaviour.
- **Ultrasonic fogger:** present, but its exact model and adapter output still need identifying. The old list only says “24 V with adapter”; that does not establish AC versus DC or current. I cannot provide a matching datasheet or choose its switching stage from that description.

**Historical candidates — not a verified circuit**
- **ESP32-WROOM-32 development board, 38 pins, plus screw-terminal shield.** [Espressif module datasheet](https://documentation.espressif.com/esp32-wroom-32_datasheet_en.html). That documents the module, not the unidentified development board or shield. The shield is intended as a terminal breakout, not a load driver.
- **BME280 breakout, proposed I²C at 3.3 V.** [Bosch datasheet](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme280-ds002.pdf). Its humidity operating range is explicitly non-condensing, and ±3 %RH is specified at 25 °C and 20–80 %RH. This makes a bare breakout questionable near the fogger; sensor packaging and placement need resolving before closed-loop control. The exact breakout and its pull-up voltages also need checking.
- **HW-532 / D4184 MOSFET module and a generic “5 V low-trigger” relay.** Neither description proves compatibility with 3.3 V GPIO. [AOD4184/AOI4184 datasheet](https://www.aosmd.com/res/data_sheets/AOI4184.pdf) specifies on-resistance at 4.5 V and 10 V, not 3.3 V. The exact module circuit, including any gate driver, matters. The relay module likewise needs an identifiable schematic and input specifications.
- **Two proposed 40 × 40 × 10 mm, 12 V fans:** model, current and wire count are missing. No matching datasheet yet.

I do not have a completed wiring diagram or measured automatic-control results. The next step is identifying these parts and logging sensor readings; automatic outputs would follow only after checking the output stages and testing startup, sensor-loss and fogging-time-limit behaviour.

On AI: an AI opinion alone is not technical evidence. I use it for research and drafting, and I am responsible for checking what I post. Manufacturer specifications and actual measurements should be the basis for discussing this design.

## Other feedback

TomGeorge's post #3 welcomed the project and asked about the author's electronics, programming, Arduino and hardware experience. After the user explicitly supplied that they are beginning and want to improve, tondad80 answered in [post #5](https://forum.arduino.cc/t/before-automating-a-nepenthes-terrarium-sensor-placement-and-failure-handling-for-an-esp32-controller/1465328/5). The correction to post #4 did not change that answer.
