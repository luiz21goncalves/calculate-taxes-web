import { useEffect, useState } from 'react';

import { formattedPrice } from '../../utils';
import { Container } from './styles';

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
        {formattedProducts.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.quantity / 100}</td>
            <td>{formattedPrice(product.unit_price)}</td>
            <td>{formattedPrice(product.total_price)}</td>
          </tr>
        ))}
      </tbody>
    </Container>
  );
}
