import { useEffect, useState } from 'react';

import { formattedPrice } from '../../utils';
import { Container, ModalContainer } from './styles';
import Modal from '../Modal';

interface FormattedProduct {
  id: number;
  name: string;
  total_price: number;
  unit_price: number;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  taxes: {
    icms_st: number;
    ipi: number;
  };
  other: number;
  discount: number;
}

interface TableProps {
  products: Product[];
}

export default function Table({ products }: TableProps) {
  const [formattedProducts, setFormattedProducts] = useState<
    FormattedProduct[]
  >([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function toggleModal() {
    setModalIsOpen((state) => !state);
  }

  useEffect(() => {
    const formatted = products.reduce((acc, product) => {
      const {
        quantity,
        total_price,
        discount,
        other,
        taxes,
        id,
        name,
      } = product;

      const totalPrice =
        total_price + other + taxes.ipi + taxes.icms_st - discount;

      acc.push({
        quantity,
        id,
        name,
        total_price: totalPrice,
        unit_price: totalPrice / (quantity / 100),
      });

      return acc;
    }, [] as FormattedProduct[]);

    setFormattedProducts(formatted);
  }, [products]);

  return (
    <Container>
      <thead>
        <tr>
          <th>código</th>
          <th>nome</th>
          <th>quantidate</th>
          <th>preço unitario</th>
          <th>preço total</th>
        </tr>
      </thead>

      <tbody>
        {formattedProducts.map(
          ({ id, name, quantity, total_price, unit_price }, index) => (
            <tr key={id}>
              <Modal setIsOpen={toggleModal} isOpen={modalIsOpen}>
                <ModalContainer>
                  <div>
                    <strong>Código: </strong>
                    <span>{id}</span>
                  </div>

                  <div>
                    <strong>Nome: </strong>
                    <span>{name}</span>
                  </div>

                  <div>
                    <strong>Quantidade: </strong>
                    <span>{quantity / 100}</span>
                  </div>

                  <div>
                    <strong>Valor unitário: </strong>
                    <span>{formattedPrice(products[index].unit_price)}</span>
                  </div>

                  <div>
                    <strong>Valor total do produto: </strong>
                    <span>{formattedPrice(products[index].total_price)}</span>
                  </div>

                  <div>
                    <strong>ICMS ST: </strong>
                    <span>{formattedPrice(products[index].taxes.icms_st)}</span>
                  </div>

                  <div>
                    <strong>IPI: </strong>
                    <span>{formattedPrice(products[index].taxes.ipi)}</span>
                  </div>

                  <div>
                    <strong>Outras despesas: </strong>
                    <span>{formattedPrice(products[index].other)}</span>
                  </div>

                  <div>
                    <strong>Desconto: </strong>
                    <span>{formattedPrice(products[index].discount)}</span>
                  </div>

                  <div>
                    <strong>Valor unitário com impostos: </strong>
                    <span>{formattedPrice(unit_price)}</span>
                  </div>

                  <div>
                    <strong>Valor total com impostos: </strong>
                    <span>{formattedPrice(total_price)}</span>
                  </div>
                </ModalContainer>
              </Modal>

              <td>{id}</td>
              <td>{name}</td>
              <td>{quantity / 100}</td>
              <td>{formattedPrice(unit_price)}</td>
              <td>
                <button type="button" onClick={() => setModalIsOpen(true)}>
                  {formattedPrice(total_price)}
                </button>

                <div>
                  <span>cliqui para ver mais detalhes</span>
                </div>
              </td>
            </tr>
          ),
        )}
      </tbody>
    </Container>
  );
}
