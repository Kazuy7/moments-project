import { Component } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allMoments: Moment[] = []; // Array de todos os momentos
  moments: Moment[] = []; // Array para buscar um momento específico
  baseApiUrl = environment.baseApiUrl

  faSearch = faSearch
  searchTerm: string = '';

  constructor(
    private momentService: MomentService
  ) {}

  ngOnInit():void {
    this.momentService.getMoments().subscribe((items) => { //Chama o método getMoments e efetiva ele com items
      const data= items.data

      data.map((item) => { // Manipulando a data antes de colocar no sistema
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      });

      this.allMoments = data;
      this.moments = data;
    })
  }

  search(e: Event):void { // Evento que está sendo derivado do input

    const target = e.target as HTMLInputElement // Puxando evento do html
    const value = target.value.toLowerCase() // Colocando o valor do evento na variável

    this.moments = this.allMoments.filter((moment) => { // Filtra todos os títulos de acordo com o que foi digitado (value)
      return moment.title.toLowerCase().includes(value);
    })

  }

}
