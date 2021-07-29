import Link from 'next/link';

import { Box, Flex, Stack, Link as ChakraLink, Text } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box as="header" bg="blue.900" h="20" shadow="xl">
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        maxW={1280}
        px="4"
        mx="auto"
        h="100%"
      >
        <Stack as="nav" direction="row" spacing="8" align="center">
          <Link href="/import" passHref>
            <ChakraLink
              color="gray.200"
              fontSize="18"
              _hover={{ color: 'whiteAlpha.600' }}
            >
              <Text>Importar XML</Text>
            </ChakraLink>
          </Link>

          <Link href="/" passHref>
            <ChakraLink
              color="gray.200"
              fontSize="18"
              _hover={{ color: 'whiteAlpha.600' }}
            >
              <Text>Sobre o projeto</Text>
            </ChakraLink>
          </Link>
        </Stack>

        <ChakraLink
          href="https://github.com/luiz21goncalves"
          color="gray.200"
          isExternal
          fontSize="18"
          _hover={{ color: 'blue.200' }}
        >
          Desenvolvido por Luiz Gonçalves
        </ChakraLink>
      </Flex>
    </Box>
  );
}
