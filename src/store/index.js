import io from 'socket.io-client'
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	reducer: (state) => ({
		socketIP: state.socketIP,
		selectedMaps: state.selectedMaps
	})
})

const store = createStore({
	state: {
		// App Version
		packageVersion: process.env.VERSION || '0',

		// Status
		status: {
			socket: false,
			map: false,
			rosbridge: 'unknown' // move to data
		},

		// Socket IP
		socketIP: 'http://localhost:1992',
		socket: null,

		// Map Server
		mapServerIP: 'localhost',
		mapServerPort: '8000',
		mapServerPortSVG: '8001',

		logs: [],
		selectedMaps: [],

		// ROS
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
			state.status.socket = connected
		},
		setMapServerConnected(state, status) {
			state.status.map = status
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
		connectSocket({ commit, state }) {
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
					state.socket.emit('GET_SUBSCRIBED_TOPICS')

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
					state.status.rosbridge = 'unknown'
					commit('createLog', {
						type: 'error',
						message: 'Disconnected from ' + state.socketIP,
						date: new Date()
					})
				})
				// error
				.on('error', (error) => {
					clearInterval(state.dataInterval)
					state.status.rosbridge = 'unknown'
					commit('createLog', {
						type: 'error',
						message: error,
						date: new Date()
					})
				})
				.on('connect_error', (error) => {
					state.status.rosbridge = 'unknown'
					commit('createLog', {
						type: 'error',
						message: error,
						date: new Date()
					})
				})

				// Rosbridge events
				.on('rosbridge_status', (status) => {
					console.log('rosbridge_status', status)
					state.status.rosbridge = status
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
			if (state.status.socket) {
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
			return state.status.socket
		},
		mapServerConnected: (state) => {
			return state.status.map
		},
		rosbridgeStatus: (state) => {
			return state.status.rosbridge
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
