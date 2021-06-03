import { formattedPrice } from '../../utils';
import { Container } from './styles';

interface Company {
  name: string;
  cnpj: string;
}

interface Product {
  id: number;
  name: string;
  total_price: number;
  unit_price: number;
  quantity: number;
}

interface Total {
  discount: number;
  icms_st: number;
  ipi: number;
  nf: number;
  others: number;
  products: number;
  safe: number;
  shipping: number;
}

export interface Note {
  number: number;
  seller: Company;
  customer: Company;
  products: Product[];
  total: Total;
}

interface TableProps {
  note: Note;
}

export default function Table({ note }: TableProps) {
  return (
    <Container>
      <p>
        Número da NF-e <strong>{note.number}</strong>
      </p>

      <section className="header">
        <div>
          <p>
            vendedor: <strong>{note.seller.name}</strong>
          </p>
          <p>
            cnpj: <strong>{note.seller.cnpj}</strong>
          </p>
        </div>

        <div>
          <p>
            vendedor: <strong>{note.customer.name}</strong>
          </p>
          <p>
            cnpj: <strong>{note.customer.cnpj}</strong>
          </p>
        </div>
      </section>

      <table>
        <thead>
          <th>código</th>
          <th>nome</th>
          <th>quantidate</th>
          <th>preço unitario</th>
          <th>preço total</th>
        </thead>

        <tbody>
          {note.products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{formattedPrice(product.unit_price)}</td>
              <td>{formattedPrice(product.total_price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer">
        <p>
          Valor total da NF-e: <strong>{formattedPrice(note.total.nf)}</strong>
        </p>

        <p>
          Valor total dos produtos:
          <strong>{formattedPrice(note.total.products)}</strong>
        </p>

        <p>
          Valor total do IPI: <strong>{formattedPrice(note.total.ipi)}</strong>
        </p>

        <p>
          Valor total do ICMSST:{' '}
          <strong>{formattedPrice(note.total.icms_st)}</strong>
        </p>

        <p>
          Valor total de outras despesas:{' '}
          <strong>{formattedPrice(note.total.others)}</strong>
        </p>

        <p>
          Valor total do desconto:{' '}
          <strong>{formattedPrice(note.total.discount)}</strong>
        </p>

        <p>
          Valor total do seguro:{' '}
          <strong>{formattedPrice(note.total.safe)}</strong>
        </p>

        <p>
          Valor total do frete:{' '}
          <strong>{formattedPrice(note.total.shipping)}</strong>
        </p>
      </div>
    </Container>
  );
}
