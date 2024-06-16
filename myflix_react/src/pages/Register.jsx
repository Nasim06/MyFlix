import { Box, Button, Flex, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        try{

            e.preventDefault();
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            };

            const response = await fetch("http://127.0.0.1:8000/api/auth/users/", requestOptions);
            const data = await response.json();
            
            if(!response.ok){
                throw new Error("Login Failed");
            }

            navigate("/SignIn");
            toast({
                title: 'Account created',
                description: "We have created an account for you",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            
        }catch(error){
            console.log(error);
        }
    }

    return (
        <Flex justify="center">
            <Box h="500px" w="400px" p="40px">
                <Form onSubmit={handleSubmit}>

                    <FormLabel>Username:</FormLabel>
                    <Input value={username} 
                    onChange={(e) => setUsername(e.target.value)}/>

                    <FormLabel mt="20px">Password:</FormLabel>
                    <Input value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>

                    <Button type="submit" mt="30px" ml="100px">Submit</Button>

                </Form>
            </Box>
        </Flex>
    )
}
