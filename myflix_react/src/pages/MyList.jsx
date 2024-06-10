import { Tab, TabList, Tabs } from "@chakra-ui/react";

    
export default function MyList() {
  return (
    <div>

      <Tabs>
        <TabList>
          <Tab>Watch List</Tab>
          <Tab>Watched</Tab>
        </TabList>
      </Tabs>

    </div>
  )
}
