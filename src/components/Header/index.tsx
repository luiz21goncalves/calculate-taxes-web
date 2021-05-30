import Link from 'next/link';

import styles from './style.module.scss';

export default function Header() {
  return (
    <header className={styles.container}>
      <nav>
        <Link href="/import">
          <a>Importar XML</a>
        </Link>

        <Link href="/">
          <a>Sobre o projeto</a>
        </Link>
      </nav>
    </header>
  );
}
