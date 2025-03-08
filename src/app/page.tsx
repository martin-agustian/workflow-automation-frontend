"use client";
import { Box, Button, FormControl, FormLabel, Stack, TextField, Typography } from "@mui/material";

const Home = () => {
	const handleSubmit = async (e: any) => {		
	};

	return (
    <>
      <Stack minHeight={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Box maxWidth={280} width={280}>
          <Typography fontSize={20} fontWeight={"bold"} textAlign="center" mb={3}>
            Submit a Trello Issue
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel sx={{ fontSize: 15, mb: 1 }}>Client Name</FormLabel>

                <TextField
                  fullWidth type="text" placeholder="Client Name" 
                  variant="outlined" size="small" required 
                />
              </FormControl>

              <FormControl>
                <FormLabel sx={{ fontSize: 15, mb: 1 }}>Client Email</FormLabel>

                <TextField 
                  fullWidth type="email" placeholder="Client Email" 
                  variant="outlined" size="small" required 
                />
              </FormControl>

              <FormControl>
                <FormLabel sx={{ fontSize: 15, mb: 1 }}>Title</FormLabel>

                <TextField 
                  fullWidth type="title" placeholder="Title"
                  variant="outlined" size="small" required 
                />
              </FormControl>

              <FormControl variant="standard">
                <FormLabel sx={{ fontSize: 15, mb: 1 }}>Description</FormLabel>

                <TextField 
                  fullWidth placeholder="Description" 
                  variant="outlined" size="small" 
                  multiline minRows={5} required 
                />
              </FormControl>

              <Button variant="contained" size="medium">
                <Typography fontWeight="bold" fontSize="14px">
                  Submit
                </Typography>
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </>
	);
};

export default Home;
