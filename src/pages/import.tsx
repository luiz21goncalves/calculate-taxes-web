import axios from 'axios';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Upload from '../components/Upload';
import styles from '../styles/import.module.scss';

interface ImportProps {
  baseUrl: string;
}

export default function Import({ baseUrl }: ImportProps) {
  const handleUpload = (files: File[]) => {
    try {
      const data = new FormData();
      data.append('file', files[0], files[0].name);

      axios.post(`${baseUrl}/xml/import`, data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />

      <main className={styles.container}>
        <Upload onUpload={handleUpload} />
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
