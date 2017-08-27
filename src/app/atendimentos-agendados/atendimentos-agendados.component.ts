import { EventService } from '../services/event.service';
import { Component, OnInit } from '@angular/core';
import { ScheduleModule } from 'primeng/primeng';

declare let jQuery: any;

@Component({
  selector: 'app-atendimentos-agendados',
  templateUrl: './atendimentos-agendados.component.html',
  styleUrls: ['./atendimentos-agendados.component.css']
})
export class AtendimentosAgendadosComponent implements OnInit {

  events: any[];
  header: any;
  locale: any;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.locale = 'pt-br';
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };

    this.events = [
      {
        'title': 'All Day Event',
        'start': '2017-08-01'
      },
      {
        'title': 'Long Event',
        'start': '2017-08-07',
        'end': '2017-08-10'
      },
      {
        'title': 'Repeating Event',
        'start': '2017-08-09T08'
      },
      {
        'title': 'Repeating Event',
        'start': '2017-08-09T15'
      },
      {
        'title': 'Repeating Event',
        'start': '2017-08-16T16:00:00'
      },
      {
        'title': 'Conference',
        'start': '2017-08-11',
        'end': '2017-08-13'
      }
    ];

    this.eventService.getEvents().then(events => {this.events = events;});
  }

}
