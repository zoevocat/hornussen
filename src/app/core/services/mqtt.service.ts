import {Injectable, NgZone} from '@angular/core';
import mqtt, {MqttClient} from 'mqtt';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  private client!: MqttClient;
  public connected = false;

  connect() {
    if (this.connected) return;

    this.client = mqtt.connect('ws://10.42.0.1:8000', {
      username: 'mqttuser',
      password: 'mqttuser',
      connectTimeout: 4000,
      clientId: 'app',
      clean: true,
      reconnectPeriod: 0
    });
    this.client.on('connect', () => {
      this.connected = true;
      console.log('MQTT connected')
    });

    this.client.on('offline', () => {
      console.warn('MQTT offline');
    });

    this.client.on('error', (error) => {
      console.error('MQTT-Fehler:', error.message);
      this.client.end();
      this.connected = false;
    });
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
