import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";

    
export default function MyList() {
  return (
    <Box display="flex" justifyContent="center" mt="30px">
      <Tabs w="80vw">
        <TabList>
          <Tab>Watch List</Tab>
          <Tab>Watched</Tab>
        </TabList>
      </Tabs>
    </Box>
  )
}
