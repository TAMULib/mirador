import MiradorViewer from './lib/MiradorViewer';
import { addWindow } from './state/actions/window';
import { miradorImageToolsPlugin } from 'mirador-image-tools';

var tamu = {
  getInstance: () => {
    var _miradorInstance = null;

    return {
      initialize: function (id, settings) {
        console.log('id', id);
        console.log('settings', settings);
        if (_miradorInstance == null) {
          _miradorInstance = new MiradorViewer({
            id,
            window: {
              allowClose: false,
              allowFullscreen: true,
              hideWindowTitle: true,
              sideBarOpen: false
            },
            windows: [],
            workspaceControlPanel: {
              enabled: false
            },
            workspace: {
              showZoomControls: true
            },
            ...settings,
          }, {
            plugins: [
              miradorImageToolsPlugin
            ]
          });
        }
      },
      addWindow: function (manifestId) {
        console.log('loading manifest', manifestId);
        if (_miradorInstance != null) {
          _miradorInstance.store.dispatch(addWindow({
            manifestId: manifestId,
            imageToolsEnabled: true,
            imageToolsOpen: false
          }));
        }
      },
      destroy: function () {
        if (_miradorInstance != null) {
          _miradorInstance.unmount();
          _miradorInstance = null;
        }
      }
    };
  }
}

export default {
  tamu
};
