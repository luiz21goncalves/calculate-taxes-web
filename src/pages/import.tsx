import { useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Upload from '../components/Upload';
import styles from '../styles/import.module.scss';
import Table, { Note } from '../components/Table';

interface ImportProps {
  baseUrl: string;
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

        {!showInput && <Table note={note} />}
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
