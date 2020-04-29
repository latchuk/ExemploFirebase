import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from './models/produto.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.atualizarLista();
  }

  async adicionar() {

    const novoProduto = {
      descricao: 'Novo produto - ' + new Date()
    } as Produto;

    await this.firestore.collection<Produto>('produtos').add(novoProduto);

    this.atualizarLista();
  }

  atualizarLista() {

    this.firestore.collection<Produto>('produtos').get()
      .toPromise()
      .then(documentData => {

        // for (const doc of documentData.docs) {
        //   const dados = doc.data();

        //   const produto = new Produto();
        //   produto.id = doc.id;
        //   produto.descricao = dados.descricao;

        //   this.produtos.push(produto);

        // }

        this.produtos = documentData.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as Produto;
        });

      })
      .catch(erro => {
        console.log('ERRO: ');
        console.log(erro);
      });

  }

}

