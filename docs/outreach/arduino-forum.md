# Draft — Arduino Forum / General Guidance

Status: NOT POSTED. Requires an authenticated author account and a final check of category rules. Proposed destination: https://forum.arduino.cc/ (Projects / General Guidance).

Title: Before automating a Nepenthes terrarium: sensor placement and failure handling for an ESP32 controller?

I'm planning the first control prototype for a small planted terrarium, and I'd appreciate a design critique before I connect any automatic outputs.

This is part of my Sirona project: Tera is the terrarium branch; Aqua is a separate aquarium branch. What actually exists today is a terrarium with a pitcher plant labelled Nepenthes ‘Gaya’, a 6 W LED, an ultrasonic fogger and a standalone thermometer/hygrometer. The ESP32/MQTT monitoring and control path is planned, not verified. The current web page is a static concept presentation and air-VPD calculator, not a working hardware dashboard.

The physical design uses slate planting terraces and a freely draining planting hollow in wood. The fogger will be concealed behind removable bark, accessible for refilling and removal. There is no waterfall, stream or circulation pump.

I want to start with logging and manual care, then test a controller with a maximum fogging duration, cooldown, stale/invalid-reading detection and a way to disable automatic operation. I have not selected or wired the final sensor/actuator set yet.

My questions:

1. How would you place and protect humidity/temperature sensors to avoid direct fog, condensation and bias from the light, while still getting representative readings?
2. Would you start with simple RH hysteresis plus temperature limits and logging, or is calculated air VPD useful at this stage? I am not treating air VPD as leaf VPD.
3. Which failure condition should I test first, and what should the fogger and ventilation do when readings are stale or invalid?

I'd especially value lessons from systems you have actually run. No product is for sale. Background, including clearly labelled AI concept images: https://sirona-living-systems.upbeatcomet6.chatgpt.site/en.html
