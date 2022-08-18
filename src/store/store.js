import io from 'socket.io-client';
import { createStore } from "vuex";

const store = createStore({
	state () {
		return {
			// App Version
			packageVersion: process.env.VERSION || '0',

			// Local States
			socketIP: null,
			socket: null,
			connected: false,
			logs: [],

			// ROS
			rosbridgeStatus: 'disconnected',
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
		},
		socketIP(state, ip) {
			state.socketIP = ip;
		}
	},
	actions: {
		// initialize socket
		initSocket({commit, state}, payload) {
			state.socket = io(state.socketIP, {
				path: '/bridge',
				autoConnect: false,
			});

			// Socket.io events
			state.socket.on('connect', () => {
				commit('setConnected', true);
				commit('createLog', {
					type: 'success',
					message: 'Connected to ' + state.socketIP,
					date: new Date(),
				});
			}).on('disconnect', () => {
				commit('setConnected', false);
				commit('createLog', {
					type: 'error',
					message: 'Disconnected from ' + state.socketIP,
					date: new Date(),
				});
			})
			// error
			.on('error', (error) => {
				commit('createLog', {
					type: 'error',
					message: error,
					date: new Date(),
				})
			}).on('connect_error', (error) => {
				commit('createLog', {
					type: 'error',
					message: error,
					date: new Date(),
				})
			})

			
			// Rosbridge events
			.on('rosbridge_status', (status) => {
				console.log('rosbridge_status', status);
				state.rosbridgeStatus = status;
			}).on('absolute_linear_velocity', (velocity) => {
				state.absolute_linear_velocity = velocity;
			}).on('relative_linear_velocity', (velocity) => {
				state.relative_linear_velocity = velocity;
			}).on('orientation_rate', (rate) => {
				state.orientation_rate = rate;
			})
		},

		// connect to socket
		connectSocket({commit, state}) {
			state.socket.connect();
		},

		// disconnect from socket
		disconnectSocket({commit, state}) {
			state.socket.disconnect();
		},

		// send message to socket
		sendMessage({commit, state}, payload) {
			state.socket.emit(payload.event, payload.data);
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
		logs: (state) => {
			// order logs by date
			return state.logs.sort((a, b) => {
				return new Date(a.date) - new Date(b.date);
			}).reverse()
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