import {Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MqttService} from './core/services/mqtt.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hornussen';

  inputWeite: number = 0;

  constructor(private mqttService: MqttService) {}

  connectToMqttBroker() {
    this.mqttService.connect();
  }

  weite() {
    const payload = JSON.stringify({weite: this.inputWeite})
    this.mqttService.publish('hornussen/weite', payload);
  }

  abschuss() {
    const payload = JSON.stringify({ abschuss: 1});
    this.mqttService.publish('hornussen/abschuss', payload);
  }
}
