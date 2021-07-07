import React from 'react';
import {Button, Input, Select, Stack, Text, Textarea} from "@chakra-ui/react";
import {useFormik} from "formik";

const AddApartment = () => {
    const formik = useFormik({
        initialValues: {
            price: "",
            number_room: '',
            name: '',
            description: '',
            type: '',
        },
        onSubmit: async (values) => {
            console.log(' the values are', values)
        }
    })
    return (
        <Stack
            p={"2rem"}
            spacing={5}
            borderRadius='10px'
            height='90vh'
            boxShadow="0px 0px 5px 0px rgba(0,0,0,0.7)"
        >
            <Stack>
                <Text>Email</Text>
                <Input placeholder="Name"
                       type="text"
                       name="name"
                       onChange={formik.handleChange}
                       value={formik.values.name}
                />
            </Stack>
            <Stack>
                <Text>Password</Text>
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
