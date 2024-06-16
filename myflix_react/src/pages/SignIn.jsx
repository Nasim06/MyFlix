import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { Form, useNavigate } from "react-router-dom";
import SignedInContext from "../utils/SignedInContext";

export default function SignIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false)
    const { signedIn, setSignedIn } = useContext(SignedInContext);

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

            const response = await fetch("http://127.0.0.1:8000/api/auth/jwt/create", requestOptions);
            
            if(response.status == 401){
                setShowAlert(true);
            }
            if(!response.ok){
                throw new Error("Login Failed");
            }

            const data = await response.json();
            setUsername("");
            setPassword("");
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            console.log(data.access);
            console.log(data.refresh);
            setSignedIn(true);
            navigate("/Profile");

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

                    {showAlert && (
                        <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>Email/ Password Did Not Matched.</AlertDescription>
                        </Alert>
                    )}

                </Form>
            </Box>
        </Flex>
    )
}
