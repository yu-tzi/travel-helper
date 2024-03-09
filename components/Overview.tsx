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
  Box,
  Divider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AbsoluteCenter,
  Portal,
  Select,
  VStack,
  Input,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { HiFilter, HiSortDescending } from "react-icons/hi";

export const Overview = ({ liff }: { liff: Liff | null }) => {
  const [accessToken, setAccessToken] = useState("");
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure();
  const {
    isOpen: isSortOpen,
    onOpen: onSortOpen,
    onClose: onSortClose,
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
        <Tag size="lg" colorScheme="cyan" cursor="pointer" onClick={onSortOpen}>
          <TagLeftIcon boxSize="12px" as={HiSortDescending} />
          <TagLabel>設定排序條件</TagLabel>
        </Tag>
      </div>
      {(isFilterOpen || isSortOpen) && (
        <Portal>
          <div className="w-[100vw] h-[100vh] bg-black absolute top-0 left-0 opacity-80"></div>
        </Portal>
      )}
      <Modal isOpen={isFilterOpen} onClose={onFilterClose}>
        <ModalContent maxWidth="375px" width="50vh">
          <ModalHeader>設定篩選條件</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              divider={
                <Box position="relative">
                  <Divider borderColor="gray.200" />
                  <AbsoluteCenter bg="white" px="4">
                    🔽
                  </AbsoluteCenter>
                </Box>
              }
              spacing={4}
              align="stretch"
            >
              <Select placeholder="尚未選擇篩選項目">
                <option value="option1">日期</option>
                <option value="option2">停留時間</option>
                <option value="option3">優先度</option>
              </Select>
              <Select placeholder="尚未選擇 Operator">
                <option value="option1">大於</option>
                <option value="option2">大於等於</option>
                <option value="option3">等於</option>
                <option value="option3">小於等於</option>
                <option value="option3">小於</option>
              </Select>
              <Input placeholder="Select Date" size="md" type="date" />
              <VStack spacing={1}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                ></Box>
                <RangeSlider
                  aria-label={["min", "max"]}
                  onChangeEnd={(val) => console.log(val)}
                  min={0}
                  max={30}
                  step={1}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              width={"150px"}
              size={"md"}
              onClick={onFilterClose}
            >
              套用
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isSortOpen} onClose={onSortClose}>
        <ModalContent maxWidth="375px" width="50vh">
          <ModalHeader>設定排序條件</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select placeholder="尚未選擇排序項目">
              <option value="option1">日期（新到舊）</option>
              <option value="option2">停留時間（多到少）</option>
              <option value="option2">停留時間（少到多）</option>
              <option value="option3">優先度（高到低）</option>
              <option value="option3">優先度（低到高）</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSortClose}>
              儲存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
