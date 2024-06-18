import {Button, Card, CardBody, CardFooter, CardHeader, FormLabel,
    Heading, Image, Input, NumberDecrementStepper, NumberIncrementStepper, 
    NumberInput, NumberInputField, NumberInputStepper, VStack
  } from '@chakra-ui/react'

import Select from 'react-select'
import colorScheme from "../utils/ColorScheme";
import { useState } from 'react';


export default function MovieFilter(props) {

    const colorscheme = colorScheme()

    const options = [
        { value: 'All', label: 'All' },
        { value: 'Comedy', label: 'Comedy' },
        { value: 'Drama', label: 'Drama' },
        { value: 'Horror', label: 'Horror' },
        { value: 'Thriller', label: 'Thriller' },
        { value: 'Crime', label: 'Crime' },
        { value: 'Action', label: 'Action' },
        { value: 'Adventure', label: 'Adventure' },
        { value: 'Mystery', label: 'Mystery' },
        { value: 'Sci-Fi', label: 'Sci-Fi' }, 
        { value: 'Animation', label: 'Animation' },
        { value: 'History', label: 'History' },
        { value: 'Biography', label: 'Biography' },
        { value: 'Romance', label: 'Romance' },
        { value: 'Western', label: 'Western' },
        { value: 'Fantasy', label: 'Fantasy' },
        { value: 'War', label: 'War' },
        { value: 'Family', label: 'Family' },
        { value: 'Music', label: 'Music' },
        { value: 'Musical', label: 'Musical' },
        { value: 'Film-Noir', label: 'Film-Noir' },
        { value: 'Sport', label: 'Sport' }
      ]

    const searchParams = props.params;
    const titleValue = searchParams.get("title");
    const genreValue = searchParams.get("genre");
    const actorValue = searchParams.get("actor");
    const directorValue = searchParams.get("director");
    const releasedValue = searchParams.get("released");
    const imdbValue = searchParams.get("imdb_rating_gte");
    const runtimeValue = searchParams.get("runtime_lte");

    const [formData, setFormData] = useState({
        title: titleValue ? titleValue : "",
        actor: actorValue ? actorValue : "",
        director: directorValue ? directorValue : "",
        genre: genreValue ? genreValue : "All",
        released: releasedValue ? releasedValue : "",
        rating: imdbValue ? imdbValue : "",
        runtime: runtimeValue ? runtimeValue : ""
    })

    const styles= {
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "#81A263",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "#81A263",
        }),
    }

    const handleForm = () => {

        const params = "?title=" + formData.title 
            + "&actor=" + formData.actor + "&director=" + formData.director
            + "&genre=" + formData.genre + "&released=" + formData.released
            + "&imdb_rating_gte=" + formData.rating + "&runtime_lte=" + formData.runtime;

        props.setParams(params);
    }


    return (
        <Card h="400px" direction={{ base: 'column', sm: 'row' }} bg={colorscheme[0]} 
        border="5px solid" borderColor={colorscheme[2]}>

        <CardHeader maxW="30%">
            <Heading p="10px">Filter:</Heading>
            <Image src="./LookingAtFilm.jpg" maxH="280px" />
        </CardHeader>

        <CardBody w="40%">
            <VStack align="left">

            <FormLabel>Movie title:</FormLabel>
            <Input onChange={(e) => setFormData({...formData, title: e.target.value})} 
                bg={colorscheme[1]} value={formData.title} />

            <FormLabel>Actor:</FormLabel>
            <Input onChange={(e) => setFormData({...formData, actor: e.target.value})} 
                bg={colorscheme[1]} value={formData.actor} />

            <FormLabel>Director:</FormLabel>
            <Input onChange={(e) => setFormData({...formData, director: e.target.value})} 
                bg={colorscheme[1]} value={formData.director} />
        
            <FormLabel>Genre:</FormLabel>
            <Select options={options} styles={styles} defaultValue={formData.genre.value}
                onChange={(e) => setFormData((formData) => ({ ...formData, genre: e.value}))} />
                
            </VStack>
        </CardBody>
            
        <CardFooter w="30%">
            <VStack align="left">

            <FormLabel>Release Year:</FormLabel>
            <NumberInput min={1890} max={2024} w="200px" bg={colorscheme[1]} >
                <NumberInputField onChange={(e) => setFormData({...formData, released: e.target.value})} 
                    value={formData.released} />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <FormLabel>Rating above:</FormLabel>
            <NumberInput min={5.0} max={9.2} w="200px" bg={colorscheme[1]} step={0.1}>
                <NumberInputField onChange={(e) => setFormData({...formData, rating: e.target.value})} 
                    value={formData.rating} />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <FormLabel>Runtime less than:</FormLabel>
            <NumberInput min={20} max={300} w="200px" bg={colorscheme[1]}>
                <NumberInputField onChange={(e) => setFormData({...formData, runtime: e.target.value})} 
                    value={formData.runtime} />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <Button mt="39px" bg={colorscheme[1]} _hover={{bg:colorscheme[2]}} 
                type='Submit' onClick={() => handleForm()}>Submit</Button>

            </VStack>
        </CardFooter>

        </Card>
    )
} 

