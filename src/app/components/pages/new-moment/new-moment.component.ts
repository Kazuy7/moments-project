import { Component } from '@angular/core';

import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText = 'Compartilhar';

  async createHandler(moment: Moment) { // Tratando os dados que chegam para fazer a inserção no sistema pelo service(Transformando em formData)
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);
    
    if (moment.image) {
      formData.append('image', moment.image);
    }

    //to do


    // enviar para o service


    //exibir mensagem


    // redirect
  }
}
