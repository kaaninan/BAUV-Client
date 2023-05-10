import io from 'socket.io-client'
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	reducer: (state) => ({
		selectedMaps: state.selectedMaps
	})
})

const store = createStore({
	state: {
		// App Version
		packageVersion: process.env.VERSION || '0',

		// Local States
		socketIP: null,
		socket: null,
		connected: false,
		logs: [],

		// Map Server
		mapServerIP: 'localhost',
		mapServerPort: '8000',
		mapServerPortSVG: '8001',
		mapServerConnected: false,

		selectedMaps: [],

		// ROS
		rosbridgeStatus: 'unknown',
		absolute_linear_velocity: { vx: 0, vy: 0, vz: 0 },
		relative_linear_velocity: { vx: 0, vy: 0, vz: 0 },
		orientation_rate: { roll: 0, pitch: 0, yaw: 0 },

		subscribedTopics: [],
		dataInterval: null,

		// DATA
		data: {
			roll: 0,
			pitch: 0,
			heading: 0,
			depth: 0,
			altitude: 0,
			latitude: 0,
			longitude: 0,
			north: 0,
			east: 0,
			roll_rate: 0,
			pitch_rate: 0,
			mission_time: new Date().getTime(),
			system_time: new Date().getTime(),
			mission_duration: 0,
			sea_floor_velocity: 0,
			body_velocity: 0,
			current_power: 0,
			voltage: 0,
			endurance: 0
		}
	},
	mutations: {
		setConnected(state, connected) {
			state.connected = connected
		},
		setMapServerConnected(state, status) {
			state.mapServerConnected = status
		},
		createLog(state, log) {
			state.logs.push(log)
		},
		clearLogs(state) {
			state.logs = []
		},
		socketIP(state, ip) {
			state.socketIP = ip
		},
		toggleMap(state, payload) {
			// If payload.id is already in selectedMaps, remove it
			if (state.selectedMaps.find((e) => e.id === payload.id)) {
				state.selectedMaps = state.selectedMaps.filter(
					(e) => e.id !== payload.id
				)
			} else {
				state.selectedMaps.push(payload)
			}
		}
	},
	actions: {
		// initialize socket
		initSocket({ commit, state }) {
			if (state.socket != null) {
				return
			}

			state.socket = io(state.socketIP, {
				path: '/bridge',
				autoConnect: false
			})

			// Socket.io events
			state.socket
				.on('connect', () => {
					commit('setConnected', true)

					// Get ROSbridge status
					state.socket.emit('ROSBRIDGE_STATUS')

					commit('createLog', {
						type: 'success',
						message: 'Connected to ' + state.socketIP,
						date: new Date()
					})

					// Set Interval for Data
					state.dataInterval = setInterval(() => {
						console.log('Requesting data...')
						state.socket.emit('GET_DATA')
					}, 1000)
				})
				.on('disconnect', () => {
					clearInterval(state.dataInterval)
					commit('setConnected', false)
					state.rosbridgeStatus = 'unknown'
					commit('createLog', {
						type: 'error',
						message: 'Disconnected from ' + state.socketIP,
						date: new Date()
					})
				})
				// error
				.on('error', (error) => {
					clearInterval(state.dataInterval)
					state.rosbridgeStatus = 'unknown'
					commit('createLog', {
						type: 'error',
						message: error,
						date: new Date()
					})
				})
				.on('connect_error', (error) => {
					state.rosbridgeStatus = 'unknown'
					commit('createLog', {
						type: 'error',
						message: error,
						date: new Date()
					})
				})

				// Rosbridge events
				.on('rosbridge_status', (status) => {
					console.log('rosbridge_status', status)
					state.rosbridgeStatus = status
				})
				.on('/subscribed_topics', (data) => {
					console.log(data)
					state.subscribedTopics = data
				})

				// Data
				.on('/data', (data) => {
					console.log(data)
					state.data = data
				})
		},

		// connect to socket
		connectSocket({ state }) {
			state.socket.connect()
		},

		// disconnect from socket
		disconnectSocket({ state }) {
			// console.log(state.socket)
			state.socket.disconnect()
			state.socket = null
		},

		// send message to socket
		sendMessage({ state }, payload) {
			if (state.connected) {
				console.log('sendMessage', payload)
				state.socket.emit(payload.event, payload.data)
			} else {
				console.log('Socket not connected')
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
			return state.logs
				.sort((a, b) => {
					return new Date(a.date) - new Date(b.date)
				})
				.reverse()
		},
		subscribedTopics: (state) => {
			return state.subscribedTopics
		},
		getSelectedMaps: (state) => {
			return state.selectedMaps
		}
	},
	plugins: [vuexLocal.plugin]
})

export default store
