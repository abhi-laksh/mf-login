import { fakeLoginApi, getUserData, authObserver } from "@MF-Org/apiHelpers";
import Grid from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";

const Form = () => {

    const navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault()

        const formData = new FormData(e.target)

        // HANDLE API
        const data = {}
        formData.forEach((value, key) => {
            data[key] = value
        });

        fakeLoginApi(data).then((response) => {

            console.log("response", response);

            if (response.error) {
                alert(response.message || "User not exist")
                return
            }


            getUserData(response.token).then((responseUSER) => {

                if (responseUSER.error) {
                    return;
                }
                authObserver.next({
                    token: response.token
                })

                localStorage.setItem("token", response.token)

                navigate("/dashboard");

            });


        })

    }
    React.useEffect(() => {

        authObserver.subscribe((data) => {

            if (!data.token) {
                return
            }

            getUserData(data.token).then((response) => {

                if (response.error) {
                    return;
                }

                navigate("/dashboard");

            });


        });

        return () => {

			// WARNING : DO NOT DO THIS
            // authObserver.unsubscribe()
        }

    }, [])

    return (
        <Grid
            containter
            component="form"
            onSubmit={handleSubmit}
        >
            <Grid
                item
                xs={8}
            >

                <TextField
                    label="Email"
                    variant="standard"
                    type="email"
                    name="email"
                />

            </Grid>

            <Grid
                item
                xs={8}
            >

                <TextField
                    label="Password"
                    variant="standard"
                    type="password"
                    name="password"
                />

            </Grid>

            <Button
                type="submit"
                variant="contained"
                sx={{
                    marginTop: "1rem"
                }}
            >Submit</Button>
        </Grid>
    );
};

export default Form;
