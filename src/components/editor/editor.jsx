import React, { useEffect } from 'react';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import '@blueprintjs/core/lib/css/blueprint.css';
import { createStore } from 'polotno/model/store';
import { sections } from './side-panel';
import Topbar from '../Topbar/Topbar';
import './editor.css';
import { useSelector } from 'react-redux';
const store = createStore({
  key: process.env.POLOTNO_API_KEY,
  showCredit: true,
});


export const Editor = () => {
  const { loadStore } = useSelector((state) => state.preferences);
  useEffect(() => {
    if (loadStore) {
      store.loadJSON(loadStore, true);
    }
  }, [loadStore]);

  return (
    <div>
      <Topbar store={store}/>
      <div>
        <PolotnoContainer style={{ width: '100vw', height: 'calc(100vh - 64px)' }}>
          <SidePanelWrap>
            <SidePanel store={store} sections={sections} defaultSection='custom' />
          </SidePanelWrap>
          <WorkspaceWrap>
            {/* <Toolbar store={store} downloadButtonEnabled /> */}
            <Workspace store={store} />
            <ZoomButtons store={store} />
            <PagesTimeline store={store} />
          </WorkspaceWrap>
        </PolotnoContainer>
      </div>
    </div>
  );
};

export default Editor;