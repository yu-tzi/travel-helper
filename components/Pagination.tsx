import { Button, Box, Select, Stack } from "@chakra-ui/react";

export const Pagination = () => {
  return (
    <Box pos="fixed" bottom={"4vh"} zIndex={2} paddingBottom={4}>
      <Stack
        spacing={2}
        direction="row"
        align="center"
        width="50vh"
        maxWidth="335px"
        backgroundColor={"white"}
        p={2}
      >
        <Button colorScheme="teal" size="md">
          1
        </Button>
        <Button colorScheme="teal" size="md">
          2
        </Button>
        <Button colorScheme="teal" size="md">
          3
        </Button>
        <Select placeholder="每頁Ｘ項">
          <option value="option1">2</option>
          <option value="option2">4</option>
          <option value="option2">6</option>
        </Select>
      </Stack>
    </Box>
  );
};
