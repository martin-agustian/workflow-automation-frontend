"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormHelperText, FormLabel, Stack, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";

type FormTicket = {
  clientName: string
  clientEmail: string
  name: string
  description: string
}

const Home = () => {
  const baseURLAPI = process.env.NEXT_PUBLIC_BASE_URL_API;

  const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormTicket>({
		defaultValues: {
			clientName: "",
      clientEmail: "",
      name: "",
      description: ""
		},
	});

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmitTicket = async (data: FormTicket) => {
    try {
      setLoadingSubmit(true);
      
      const response = await fetch(baseURLAPI + "ticket_create", {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          "name": data.name,
          "description": data.description,
          "client_name": data.clientName,
          "client_email": data.clientEmail
        })
      });

      const responseData = await response.json(); 
      
      if (response.status == 201) {
        await Swal.fire({
          title: "Success!",
          text: responseData.message,
          icon: "success",
          confirmButtonColor: "#1876D2"
        });

        reset();
      }
      else {
        throw responseData.message;
      }
    }
    catch (error) {
      await Swal.fire({
        title: "Error!",
        html: error instanceof Object ? (`
          <ul>
            ${Object.entries(error).map((value: any[]) => (
              `<li>
                ${value[0]} : ${value[1].join(', ')}
              </li>`
            )).join('')}
          </ul>
        `) : error as string,
        icon: "error",
        confirmButtonColor: "#1876D2"
      });
    }
    finally {
      setLoadingSubmit(false);
    }
  }

	return (
    <div>
      <Stack minHeight={"100vh"} alignItems={"center"} justifyContent={"center"} py={5}>
        <Box maxWidth={{ sm: 500, xs: 280 }} width={{ sm: 500, xs: 280 }}>
          <Typography fontSize={20} fontWeight={"bold"} textAlign="center" mb={3}>
            Submit a Trello Issue
          </Typography>          

          <form onSubmit={handleSubmit(handleSubmitTicket)}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel sx={{ fontSize: 15, mb: 1 }}>Client Name</FormLabel>

                <TextField
                  fullWidth type="text" placeholder="Client Name" 
                  variant="outlined" size="small"
                  {...register("clientName", {
                    required: "Client name is required"
                  })}
                />

                {errors.clientName && (
                  <FormHelperText error sx={{ marginLeft: 0, marginRight: 0 }}>
                    {errors.clientName.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel sx={{ fontSize: 15, mb: 1 }}>Client Email</FormLabel>

                <TextField 
                  fullWidth type="email" placeholder="Client Email" 
                  variant="outlined" size="small"
                  {...register("clientEmail", {
                    required: "Client email is required",
                    pattern: {
                      value: /^\w+@[a-z0-9\-]+\.[a-z]{2,}(\.[a-z]{2,})?$/g,
                      message: "Client email format is invalid"
                    }
                  })} 
                />

                {errors.clientEmail && (
                  <FormHelperText error sx={{ marginLeft: 0, marginRight: 0 }}>
                    {errors.clientEmail.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel sx={{ fontSize: 15, mb: 1 }}>Title</FormLabel>

                <TextField 
                  fullWidth type="title" placeholder="Title"
                  variant="outlined" size="small"
                  {...register("name", {
                    required: "Title is required",
                  })}
                />

                {errors.name && (
                  <FormHelperText error sx={{ marginLeft: 0, marginRight: 0 }}>
                    {errors.name.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl variant="standard">
                <FormLabel sx={{ fontSize: 15, mb: 1 }}>Description</FormLabel>

                <TextField 
                  fullWidth placeholder="Description" 
                  variant="outlined" size="small" 
                  multiline minRows={5}
                  {...register("description", {
                    required: "Description is required",
                  })} 
                />

                {errors.description && (
                  <FormHelperText error sx={{ marginLeft: 0, marginRight: 0 }}>
                    {errors.description.message}
                  </FormHelperText>
                )}
              </FormControl>

              <Button type="submit" variant="contained" size="medium" disabled={loadingSubmit}>
                <Typography fontWeight="bold" fontSize="14px">
                  {loadingSubmit ? "Loading.." : "Submit"}
                </Typography>
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </div>
	);
};

export default Home;
