
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import EditorPane from "./editor/EditorPane";

Tabs.setUseDefaultStyles(false);

export default class Editor extends React.Component {
  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  render() {
    return (
      <Tabs onSelect={this.handleSelect.bind(this)} selectedIndex={0}>
        <TabList>
          <Tab>index.html</Tab>
          <Tab>awesome.css</Tab>
        </TabList>
        <TabPanel>
          <EditorPane/>
        </TabPanel>
        <TabPanel>
          <EditorPane/>
        </TabPanel>
      </Tabs>
    )
  }

}