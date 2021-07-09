import React, {useState} from "react";
import { map } from "lodash";
import { NextPage } from "next";
import { $FIXME } from "@utils/constant";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import ApartmentSimpleCard from "@containers/ApartmentSimpleCard";
import EditApartment from "@components/EditApartment";

interface ListApartmentInterface {
  apartments: $FIXME;
  isSeller: boolean;
  bookButtonClick: (obj: $FIXME) => void ;
}

const ListApartment: NextPage<ListApartmentInterface> = (props) => {
  const { apartments, isSeller, bookButtonClick } = props;
  const [modal, setModal] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<$FIXME>({})
  const closeModal = () => {
    setModal(false)
  }
  const editApartment = (item: $FIXME) => {
    setModal(true)
    setSelectedItem(item)
  }
  return (
      <>
        {!isSeller && (
            <Grid
                width="100%"
                height="87vh"
                overflowY="scroll"
                templateColumns="repeat(3, 1fr)"
                gap={5}
            >
              {map(apartments, (item) => (
                  <ApartmentSimpleCard
                      key={item.id}
                      apartment={item}
                      bookButtonClick={bookButtonClick}
                  />
              ))}
            </Grid>
        )}
        {isSeller && (
            <Table
                borderRadius="5px"
                boxShadow="0px 0px 5px 0px rgba(0,0,0,0.7)"
                variant="striped"
                colorScheme="teal"
            >
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th>Rooms</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {map(apartments, (item) => (
                    <Tr>
                      <Td>{item.name}</Td>
                      <Td>{item.price}</Td>
                      <Td>{item.number_room}</Td>
                      <Td>
                        <IconButton
                            aria-label="Search database"
                            borderRadius="5px"
                            colorScheme="blue"
                            onClick={() => editApartment(item)}
                            icon={<EditIcon w={4} h={4} />}
                        />
                      </Td>
                    </Tr>
                ))}
              </Tbody>
            </Table>
        )}

        <EditApartment modal={modal} closeModal={closeModal} apartment={selectedItem}/>

      </>
  );
};

export default ListApartment;
