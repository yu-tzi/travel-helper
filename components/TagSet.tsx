import {
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Dispatch, useMemo } from "react";
import { HiFilter, HiSortDescending } from "react-icons/hi";

type DataSetting = {
  filterTarget?: "duration" | "priority" | "none";
  filterOperator?: "gt" | "gte" | "equal" | "lte" | "lt" | "none";
  filterInput?: number;
  sortingTarget?: "duration" | "-duration" | "priority" | "-priority" | "none";
  currentPage?: number;
  countPerPage?: number;
};
type StatisticResponse = {
  avgDuration: number;
  maxDuration: number;
  minDuration: number;
  todoCount: number;
};

export const TagSet = ({
  state,
  dispatch,
  statistic,
}: {
  state: DataSetting;
  dispatch: Dispatch<Partial<DataSetting>>;
  statistic: StatisticResponse;
}) => {
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
  const filterString = useMemo(() => {
    const { filterInput, filterOperator, filterTarget } = state;
    if (filterOperator !== "none" && filterTarget !== "none") {
      return `${filterTarget} ${filterOperator} ${filterInput}`;
    }
    return "設定篩選條件";
  }, [state]);
  return (
    <>
      <div className="flex flex-row gap-2 flex-wrap my-2">
        <Tag
          size="lg"
          colorScheme="cyan"
          cursor="pointer"
          onClick={() => {
            onFilterOpen(),
              dispatch({
                filterTarget: "none",
                filterOperator: "none",
                filterInput: 0,
              });
          }}
        >
          <TagLeftIcon boxSize="12px" as={HiFilter} />
          <TagLabel>{filterString}</TagLabel>
        </Tag>
        <Tag
          size="lg"
          colorScheme="cyan"
          cursor="pointer"
          onClick={() => {
            onSortOpen();
          }}
        >
          <TagLeftIcon boxSize="12px" as={HiSortDescending} />
          <TagLabel>設定排序條件</TagLabel>
        </Tag>
      </div>
      {(isFilterOpen || isSortOpen) && (
        <Portal>
          <div className="w-[100vw] h-[100vh] bg-black absolute top-0 left-0 opacity-80 z-10"></div>
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
              <Select
                placeholder="尚未選擇篩選標的"
                onChange={(e) => {
                  const target = e.target.value;
                  if (["duration", "priority"].includes(target)) {
                    dispatch({
                      filterTarget: target as "duration" | "priority",
                      filterOperator: "none",
                      filterInput: 0,
                    });
                  } else {
                    dispatch({
                      filterTarget: "none",
                      filterOperator: "none",
                      filterInput: 0,
                    });
                  }
                }}
              >
                <option value="duration">停留時間</option>
                <option value="priority">優先度</option>
              </Select>
              {state.filterTarget && state.filterTarget !== "none" && (
                <Select
                  placeholder="尚未選擇篩選 operator"
                  onChange={(e) => {
                    const target = e.target.value;
                    if (["gt", "gte", "equal", "lte", "lt"].includes(target)) {
                      dispatch({
                        filterInput: 0,
                        filterOperator: target as
                          | "gt"
                          | "gte"
                          | "equal"
                          | "lte"
                          | "lt",
                      });
                    } else {
                      dispatch({ filterOperator: "none", filterInput: 0 });
                    }
                  }}
                >
                  <option value="gt">大於</option>
                  <option value="gte">大於等於</option>
                  <option value="equal">等於</option>
                  <option value="lte">小於等於</option>
                  <option value="lt">小於</option>
                </Select>
              )}
              {state.filterOperator &&
                state.filterOperator !== "none" &&
                state.filterTarget === "duration" && (
                  <VStack spacing={1}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      w={"100%"}
                    >
                      <p>0</p>
                      <p>{statistic.maxDuration}</p>
                    </Box>
                    <Slider
                      onChangeEnd={(value) => dispatch({ filterInput: value })}
                      aria-label="slider-ex-1"
                      defaultValue={state.filterInput}
                      max={statistic.maxDuration}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </VStack>
                )}
              {state.filterOperator &&
                state.filterOperator !== "none" &&
                state.filterTarget === "priority" && (
                  <NumberInput
                    max={5}
                    min={0}
                    onChange={(value) =>
                      dispatch({ filterInput: parseInt(value) })
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              width={"150px"}
              size={"md"}
              disabled={true}
              onClick={() => {
                onFilterClose(), console.log(state);
              }}
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
