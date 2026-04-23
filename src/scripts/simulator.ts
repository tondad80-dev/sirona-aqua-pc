import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://broker.emqx.io:1883');
const TOPIC_TELEMETRY = "sirona/aqua/telemetry";
const TOPIC_CONTROL = "sirona/aqua/control";

let systemState = { 
  pumpActive: true, 
  ledActive: false,
  ph: 6.70, 
  ec: 1.75, 
  power: 175 
};

console.log("--- SIRONA AQUA EDGE SIMULATOR v1.4 [REACTIVE] ---");

client.on('connect', () => {
  console.log('[SIM]: Connected to EMQX Broker');
  client.subscribe(TOPIC_CONTROL);
});

client.on('message', (topic, message) => {
  try {
    const cmd = JSON.parse(message.toString());
    if (cmd.device === 'pump_01') {
      systemState.pumpActive = (cmd.action === 'ON');
      systemState.power = systemState.pumpActive ? 175 : 0;
      console.log(`[SIM_CMD]: Pump Array -> ${cmd.action}`);
    }
    if (cmd.device === 'led_01') {
      systemState.ledActive = (cmd.action === 'ON');
      console.log(`[SIM_CMD]: LED Array -> ${cmd.action}`);
    }
  } catch (e) { console.error("[SIM_ERR]: Parse Error"); }
});

setInterval(() => {
  // Drift simulace (šum + tendence)
  const noise = () => (Math.random() - 0.5) * 0.05;
  systemState.ph += noise();
  systemState.ec += noise() * 0.25;

  const payload = {
    ph: systemState.ph.toFixed(2),
    ec: systemState.ec.toFixed(2),
    power: systemState.power,
    par: (systemState.ledActive ? 850 + (Math.random()*50) : 450 + (Math.random()*20)).toFixed(0)
  };

  client.publish(TOPIC_TELEMETRY, JSON.stringify(payload));
  const simLog = `[STATUS]: Pump: ${systemState.pumpActive?'ON':'OFF'} | LED: ${systemState.ledActive?'ON':'OFF'} | pH: ${payload.ph} | EC: ${payload.ec}`;
  console.log(simLog);
}, 2000);