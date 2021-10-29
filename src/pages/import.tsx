import { useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';

import Header from '../components/Header';
import Upload from '../components/Upload';
import Table, { Product } from '../components/Table';
import { formattedPrice } from '../utils';

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

export default function Import() {
  const [note, setNote] = useState<Note>({} as Note);
  const [showTable, setShowTable] = useState(true);
  const [file, setFile] = useState(null);

  const handleUpload = (files: File[]) => {
    setFile(files[0]);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('file', file, file.name);

      const response = await axios.post<Note>(
        `${process.env.NEXT_PUBLIC_API_URL}/xml/import`,
        data,
      );

      setNote(response.data);

      setShowTable(false);
    } catch (err) {
      console.error(err);
      toast.error('Ocorreu um erro tente novamente ou contate o desenvolvedor');
    }
  };

  return (
    <>
      <Header />

      <Box as="main" maxW={1280} mx="auto" mt="16" px="4">
        <Flex
          align="center"
          justify="space-between"
          maxW={1280}
          mx="auto"
          px="4"
        >
          <Upload onUpload={handleUpload} file={file} />

          <Button
            colorScheme="blue"
            type="submit"
            size="lg"
            onClick={handleSubmit}
            isDisabled={!file}
          >
            Calcular preço
          </Button>
        </Flex>

        {!showTable && (
          <Box mt="12">
            <SimpleGrid
              columns={3}
              border="1px"
              borderColor="black"
              borderBottom="none"
            >
              <Flex
                justify="center"
                align="center"
                direction="column"
                p="4"
                borderRight="1px"
                borderRightColor="black"
              >
                <Text fontWeight="bold">Nfe: {note.number}</Text>
              </Flex>
              <Flex
                justify="center"
                align="center"
                direction="column"
                p="4"
                borderRight="1px"
                borderRightColor="black"
              >
                <Text fontWeight="bold">Comprador: {note.customer.name}</Text>
                <Text>CNPJ: {note.customer.cnpj}</Text>
              </Flex>
              <Flex justify="center" align="center" direction="column" p="4">
                <Text fontWeight="bold">Vendedor: {note.seller.name}</Text>
                <Text>CNPJ: {note.seller.cnpj}</Text>
              </Flex>
            </SimpleGrid>

            <Table products={note.products} />

            <SimpleGrid columns={4} mt="8" gap="4">
              <Text fontWeight="bold">
                TOTAL DA NF-e: {formattedPrice(note.total.nf)}
              </Text>
              <Text>
                VALOR DOS PRODUTOS: {formattedPrice(note.total.products)}
              </Text>
              <Text>ICMS ST: {formattedPrice(note.total.icms_st)}</Text>
              <Text>IPI: {formattedPrice(note.total.ipi)}</Text>
              <Text>SEGURO: {formattedPrice(note.total.safe)}</Text>
              <Text>FRETE: {formattedPrice(note.total.shipping)}</Text>
              <Text>DESCONTO: {formattedPrice(note.total.discount)}</Text>
              <Text>OUTRAS DESPESAS: {formattedPrice(note.total.others)}</Text>
            </SimpleGrid>
          </Box>
        )}
      </Box>
    </>
  );
}
