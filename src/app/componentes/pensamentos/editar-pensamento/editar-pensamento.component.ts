import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  pensamento : Pensamento = {
    id : 0,
    conteudo : '',
    autoria: '',
    modelo: ''
  }

  editarFormulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorID(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento

      this.editarFormulario = this.formBuilder.group({
        conteudo: ['', Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])],
        autoria: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        modelo: ['modelo1']
      })
    })
  }

  editarPensamento( ) {
    this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })

  }

  cancelarPensamento( ) {
    this.router.navigate(['/listarPensamento'])

  }


  habilitarBotao() {
    if(this.editarFormulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }


}
