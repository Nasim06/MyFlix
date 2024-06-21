import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import MyListsMovies from "../components/MyListsMovies";

    
export default function MyList() {
  return (
    <Box display="flex" justifyContent="center" mt="30px">
      <Tabs w="90vw">
        <TabList>
          <Tab>Watch List</Tab>
          <Tab>Watched</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <MyListsMovies watched={"false"} />
          </TabPanel>
          <TabPanel>
            <MyListsMovies watched={"true"}/>
          </TabPanel>
        </TabPanels>

      </Tabs>
    </Box>
  )
}
