import { Component, OnInit } from '@angular/core';
import { Produto } from './models/produto.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProdutosService } from './services/produtos.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // produtos: Produto[] = [];
  produtos: Observable<Produto[]>;

  formulario = new FormGroup({
    descricao: new FormControl(null),
  });

  constructor(
    public produtosService: ProdutosService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.produtos = this.firestore.collection<Produto>('produtos',
      ref => ref.orderBy('descricao')
    ).valueChanges({ idField: 'id' });

    // this.atualizarLista();
  }

  async adicionar() {

    const novoProduto = this.formulario.value as Produto;

    await this.produtosService.add(novoProduto);

    // this.atualizarLista();
  }

  async deletar(produto: Produto) {

    // await this.firestore.collection('produtos').doc(produto.id).delete();

    // this.atualizarLista();
  }

  async editar(produto: Produto) {

    produto.descricao = 'editado' + new Date();

    // await this.firestore.collection('produtos').doc(produto.id).update(produto);

    // this.atualizarLista();
  }

  // atualizarLista() {

  //   this.firestore.collection<Produto>('produtos',
  //     // ref => ref.where('descricao', '==', 'Caneta')
  //     ref => ref.orderBy('descricao')
  //   ).get()
  //     .toPromise()
  //     .then(documentData => {

  //       this.produtos = documentData.docs.map(doc => {
  //         return {
  //           id: doc.id,
  //           ...doc.data()
  //         } as Produto;
  //       });

  //     })
  //     .catch(erro => {
  //       console.log('ERRO: ');
  //       console.log(erro);
  //     });

  // }

}

