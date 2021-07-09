import React from 'react';
import {GridItem, Image, Box, Button, Stack, Text} from "@chakra-ui/react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import { $FIXME } from '@utils/constant';

type Slot = {
    id: string
    date: string
    booked: boolean
}
type Apartment = {
    id: string
    name: string
    description: string
    type: string
    price: number
    number_room: number
    slot: Slot[]
}

interface ApartmentSimpleCard {
    apartment: Apartment,
    bookButtonClick: (obj: $FIXME) => void | null;
}

const ApartmentSimpleCard: NextPage<ApartmentSimpleCard> = (props) => {
    const {apartment: {id, name, price, number_room},bookButtonClick, apartment} = props
    const router = useRouter()
    return (
      <GridItem
        w="100%"
        cursor={"pointer"}
        _hover={{
          filter: "brightness(0.8)",
        }}
        _active={{
          transform: "translateY(1px)",
        }}
        transition=".2s ease-in-out"
        // onClick={() => {
        //   router.push(`/${name}`);
        // }}
      >
        <Image
          borderRadius="5px 5px 0 0 "
          objectFit="cover"
          src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__340.jpg"
          alt="Beautiful House"
        />
        <Box bg="tomato" borderRadius="0 0 5px 5px">
          <Box p="1rem">
            <Text>{name}</Text>
            <Text>{`$ ${price}`}</Text>
            <Text>{number_room}</Text>
            <Stack spacing={4} direction="row" align="center" marginTop={2}>
              <Button
                colorScheme="teal"
                size="xs"
                onClick={() => {
                  bookButtonClick(apartment)
                }}
              >
                Book Now
              </Button>
            </Stack>
          </Box>
        </Box>
      </GridItem>
    );
};

export default ApartmentSimpleCard;
