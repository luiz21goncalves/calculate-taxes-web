import Head from 'next/head'

import { Box, Text, Heading } from '@chakra-ui/react'

import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Calcular NF-e</title>
      </Head>

      <Header />

      <Box as="main" maxW="container.lg" mx="auto" mt="16" px="4">
        <Heading as="h1" textAlign="center" mb="8">
          Calcular custo de produtos na NF-e
        </Heading>

        <Text as="p" fontSize="18" lineHeight="2" mb="6">
          Com tantas dificuldades para empreender no Brasil, calcular o custo de
          aquisição de produtos é mais um deles. A Danfe (Documento Auxiliar da
          NF-e) não tem todas as informações necessárias, apenas um resumo, e
          muita das vezes os pequenos empreenderores não tem conhecimento para
          entender e calcular todas as taxas ocultas.
        </Text>

        <Text as="p" fontSize="18" lineHeight="2">
          Depois de uma oportunidade de trabalho em uma contabilidade, conheci
          toda essa complexidade do mundo dos impostos. Agora como descobri o
          mundo da programação tive essa ideia, vamos automatizar esse calculo e
          facilitar a vida de quantas pessoas pudermos
        </Text>
      </Box>
    </>
  )
}
