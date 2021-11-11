import {
  Table as ChakraTable,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export interface FormattedProduct {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unit_price: string;
  total_price: string;
}

interface TableProps {
  products: FormattedProduct[];
}

export function Table({ products }: TableProps) {
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
        {products.map(
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
                <Text textAlign="center">{unit_price}</Text>
              </Td>
              <Td
                borderRight="1px"
                borderRightColor="black"
                p="2"
                bg="blue.100"
              >
                <Text textAlign="center" fontWeight="extrabold">
                  {total_price}
                </Text>
              </Td>
            </Tr>
          ),
        )}
      </Tbody>
    </ChakraTable>
  );
}
