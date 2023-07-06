import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { Mention } from './components/mention';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Mention
        users={[
          {DisplayName:'',NickName:'YJ'},
          {DisplayName:'杨小宝',NickName:'YJ'}
        ]}
        onSelect={console.log}
      />
    </div>
  );
};

export default App;
