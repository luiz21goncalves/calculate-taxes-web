import { Box, Stack } from '@chakra-ui/react';

import { NavLink } from './NavLink';

export default function Header() {
  return (
    <Box as="header" bg="blue.900" h="20" shadow="xl">
      <Stack
        as="nav"
        direction="row"
        spacing="8"
        align="center"
        justify="flex-start"
        maxW="container.lg"
        px="4"
        mx="auto"
        h="100%"
      >
        <NavLink href="/">Home</NavLink>
        <NavLink href="/import">Importar XML</NavLink>
        <NavLink href="/timesheet">Calcular horas extras</NavLink>
      </Stack>
    </Box>
  );
}
