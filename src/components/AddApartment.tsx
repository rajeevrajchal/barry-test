import React from 'react';
import {Button, Input, Select, Stack, Text, Textarea} from "@chakra-ui/react";
import {useFormik} from "formik";
import { gql } from '@apollo/client';
import client from '@lib/apolloClient';
import { NextPage } from 'next';

interface AddApartment {
    accessToken: string
}
const AddApartment:NextPage<AddApartment> = (props) => {
    const {accessToken} = props
    const formik = useFormik({
        initialValues: {
            price: "",
            number_room: '',
            name: '',
            description: '',
            type: '',
            date:''
        },
        onSubmit: async (values) => {
            console.log(' the values are', values)
            const dates = [values.date]
            const CreateApartment = gql`
                mutation{
                        storeApartment(
                            name:"${values.name}"
                            type: "${values.type}"
                            price: ${values.price}
                            number_room:  ${values.number_room}
                            description:" ${values.description}"
                            slot:["${dates}"]
                        ){
                            id
                        }
                    }
            ` 
            const {data: {storeApartment}} = await client(accessToken).mutate({mutation: CreateApartment})
            console.log({storeApartment})

        }
    })
    return (
        <Stack
            p={"2rem"}
            spacing={5}
            borderRadius='10px'
            height='90vh'
            overflowY="scroll"
            boxShadow="0px 0px 5px 0px rgba(0,0,0,0.7)"
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
                <Text>Booking Date</Text>
                <Input placeholder="No of rooms"
                       type="date"
                       name="date"
                       onChange={formik.handleChange}
                       value={formik.values.date}
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
                    placeholder="You text here" />
            </Stack>
            <Stack width='100%'>
                <Button colorScheme="teal" size="md" onClick={() => formik.handleSubmit()}>
                    Save
                </Button>
            </Stack>
        </Stack>
    );
};

export default AddApartment;
