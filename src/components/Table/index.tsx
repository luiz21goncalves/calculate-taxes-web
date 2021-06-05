import { useEffect, useState } from 'react';

import { formattedPrice } from '../../utils';
import { Container, ModalContainer } from './styles';
import Modal from '../Modal';

interface FormattedProduct {
  id: string;
  name: string;
  total_price: number;
  unit_price: number;
  quantity: number;
}

export interface Product {
  id: string;
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

interface ShowProduct {
  id: string;
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
  unit_price_with_taxes: number;
  total_price_with_taxes: number;
}

interface TableProps {
  products: Product[];
}

export default function Table({ products }: TableProps) {
  const [formattedProducts, setFormattedProducts] = useState<
    FormattedProduct[]
  >([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showProduct, setShowProduct] = useState<ShowProduct>(
    {} as ShowProduct,
  );

  function handleShowProduct(id: string) {
    const product = products.find(
      (findProduct) => findProduct.id === id,
    ) as ShowProduct;

    const formattedProduct = formattedProducts.find(
      (findFormattedProduct) => findFormattedProduct.id === id,
    );

    product.unit_price_with_taxes = formattedProduct.unit_price;
    product.total_price_with_taxes = formattedProduct.total_price;

    setShowProduct(product);

    toggleModal();
  }

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
          ({ id, name, quantity, total_price, unit_price }) => (
            <tr key={id}>
              <Modal setIsOpen={toggleModal} isOpen={modalIsOpen}>
                <ModalContainer>
                  <div>
                    <strong>Código: </strong>
                    <span>{showProduct?.id}</span>
                  </div>

                  <div>
                    <strong>Nome: </strong>
                    <span>{showProduct?.name}</span>
                  </div>

                  <div>
                    <strong>Quantidade: </strong>
                    <span>{showProduct?.quantity / 100}</span>
                  </div>

                  <div>
                    <strong>Valor unitário: </strong>
                    <span>{formattedPrice(showProduct?.unit_price)}</span>
                  </div>

                  <div>
                    <strong>Valor total do produto: </strong>
                    <span>{formattedPrice(showProduct?.total_price)}</span>
                  </div>

                  <div>
                    <strong>ICMS ST: </strong>
                    <span>{formattedPrice(showProduct?.taxes?.icms_st)}</span>
                  </div>

                  <div>
                    <strong>IPI: </strong>
                    <span>{formattedPrice(showProduct?.taxes?.ipi)}</span>
                  </div>

                  <div>
                    <strong>Outras despesas: </strong>
                    <span>{formattedPrice(showProduct?.other)}</span>
                  </div>

                  <div>
                    <strong>Desconto: </strong>
                    <span>{formattedPrice(showProduct?.discount)}</span>
                  </div>

                  <div>
                    <strong>Valor unitário com impostos: </strong>
                    <span>
                      {formattedPrice(showProduct?.unit_price_with_taxes)}
                    </span>
                  </div>

                  <div>
                    <strong>Valor total com impostos: </strong>
                    <span>
                      {formattedPrice(showProduct.total_price_with_taxes)}
                    </span>
                  </div>
                </ModalContainer>
              </Modal>

              <td>{id}</td>
              <td>{name}</td>
              <td>{quantity / 100}</td>
              <td>{formattedPrice(unit_price)}</td>
              <td>
                <button type="button" onClick={() => handleShowProduct(id)}>
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
