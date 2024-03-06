"use client";

import { Liff } from "@line/liff";
import { useEffect, useState } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { HiFilter, HiSortDescending } from "react-icons/hi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";

export const Overview = ({ liff }: { liff: Liff | null }) => {
  const [accessToken, setAccessToken] = useState("");
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure();
  useEffect(() => {
    const accessToken = liff?.isLoggedIn() && liff?.getIDToken();
    setAccessToken(accessToken || "");
  }, [liff]);
  return (
    <>
      <Box border="1px" borderColor="gray.200" borderRadius="md">
        <StatGroup>
          <Stat
            p={2}
            pb={0}
            display="flex"
            alignItems="center"
            justifyContent="start"
          >
            <StatLabel>Total todos</StatLabel>
            <StatNumber>0</StatNumber>
            <StatHelpText>5/18-5/21</StatHelpText>
          </Stat>
          <Divider orientation="vertical" h={95} />
          <Stat
            p={2}
            pb={0}
            display="flex"
            alignItems="center"
            justifyContent="start"
          >
            <StatLabel>Average Duration</StatLabel>
            <StatNumber>0</StatNumber>
            <StatHelpText>5/18-5/21</StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
      <div className="flex flex-row gap-2 flex-wrap my-2">
        <Tag
          size="lg"
          colorScheme="cyan"
          cursor="pointer"
          onClick={onFilterOpen}
        >
          <TagLeftIcon boxSize="12px" as={HiFilter} />
          <TagLabel>設定篩選條件</TagLabel>
        </Tag>
        <Tag size="lg" colorScheme="cyan" cursor="pointer">
          <TagLeftIcon boxSize="12px" as={HiSortDescending} />
          <TagLabel>設定排序條件</TagLabel>
        </Tag>
      </div>
      {isFilterOpen && (
        <Portal>
          <div className="w-[100vw] h-[100vh] bg-black absolute top-0 left-0 opacity-80"></div>
        </Portal>
      )}
      <Modal isOpen={isFilterOpen} onClose={onFilterClose}>
        <ModalContent maxWidth="375px" width="50vh">
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onFilterClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
