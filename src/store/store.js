import io from 'socket.io-client';
import { createStore } from "vuex";

const store = createStore({
	state () {
		return {
			packageVersion: process.env.VERSION || '0',
			socket: io('http://localhost:1992'),
			connected: false,
			rosbridgeStatus: 'disconnected',
			logs: [],
			absolute_linear_velocity: {vx: 0, vy: 0, vz: 0},
			relative_linear_velocity: {vx: 0, vy: 0, vz: 0},
			orientation_rate: {roll: 0, pitch: 0, yaw: 0},
		}
	},
	mutations: {
		setConnected(state, connected) {
			state.connected = connected;
		},
		createLog(state, log) {
			state.logs.push(log);
		},
		clearLogs(state) {
			state.logs = [];
		}
	},
	getters: {
		appVersion: (state) => {
			return state.packageVersion
		},
		socketConnected: (state) => {
			return state.connected
		},
		rosbridgeStatus: (state) => {
			return state.rosbridgeStatus
		},
		socketIP: (state) => {
			return state.socket.io.uri
		},
		logs: (state) => {
			// order logs by date
			return state.logs.sort((a, b) => {
				return new Date(a.date) - new Date(b.date);
			}).reverse();
		},
		absolute_linear_velocity: (state) => {
			return state.absolute_linear_velocity
		},
		relative_linear_velocity: (state) => {
			return state.relative_linear_velocity
		},
		orientation_rate: (state) => {
			return state.orientation_rate
		}
	}
})

export default store;