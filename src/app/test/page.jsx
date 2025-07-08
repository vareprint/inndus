"use client";
import { Box, Heading, Button, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box p={6}>
      <Heading mb={4}>Welcome to Chakra UI with Next.js</Heading>
      <Text mb={4}>This is your first Chakra-powered page!</Text>
      <Button colorScheme="teal">Click Me</Button>
    </Box>
  );
}

