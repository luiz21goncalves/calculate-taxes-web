import Link from 'next/link';

import { Container } from './style';

export default function Header() {
  return (
    <Container>
      <div>
        <nav>
          <Link href="/import">
            <a>Importar XML</a>
          </Link>

          <Link href="/">
            <a>Sobre o projeto</a>
          </Link>
        </nav>
        <a
          href="https://github.com/luiz21goncalves"
          target="__blank"
          rel="noopener noreferrer"
        >
          Desenvolvido por Luiz Gonçalves
        </a>
      </div>
    </Container>
  );
}
