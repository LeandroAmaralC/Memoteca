import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {
   haMaisPensamentos: boolean = true;
   listaPensamentos: Pensamento[] = [
  //  {
  //   id: 1,
  //   conteudo: 'Passo informações para o componente filho',
  //   autoria: 'componente pai',
  //   modelo: 'modelo3'
  // },
  // {
  //   id: 2,
  //   conteudo: 'Minha propriedade é decorada com @input',
  //   autoria: 'Componente filho',
  //   modelo: 'modelo3'
  // },
  // {
  //   id: 3,
  //   conteudo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  //   autoria: 'Componente filho',
  //   modelo: 'modelo3'
  // }
]


  constructor(private service: PensamentoService) { }
  paginaAtual: number = 1;

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual)
    .subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos);
      if(!listaPensamentos.length) {
        this.haMaisPensamentos = false
      }
    })
  }

}
