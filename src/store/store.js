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

			// Map Server
			mapServerIP: "localhost",
			mapServerPort: "8000",
			mapServerPortSVG: "8001",
			mapServerConnected: false,

			// ROS
			rosbridgeStatus: 'unknown',
			absolute_linear_velocity: {vx: 0, vy: 0, vz: 0},
			relative_linear_velocity: {vx: 0, vy: 0, vz: 0},
			orientation_rate: {roll: 0, pitch: 0, yaw: 0},

			subscribedTopics: [],
		}
	},
	mutations: {
		setConnected(state, connected) {
			state.connected = connected;
		},
		setMapServerConnected(state, status) {
			state.mapServerConnected = status;
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
			
			if(state.socket != null) { return; }
			
			state.socket = io(state.socketIP, {
				path: '/bridge',
				autoConnect: false,
			});

			// Socket.io events
			state.socket.on('connect', () => {
				commit('setConnected', true);

				// Get ROSbridge status
				state.socket.emit('ROSBRIDGE_STATUS');

				commit('createLog', {
					type: 'success',
					message: 'Connected to ' + state.socketIP,
					date: new Date(),
				});
			}).on('disconnect', () => {
				commit('setConnected', false);
				state.rosbridgeStatus = 'unknown'
				commit('createLog', {
					type: 'error',
					message: 'Disconnected from ' + state.socketIP,
					date: new Date(),
				});
			})
			// error
			.on('error', (error) => {
				state.rosbridgeStatus = 'unknown'
				commit('createLog', {
					type: 'error',
					message: error,
					date: new Date(),
				})
			}).on('connect_error', (error) => {
				state.rosbridgeStatus = 'unknown'
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
			}).on('/imu_data', (data) => {
				commit('createLog', {
					type: 'info',
					message: data,
					date: new Date(),
				})
				// console.log(data)
			}).on('/subscribed_topics', (data) => {
				console.log(data)
				state.subscribedTopics = data;
			})
		},

		// connect to socket
		connectSocket({commit, state}) {
			state.socket.connect();
		},

		// disconnect from socket
		disconnectSocket({commit, state}) {
			console.log(state.socket)
			state.socket.disconnect();
			state.socket = null
		},

		// send message to socket
		sendMessage({commit, state}, payload) {
			if(state.connected){
				console.log('sendMessage', payload);
				state.socket.emit(payload.event, payload.data);
			}else{
				console.log("Socket not connected");
			}
		}
	},
	getters: {
		appVersion: (state) => {
			return state.packageVersion
		},
		socketConnected: (state) => {
			return state.connected
		},
		mapServerConnected: (state) => {
			return state.mapServerConnected
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
		},
		subscribedTopics: (state) => {
			return state.subscribedTopics
		}
	}
})

export default store;