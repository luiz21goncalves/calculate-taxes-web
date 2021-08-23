import { useEffect, useState } from 'react';

import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table as ChakraTable,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { formattedPrice } from '../../utils';

interface FormattedProduct {
  id: string;
  name: string;
  unit: string;
  total_price: number;
  unit_price: number;
  quantity: number;
}

export interface Product {
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
}

interface ShowProduct {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  taxes: {
    icms_st: number;
    ipi: number;
  };
  other: number;
  discount: number;
  unit_price_with_taxes: number;
  total_price_with_taxes: number;
  shipping: number;
}

interface TableProps {
  products: Product[];
}

export default function Table({ products }: TableProps) {
  const [formattedProducts, setFormattedProducts] = useState<
    FormattedProduct[]
  >([]);
  const [showProduct, setShowProduct] = useState<ShowProduct>(
    {} as ShowProduct,
  );

  function handleShowProduct(id: string) {
    const product = products.find(
      (findProduct) => findProduct.id === id,
    ) as ShowProduct;

    const formattedProduct = formattedProducts.find(
      (findFormattedProduct) => findFormattedProduct.id === id,
    );

    product.unit_price_with_taxes = formattedProduct.unit_price;
    product.total_price_with_taxes = formattedProduct.total_price;

    setShowProduct(product);
  }

  useEffect(() => {
    const formatted = products.reduce((acc, product) => {
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
        total_price + other + taxes.ipi + taxes.icms_st + shipping - discount;

      acc.push({
        quantity,
        id,
        name,
        unit,
        total_price: totalPrice,
        unit_price: totalPrice / (quantity / 100),
      });

      return acc;
    }, [] as FormattedProduct[]);

    setFormattedProducts(formatted);
  }, [products]);

  return (
    <ChakraTable colorScheme="black">
      <Thead border="1px" borderColor="blue.900">
        <Tr>
          <Th bg="blue.900" borderRight="1px" borderRightColor="gray.50">
            <Text fontSize="md" color="gray.50" textAlign="center">
              código
            </Text>
          </Th>
          <Th bg="blue.900" borderRight="1px" borderRightColor="gray.50">
            <Text fontSize="md" color="gray.50" textAlign="center">
              nome
            </Text>
          </Th>
          <Th bg="blue.900" borderRight="1px" borderRightColor="gray.50">
            <Text fontSize="md" color="gray.50" textAlign="center">
              unidade
            </Text>
          </Th>
          <Th bg="blue.900" borderRight="1px" borderRightColor="gray.50">
            <Text fontSize="md" color="gray.50" textAlign="center">
              quantidate
            </Text>
          </Th>
          <Th bg="blue.900" borderRight="1px" borderRightColor="gray.50">
            <Text fontSize="md" color="gray.50" textAlign="center">
              preço unitario
            </Text>
          </Th>
          <Th bg="blue.900">
            <Text fontSize="md" color="gray.50" textAlign="center">
              preço total
            </Text>
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        {formattedProducts.map(
          ({ id, name, quantity, total_price, unit_price, unit }) => (
            <Tr key={id}>
              <Td border="1px" borderColor="black">
                <Text textAlign="center">{id}</Text>
              </Td>
              <Td borderRight="1px" borderRightColor="black">
                <Text textAlign="center">{name}</Text>
              </Td>
              <Td borderRight="1px" borderRightColor="black">
                <Text textAlign="center" textTransform="uppercase">
                  {unit}
                </Text>
              </Td>
              <Td borderRight="1px" borderRightColor="black">
                <Text textAlign="center">{quantity / 100}</Text>
              </Td>
              <Td borderRight="1px" borderRightColor="black">
                <Text textAlign="center">{formattedPrice(unit_price)}</Text>
              </Td>
              <Td borderRight="1px" borderRightColor="black" p="2">
                <Popover>
                  <PopoverTrigger>
                    <Button
                      variant="solid"
                      fontWeight="bold"
                      textAlign="center"
                      w="100%"
                      h="100%"
                      py="2"
                      fontSize="16"
                      colorScheme="blue"
                      onClick={() => handleShowProduct(id)}
                    >
                      {formattedPrice(total_price)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader textAlign="center">
                      Detalhe do calculo
                    </PopoverHeader>
                    <PopoverBody>
                      <Text fontSize="sm" textTransform="uppercase">
                        preço unitario:{' '}
                        {formattedPrice(showProduct?.unit_price)}
                      </Text>
                      <Text fontSize="sm" textTransform="uppercase">
                        icms st: {formattedPrice(showProduct?.taxes?.icms_st)}
                      </Text>
                      <Text fontSize="sm" textTransform="uppercase">
                        ipi: {formattedPrice(showProduct?.taxes?.ipi)}
                      </Text>
                      <Text fontSize="sm" textTransform="uppercase">
                        outros: {formattedPrice(showProduct?.other)}
                      </Text>
                      <Text fontSize="sm" textTransform="uppercase">
                        frete: {formattedPrice(showProduct?.shipping)}
                      </Text>
                      <Text fontSize="sm" textTransform="uppercase">
                        desconto: {formattedPrice(showProduct?.discount)}
                      </Text>
                      <Text fontSize="sm" textTransform="uppercase">
                        preço total: {formattedPrice(showProduct?.total_price)}
                      </Text>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>
            </Tr>
          ),
        )}
      </Tbody>
    </ChakraTable>
  );
}
