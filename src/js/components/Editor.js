
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import EditorPane from './editor/EditorPane';

Tabs.setUseDefaultStyles(false);

export default class Editor extends React.Component {

  render() {
    return (
      <Tabs selectedIndex={1}>
        <TabList>
          <Tab>awesome.css</Tab>
          <Tab>index.html</Tab>
        </TabList>
        <TabPanel>
          <EditorPane css={true} />
        </TabPanel>
        <TabPanel>
          <EditorPane css={false} />
        </TabPanel>
      </Tabs>
    );
  }

}