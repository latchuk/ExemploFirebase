import { TestBed } from '@angular/core/testing';

import { ProdutosService as ProdutosService } from './produtos.service';

describe('ProdutoService', () => {
    let service: ProdutosService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProdutosService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
