import io from 'socket.io-client';
import { createStore } from "vuex";

const store = createStore({
	state () {
		return {
			socket: io('http://localhost:1992'),
			connected: false,
		}
	},
	mutations: {
		setConnected(state, connected) {
			state.connected = connected;
		}
	}
})

export default store;