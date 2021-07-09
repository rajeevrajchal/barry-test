import React, {useEffect, useState} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Stack, Text, Input, Select, Textarea, Button,
} from "@chakra-ui/react"
import {NextPage} from "next";
import {useFormik} from "formik";
import {gql} from "@apollo/client";
import client from "@lib/apolloClient";
import {$FIXME} from "@utils/constant";

interface EditApartmentInterface {
    modal: boolean
    closeModal: () => void
    apartment: $FIXME
}

const EditApartment: NextPage<EditApartmentInterface> = (props) => {
    const {modal, closeModal, apartment} = props
    const formik = useFormik({
        initialValues: {
            price: apartment.price,
            number_room: apartment.number_room,
            name: apartment.name,
            description: apartment.description,
            type: apartment.type,
            date: ''
        },
        onSubmit: async (values) => {
            const storage: string | null = localStorage.getItem('BarryTestAccessToken') || ''
            const {token} = JSON.parse(storage)
            const UpdateApartment = gql`
                mutation{
                    updateApartment(
                        id:${apartment.id}
                        name:"${values.name || apartment.name }"
                        type: "${values.type || apartment.type }"
                        price: ${values.price || apartment.price }
                        number_room:  ${values.number_room || apartment.number_room }
                        description:" ${values.description || apartment.description }"
                    ){
                        id
                    }
                }
            `
            const {data: {updateApartment}} = await client(token).mutate({mutation: UpdateApartment})
            console.log({updateApartment})
        }
    })
    return (
        <Modal isOpen={modal} onClose={closeModal}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Stack
                        spacing={5}
                    >
                        <Stack>
                            <Text>Name</Text>
                            <Input placeholder="Name"
                                   type="text"
                                   name="name"
                                   onChange={formik.handleChange}
                                   value={formik.values.name}
                            />
                        </Stack>
                        <Stack>
                            <Text>Price</Text>
                            <Input placeholder="Price"
                                   type="number"
                                   name="price"
                                   onChange={formik.handleChange}
                                   value={formik.values.price}
                            />
                        </Stack>
                        <Stack>
                            <Text>Number Of Room</Text>
                            <Input placeholder="No of rooms"
                                   type="number"
                                   name="number_room"
                                   onChange={formik.handleChange}
                                   value={formik.values.number_room}
                            />
                        </Stack>
                        <Stack>
                            <Text>Type</Text>
                            <Select placeholder="Choose Type"
                                    name="type"
                                    onChange={formik.handleChange}
                                    value={formik.values.type}
                            >
                                <option value="house">House</option>
                                <option value="flat">Flat</option>
                            </Select>
                        </Stack>
                        <Stack>
                            <Text>Number Of Room</Text>
                            <Textarea
                                size="sm"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                placeholder="You text here"/>
                        </Stack>
                        <Stack width='100%'>
                            <Button colorScheme="teal" size="md" onClick={() => formik.handleSubmit()}>
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>

    );
};

export default EditApartment;
