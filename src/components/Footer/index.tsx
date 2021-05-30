import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <p>
        Desenvolvido com 💜 por{' '}
        <a
          href="https://github.com/luiz21goncalves"
          target="_blank"
          rel="noopener noreferrer"
        >
          Luiz Gonçalves
        </a>
      </p>
    </footer>
  );
}
