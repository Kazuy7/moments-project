import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent {
  @Output() onSubmit = new EventEmitter<Moment>(); // Emite um evento com os dados do formulário
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null; // Dados que estão chegando. Null porque só vai existir quando for edição

  momentForm!: FormGroup; // Declarando o formulário

  ngOnInit(): void { // Inicializando o formulário
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [Validators.required]), // Realizando a validação do campo, não pode estar vazio
      description: new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
      image: new FormControl(''),
    });
  }

  get title() { // Pegando o atributo 'title' do momentForm que foi declarado
    return this.momentForm.get('title')!; // Esclamação para garantir que o campo vai existir
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];

    this.momentForm.patchValue({image: file});
  }

  submit() {
    if(this.momentForm.invalid) {
      return;
    }

    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value); // Enviando os dados do formulário para o componente pai pelo onSubmit
  }
}
