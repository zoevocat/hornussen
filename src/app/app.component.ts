import {Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MqttService} from './core/services/mqtt.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hornussen';
  istGestartet = false;
  inputWeite: number = 0;
  isWeiteValid: boolean = true;
  hasTouched: boolean = false;
  isWeiteEingestellt: boolean = false;
  ladeAnimation = false;
  countdown = 20;
  private countdownInterval: any;
  meldung: string | null = null;

  constructor(private mqttService: MqttService) {
  }

  start() {
    this.mqttService.connect();
    this.istGestartet = true;
    this.zeigeMeldung("Bereit!");
  }

  weite() {
    const payload = JSON.stringify({weite: this.inputWeite})
    this.mqttService.publish('hornussen/weite', payload);
    this.isWeiteEingestellt = true;

    this.zeigeMeldung(`Weite: ${this.inputWeite} Meter wurde übermittelt!`);
  }

  validateWeite() {
    this.hasTouched = true;
    if (this.inputWeite === null || this.inputWeite <= 0 || this.inputWeite > 300) {
      this.isWeiteValid = false;
    } else {
      this.isWeiteValid = true;
    }
  }

  abschuss() {
    const payload = JSON.stringify({ abschuss: 1});
    this.mqttService.publish('hornussen/abschuss', payload);

    this.zeigeMeldung(`Befehl: Abschuss wurde übermittelt!`);
    this.ladeAnimation = true;
    this.countdown = 20;

    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(this.countdownInterval);
        this.ladeAnimation = false;
      }
    }, 1000);
  }

  zeigeMeldung(msg: string) {
    this.meldung = msg;
    setTimeout(() => {
      this.meldung = null; // Meldung nach 5 Sekunden ausblenden
    }, 5000);
  }
}
