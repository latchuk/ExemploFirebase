import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../models/produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private firestore: AngularFirestore) { }

  getObservable(): Observable<Produto[]> {

    return this.firestore.collection<Produto>('produtos',
      ref => ref.orderBy('descricao')
    ).valueChanges({ idField: 'id' });

  }

  getAll(): Promise<Produto[]> {

    return new Promise<Produto[]>((resolve) => {

      this.firestore.collection<Produto>('produtos',
        ref => ref.orderBy('descricao')
      ).get()
        .toPromise()
        .then(documentData => {

          const produtos = documentData.docs.map(doc => {

            return {
              id: doc.id,
              ...doc.data()
            } as Produto;

          });

          resolve(produtos);

        });

    });

  }

  async add(produto: Produto): Promise<Produto> {
    const docRef = await this.firestore.collection<Produto>('produtos').add(produto);
    const doc = await docRef.get();

    return {
      id: doc.id,
      ...doc.data()
    } as Produto;

  }

  async delete(produto: Produto): Promise<void> {
    await this.firestore.collection('produtos').doc(produto.id).delete();
  }

  async update(produto: Produto): Promise<void> {
    await this.firestore.collection('produtos').doc(produto.id).update(produto);
  }

}
