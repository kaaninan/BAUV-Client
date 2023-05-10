<template>
	<Transition>
		<div class="modal-mask" v-if="show">
			<div class="modal-container" id="myModal">
				<div class="modal-body">
					<div class="_block_title">MAP SETTINGS</div>
					<div class="content">
						<slot />
					</div>
					<!-- <div class="footer">
						<button @click="closeWindow">Cancel</button>
						<button>Save</button>
					</div> -->
				</div>
			</div>
		</div>
	</Transition>
</template>

<script>
export default {
	props: {
		show: Boolean
	},
	emits: ['close-window'],
	watch: {
		show(val) {
			if (val) {
				window.onclick = (event) => {
					if (event.target.className.includes('modal-mask')) {
						this.closeWindow()
					}
				}
			} else {
				window.onclick = null
			}
		}
	},
	methods: {
		closeWindow() {
			this.$emit('close-window')
		}
	}
}
</script>

<style scoped>
.modal-mask {
	position: fixed;
	z-index: 9999;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.7);
}

.modal-container {
	margin: 5% auto;
	width: 50%;
	min-width: 500px;
	border: 1px solid var(--border-color);
	background: rgb(19, 53, 79);
	background: radial-gradient(
		circle,
		rgba(19, 53, 79, 1) 0%,
		rgba(5, 20, 34, 1) 100%
	);
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.modal-body {
	background-color: var(--block-background-color);
}

.modal-body .content {
	padding: 20px;
}

/* Animation */

.v-enter-active,
.v-leave-active {
	transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
