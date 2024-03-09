import { HiOutlinePencilAlt } from "react-icons/hi";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
  Box,
  Heading,
  Text,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

export const TourCards = () => {
  return (
    <Tabs isFitted variant="soft-rounded" colorScheme="green">
      <TabList mb="1em">
        <Tab>未來的行程</Tab>
        <Tab>過去的行程</Tab>
      </TabList>
      <TabPanels overflow={"scroll"} h={"430px"}>
        <TabPanel padding="0px">
          <Card marginBottom={2} backgroundColor={"gray.100"}>
            <CardHeader>
              <Heading size="md">2023/01/02</Heading>
            </CardHeader>
            <CardBody paddingTop={0}>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading
                    size="md"
                    textTransform="uppercase"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    逛街
                    <HiOutlinePencilAlt />
                  </Heading>
                  <Stack direction="column" spacing={0} marginTop={2}>
                    <Checkbox colorScheme="red" defaultChecked>
                      Checkbox
                    </Checkbox>
                    <Checkbox colorScheme="green" defaultChecked>
                      Checkbox
                    </Checkbox>
                  </Stack>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
