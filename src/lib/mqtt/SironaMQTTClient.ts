import mqtt, { MqttClient } from 'mqtt';

class SironaMQTTClient {
  private client: MqttClient | null = null;
  private messageCallbacks: ((topic: string, message: string) => void)[] = [];

  init() {
    if (this.client) return;
    this.client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');
    this.client.on('message', (topic, message) => {
      this.messageCallbacks.forEach(cb => cb(topic, message.toString()));
    });
  }

  subscribe(topic: string) {
    this.client?.subscribe(topic);
  }

  sendCommand(topic: string, command: object) {
    this.client?.publish(topic, JSON.stringify(command));
  }

  onMessage(callback: (topic: string, message: string) => void) {
    this.messageCallbacks.push(callback);
  }
}

export const sironaMQTT = new SironaMQTTClient();