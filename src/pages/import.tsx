import { useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';

import Header from '../components/Header';
import Upload from '../components/Upload';
import { Container, Content, TableHeader, TableFooter } from '../styles/import';
import Table, { Product } from '../components/Table';
import { formattedPrice } from '../utils';

interface ImportProps {
  baseUrl: string;
}

interface Company {
  cnpj: string;
  name: string;
}

interface Note {
  number: number;
  seller: Company;
  customer: Company;
  products: Product[];
  total: {
    products: number;
    others: number;
    icms_st: number;
    shipping: number;
    ipi: number;
    discount: number;
    safe: number;
    nf: number;
  };
}

export default function Import({ baseUrl }: ImportProps) {
  const [note, setNote] = useState<Note>({} as Note);
  const [showInput, setShowInput] = useState(true);
  const [file, setFile] = useState(null);

  const handleUpload = (files: File[]) => {
    setFile(files[0]);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('file', file, file.name);

      const response = await axios.post<Note>(`${baseUrl}/xml/import`, data);

      setNote(response.data);

      setShowInput(false);
    } catch (err) {
      console.error(err);
      toast.error('Ocorreu um erro tente novamente ou contate o desenvolvedor');
    }
  };

  return (
    <>
      <Header />

      <Container>
        <Content>
          <Upload onUpload={handleUpload} file={file} />

          <button type="button" onClick={handleSubmit}>
            Calcular preço
          </button>
        </Content>

        {!showInput && (
          <>
            <TableHeader>
              <strong>Número: {note.number}</strong>
              <div>
                <span>Comprador</span>

                <p>{note.customer.name}</p>

                <p>
                  <b>CNPJ: </b>
                  <span>{note.customer.cnpj}</span>
                </p>
              </div>
              <div>
                <span>Venderdor</span>

                <p>{note.seller.name}</p>

                <p>
                  <b>CNPJ: </b>
                  <span>{note.seller.cnpj}</span>
                </p>
              </div>
            </TableHeader>

            <Table products={note.products} />

            <TableFooter>
              <p>TOTAL DA NF-e: {formattedPrice(note.total.nf)}</p>
              <p>VALOR DOS PRODUTOS: {formattedPrice(note.total.products)}</p>
              <p>ICMS ST: {formattedPrice(note.total.icms_st)}</p>
              <p>IPI: {formattedPrice(note.total.ipi)}</p>
              <p>SEGURO: {formattedPrice(note.total.safe)}</p>
              <p>FRETE: {formattedPrice(note.total.shipping)}</p>
              <p>DESCONTO: {formattedPrice(note.total.discount)}</p>
              <p>OUTRAS DESPESAS: {formattedPrice(note.total.others)}</p>
            </TableFooter>
          </>
        )}
      </Container>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      baseUrl: process.env.API_URL,
    },
  };
}
