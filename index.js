/**
 * @format
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/redux/store';
import TrackPlayer from 'react-native-track-player';

import { Bugfender } from '@bugfender/rn-bugfender';

const AppGate = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <App />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

Bugfender.init({
  appKey: `cqR3O71Ss5FSY6Uzk2Ysg67hctHaIkfz`,
})
TrackPlayer.registerPlaybackService(() => require('./service'));
AppRegistry.registerComponent(appName, () => AppGate);
