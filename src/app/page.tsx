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
    }
    catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error as string,
        icon: "error"
      });
    }
    finally {
      setLoadingSubmit(false);
    }
  }

	return (
    <div>
      <Stack minHeight={"100vh"} alignItems={"center"} justifyContent={"center"} py={5}>
        <Box maxWidth={{ md: 500, xs: 280 }} width={{ md: 500, xs: 280 }}>
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

              <Button type="submit" variant="contained" size="medium">
                <Typography fontWeight="bold" fontSize="14px">
                  Submit
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
