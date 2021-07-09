import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Stack,
  Flex,
  Spacer,
  Input,
  Box,
} from "@chakra-ui/react";
import { $FIXME } from "@utils/constant";
import { NextPage } from "next";
import { map } from "lodash";
import UseCart from "../hooks/useCart";
import { useFormik } from "formik";
import { gql } from "@apollo/client";
import client from "@lib/apolloClient";

interface BookApartmentInterface {
  modal: boolean;
  closeModal: () => void;
  apartment: $FIXME;
}
const BookApartment: NextPage<BookApartmentInterface> = (props) => {
  const { modal, closeModal, apartment } = props;
  console.log({ apartment });
  const { userCart, setUserCart } = UseCart();
  const [nextPage, setNextPage] = useState<string>("choose-date");
  const [cartInfo, setCartInfo] = useState<$FIXME>({});

  const handleCloseModal = () => {
    setNextPage('choose-date')
    closeModal()
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
    onSubmit: async (values: $FIXME) => {
      const Register = gql`
        mutation {
          registerUser(
            first_name: "${values.first_name}"
            last_name: "${values.last_name}"
            role: "buyer"
            email: "${values.email}"
            password: "random"
          ) {
            id
          }
        }
      `;
      const {
        data: { registerUser },
      } = await client('').mutate({ mutation: Register });
      if(registerUser.id){
        map(userCart, async (cart) => {
          const CreateOrder = gql`
            mutation {
              createOrder(
                apartment: "${cart.apartment}", 
                slot: "${cart.slot}",
                user: "${registerUser.id}"
                type:"booking"
              ) {
                id
              }
            }
          `;
          await client("").mutate({ mutation: CreateOrder });
        })
      }
      setNextPage(
          'choose-date'
      )
      closeModal()
    },
  });

  const handleNextButton = (screen: string) => {
    setNextPage(screen);
  };

  console.log('userCart', userCart)
  const handleNoButton = () => {
    console.log('on no', cartInfo)
    setUserCart([
        ...userCart,
        cartInfo
    ]);
    setNextPage("user");
  };

  const handleYesButton = () => {
    console.log('on yes', cartInfo)
    setUserCart([
      ...userCart,
      cartInfo
    ]);
    setNextPage("choose-date");
    closeModal();
  };

  return (
    <Modal isOpen={modal} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        {nextPage === "choose-date" && (
          <>
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text>Choose Date</Text>
                </Box>
                <Stack direction={["column", "row"]} spacing="10px">
                  {map(apartment.slots, (slot) => (
                    <Button
                      colorScheme="teal"
                      variant={cartInfo.slot === slot.id ? "solid" : "outline"}
                      key={slot.id}
                      onClick={() =>
                        setCartInfo({
                          apartment: apartment.id,
                          slot: slot.id,
                        })
                      }
                    >
                      <Text paddingX={2}>{slot.date}</Text>
                    </Button>
                  ))}
                </Stack>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleNextButton("confirm")}
              >
                Next
              </Button>
            </ModalFooter>
          </>
        )}
        {nextPage === "confirm" && (
          <>
            <ModalBody>
              <Text>Continue Shopping</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleNoButton()}
              >
                No
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleYesButton()}
              >
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
        {nextPage === "user" && (
          <>
            <ModalBody>
              <Flex>
                <Stack>
                  <Text>First Name</Text>
                  <Input
                    placeholder="Your first name"
                    type="text"
                    name="first_name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                  />
                </Stack>
                <Spacer />
                <Stack marginLeft="1rem">
                  <Text>Last Name</Text>
                  <Input
                    placeholder="your last name"
                    type="text"
                    name="last_name"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                  />
                </Stack>
              </Flex>
              <Stack>
                <Text>Email</Text>
                <Input
                  placeholder="your Email"
                  type="text"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={() => formik.handleSubmit()}
              >
                Register and Proceed
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookApartment;
