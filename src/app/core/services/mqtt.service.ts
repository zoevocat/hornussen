import { Injectable } from '@angular/core';
import mqtt, {MqttClient} from 'mqtt';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  private client!: MqttClient;

  connect() {
    this.client = mqtt.connect('ws://10.42.0.1:8000', {
      username: 'mqttuser',
      password: 'mqttuser',
      connectTimeout: 4000,
      clientId: 'app',
      clean: true
    });
    this.client.on('connect', () => console.log(this.client.connected));
  }

  publish(topic: string, message: string) {
    if (this.client?.connected) {
      this.client.publish(topic, message);
      console.log(`Gesendet an ${topic}: ${message}`);
    } else {
      console.error('MQTT nicht verbunden');
    }
  }
}
