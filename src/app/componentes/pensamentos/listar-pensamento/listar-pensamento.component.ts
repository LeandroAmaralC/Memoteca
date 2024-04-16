import { Component, OnInit, Input } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

   @Input() filtro: string = ''
   haMaisPensamentos: boolean = true;
   favoritos: boolean = false;
   listaFavoritos: Pensamento[] = []
   titulo: string = 'Meu Mural'
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


  constructor(private service: PensamentoService,
              private  router: Router
  ) { }
  paginaAtual: number = 1;

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos);
      if(!listaPensamentos.length) {
        this.haMaisPensamentos = false
      }
    })
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos
    })
  }

  recarregarComponente() {

    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos'
    this.favoritos = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(lisPensamentosFavoritos => {
      this.listaPensamentos = lisPensamentosFavoritos
      this.listaFavoritos =  lisPensamentosFavoritos
    })
  }

}
