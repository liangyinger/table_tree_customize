// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Example from './Example';
import LyTable from '../src';
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;

// Vue.component(ZkTable.name, ZkTable);

Vue.use(LyTable);
// Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#example',
  template: '<Example/>',
  components: { Example },
});
