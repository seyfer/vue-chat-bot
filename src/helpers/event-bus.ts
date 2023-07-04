// import Vue from 'vue'
//
// const EventBus = new Vue()
//
// export default EventBus

import mitt from "mitt";

const EventBus = mitt();

export default EventBus;
