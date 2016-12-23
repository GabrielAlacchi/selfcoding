
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import EditorPane from './editor/EditorPane';

Tabs.setUseDefaultStyles(false);

export default class Editor extends React.Component {

  render() {
    return (
      <Tabs selectedIndex={0}>
        <TabList>
          <Tab>awesome.css</Tab>
        </TabList>
        <TabPanel>
          <EditorPane css={true} />
        </TabPanel>
      </Tabs>
    );
  }

}