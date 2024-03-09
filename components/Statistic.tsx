import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Box,
  Divider,
} from "@chakra-ui/react";

type StatisticResponse = {
  avgDuration: number;
  maxDuration: number;
  minDuration: number;
  todoCount: number;
};

export const Statistic = ({ data }: { data: StatisticResponse }) => {
  return (
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
          <StatNumber>{data.todoCount}</StatNumber>
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
          <StatNumber>{Math.floor(data.avgDuration)}</StatNumber>
          <StatHelpText>5/18-5/21</StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
};
