import { useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';

import Header from '../components/Header';
import Upload from '../components/Upload';
import { FormattedProduct, Table } from '../components/Table';
import { priceFormatter } from '../utils';

type Company = {
  cnpj: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  taxes: {
    icms_st: number;
    ipi: number;
  };
  other: number;
  discount: number;
  shipping: number;
};

type Note = {
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
};

type FormattedNote = {
  number: number;
  seller: Company;
  customer: Company;
  products: FormattedProduct[];
  total: {
    products: string;
    others: string;
    icms_st: string;
    shipping: string;
    ipi: string;
    discount: string;
    safe: string;
    nf: string;
  };
};

export default function Import() {
  const [note, setNote] = useState<FormattedNote>({} as FormattedNote);
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

      const formattedProducts = response.data.products.reduce(
        (acc, product) => {
          const {
            quantity,
            total_price,
            discount,
            other,
            taxes,
            id,
            name,
            shipping,
            unit,
          } = product;

          const totalPrice =
            total_price +
            other +
            taxes.ipi +
            taxes.icms_st +
            shipping -
            discount;

          acc.push({
            id,
            name,
            unit,
            quantity,
            total_price: priceFormatter(totalPrice),
            unit_price: priceFormatter(totalPrice / (quantity / 100)),
          });

          return acc;
        },
        [] as FormattedProduct[],
      );

      const { number, customer, seller, total } = response.data;

      const formattedNote = {
        products: formattedProducts,
        number,
        customer,
        seller,
        total: {
          products: priceFormatter(total.products),
          others: priceFormatter(total.others),
          icms_st: priceFormatter(total.icms_st),
          shipping: priceFormatter(total.shipping),
          ipi: priceFormatter(total.ipi),
          discount: priceFormatter(total.discount),
          safe: priceFormatter(total.safe),
          nf: priceFormatter(total.nf),
        },
      };

      setNote(formattedNote);

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
              <Text fontWeight="bold">TOTAL DA NF-e: {note.total.nf}</Text>
              <Text>VALOR DOS PRODUTOS: {note.total.products}</Text>
              <Text>ICMS ST: {note.total.icms_st}</Text>
              <Text>IPI: {note.total.ipi}</Text>
              <Text>SEGURO: {note.total.safe}</Text>
              <Text>FRETE: {note.total.shipping}</Text>
              <Text>DESCONTO: {note.total.discount}</Text>
              <Text>OUTRAS DESPESAS: {note.total.others}</Text>
            </SimpleGrid>
          </Box>
        )}
      </Box>
    </>
  );
}
