import { useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Upload from '../components/Upload';
import styles from '../styles/import.module.scss';

interface ImportProps {
  baseUrl: string;
}

interface Company {
  name: string;
  cnpj: string;
}

interface Product {
  id: number;
  name: string;
  total_price: number;
  unit_price: number;
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

interface Note {
  number: number;
  seller: Company;
  customer: Company;
  products: Product[];
  total: Total;
}

export default function Import({ baseUrl }: ImportProps) {
  const [note, setNote] = useState<Note>({} as Note);
  const [showInput, setShowInput] = useState(true);
  const [file, setFile] = useState(null);

  const handleUpload = (files: File[]) => {
    setFile(files[0]);
  };

  const handleSubmit = () => {
    try {
      setShowInput(false);

      const data = new FormData();
      data.append('file', file, file.name);

      axios
        .post<Note>(`${baseUrl}/xml/import`, data)
        .then((response) => setNote(response.data));
    } catch (err) {
      console.error(err);
      toast.error('Ocorreu um erro tente novamente ou contate o desenvolvedor');
    }
  };

  return (
    <>
      <Header />

      <main className={styles.container}>
        {showInput && <Upload onUpload={handleUpload} />}

        <div className={styles.button_container}>
          <button type="button" onClick={() => setShowInput(true)}>
            Novo upload
          </button>
          <button type="button" onClick={handleSubmit}>
            Calcular preço
          </button>
        </div>
      </main>

      <Footer />
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
