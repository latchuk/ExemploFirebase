import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface Produto {
  id: string;
  descricao: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ExemploFirebase';

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.firestore.collection<Produto>('produtos').get()
      .toPromise()
      .then(documentData => {

        const produtos = documentData.docs.map(y => {

          return {
            id: y.id,
            ...y.data(),
          } as Produto;

        });

        console.log('DEU CERTO!');
        console.log(documentData);
        console.log(produtos);
      })
      .catch(erro => {
        console.log('ERRO: ');
        console.log(erro);
      });

  }

}
