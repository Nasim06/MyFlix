import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import WatchList from "../components/WatchList";

    
export default function MyList() {
  return (
    <Box display="flex" justifyContent="center" mt="30px">
      <Tabs w="80vw">
        <TabList>
          <Tab>Watch List</Tab>
          <Tab>Watched</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <WatchList />
          </TabPanel>
          <TabPanel>
            
          </TabPanel>
        </TabPanels>

      </Tabs>
    </Box>
  )
}
