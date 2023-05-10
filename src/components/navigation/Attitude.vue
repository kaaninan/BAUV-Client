<template>
	<div class="_containerAttitude" ref="content">
		<div class="_content">
			<div class="outline">
				<!-- Background Colors Outside -->
				<div
					class="backContainerOut anim"
					:style="{ transform: 'rotate(' + -roll + 'deg)' }"
				>
					<div class="backTop" />
					<div class="backBottom" />
				</div>

				<!-- Background Colors Inside -->
				<div class="backContainerWindow">
					<div
						class="backContainer anim"
						:style="{
							transform: 'rotate(' + -roll + 'deg)',
							top: 'calc(' + calcPitchTop(pitch * 2) + ')'
						}"
					>
						<div class="backTop" />
						<div class="backBottom" />
					</div>
				</div>

				<!-- Bank Scales -->
				<div
					class="bankScale anim"
					:style="{ transform: 'rotate(' + -roll + 'deg)' }"
				>
					<div class="bankScaleLong">
						<div v-for="(n, i) in bankScalesLong" :key="i">
							<div
								class="line"
								:style="{
									transform: 'rotate(' + n + 'deg)',
									top: calcTop(n, 10),
									left: calcLeft(n, 2)
								}"
							/>
						</div>
					</div>

					<div class="bankScaleShort">
						<div v-for="(n, i) in bankScalesShort" :key="i">
							<div
								class="line"
								:style="{
									transform: 'rotate(' + n + 'deg)',
									top: calcTop(n, 5),
									left: calcLeft(n, 1.5)
								}"
							/>
						</div>
					</div>

					<div class="bankScaleTriangle">
						<div v-for="(n, i) in bankScalesTriangle" :key="i">
							<div
								class="line"
								:style="{
									transform: 'rotate(' + n + 'deg)',
									top: calcTop(n, 5),
									left: calcLeft(n, 5)
								}"
							/>
						</div>
					</div>

					<div class="bankScaleBigTriangle">
						<div v-for="(n, i) in bankScalesBigTriangle" :key="i">
							<div
								class="line"
								:style="{
									transform: 'rotate(' + n + 'deg)',
									top: calcTop(n, 10),
									left: calcLeft(n, 10)
								}"
							/>
						</div>
					</div>
				</div>

				<!-- Bank Scale Pointer - Sabit -->
				<div class="bankScalePointer">
					<img
						class="pointer"
						src="@/assets/images/pointer.png"
						:style="{
							top: 'calc(' + calcTop(0, 10) + ' + 10px)',
							left: calcLeft(0, 10)
						}"
					/>
				</div>

				<!-- Pitch Degree Markings -->
				<div class="pitchScaleWindow">
					<div
						class="pitchScale anim"
						:style="{
							transform: 'rotate(' + -roll + 'deg)',
							top: 'calc(' + calcPitchTop(pitch) + ')'
						}"
					>
						<div class="pitchScaleLong">
							<div v-for="(n, i) in pitchScalesLong" :key="i">
								<div
									class="leftText"
									:style="{
										top:
											'calc(50% - ' +
											calcPitchLine(n) +
											'% - 10px)'
									}"
								>
									{{ Math.abs(n) }}
								</div>
								<div
									class="line"
									:style="{
										top:
											'calc(50% - ' +
											calcPitchLine(n) +
											'% - 1px)'
									}"
								/>
								<div
									class="rightText"
									:style="{
										top:
											'calc(50% - ' +
											calcPitchLine(n) +
											'% - 10px)'
									}"
								>
									{{ Math.abs(n) }}
								</div>
							</div>
						</div>
						<div class="pitchScaleShort">
							<div v-for="(n, i) in pitchScalesShort" :key="i">
								<div
									class="line"
									:style="{
										top:
											'calc(50% - ' +
											calcPitchLine(n) +
											'% - 1px)'
									}"
								/>
							</div>
						</div>
						<div class="pitchScaleSoLong">
							<div
								class="line"
								:style="{ top: 'calc(50% - 1px)' }"
							/>
						</div>
					</div>
				</div>

				<!-- Aircraft Symbol - Sabit -->
				<div class="aircraftContainer">
					<div class="leftLine" />
					<div class="rightLine" />
					<div class="rightBottom" />
					<div class="leftBottom" />
					<div class="pointCircle" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Compass',
	data() {
		return {
			roll: 0, // degree
			pitch: 0, // degree

			bankScalesLong: [270, 300, 330, 30, 60, 90],
			bankScalesShort: [340, 350, 10, 20],
			bankScalesTriangle: [315, 45],
			bankScalesBigTriangle: [0],

			pitchScalesLong: [10, 20, -10, -20, -70],
			pitchScalesShort: [5, 15, -5, -15]
		}
	},
	mounted() {
		// this.interval = setInterval(() => {
		// this.roll = Math.floor(Math.random() * 60) - 30
		// this.pitch = Math.floor(Math.random() * 20) - 10
		// }, 2000)
		// add event listener resize
		window.addEventListener('resize', this.handleResize)
		let width = this.$refs.content.offsetWidth
		// Set height
		this.$refs.content.style.height = width + 'px'
	},
	unmounted() {
		// remove event listener resize
		window.removeEventListener('resize', this.handleResize)
		// clearInterval(this.interval)
	},
	methods: {
		handleResize() {
			let width = this.$refs.content.offsetWidth
			// Set height
			this.$refs.content.style.height = width + 'px'
		},
		calcTop(i, diff) {
			return (
				'calc(' +
				this.map(
					Math.sin(this.toRadians(this.map(i, 0, 90, 90, 0))),
					0,
					1,
					50,
					0
				) +
				'% - ' +
				diff +
				'px)'
			)
		},
		calcLeft(i, diff) {
			return (
				'calc(' +
				this.map(
					Math.cos(this.toRadians(this.map(i, 0, 90, 90, 0))),
					0,
					1,
					50,
					100
				) +
				'% - ' +
				diff +
				'px)'
			)
		},
		calcPitchLine(i) {
			return i * 1.5
		},
		calcPitchTop(i) {
			return i * 1.5 + '% - ' + i / 3.4 + 'px'
		},
		map(x, in_min, in_max, out_min, out_max) {
			return (
				((x - in_min) * (out_max - out_min)) / (in_max - in_min) +
				out_min
			)
		},
		toRadians(angle) {
			return angle * (Math.PI / 180)
		}
	}
}
</script>

<style scoped>
._containerAttitude {
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
	position: relative;
	margin-bottom: var(--block-margin);
}
._containerAttitude ._content {
	width: calc(100% - 20px);
	height: calc(100% - 20px);
	padding: 10px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
._containerAttitude .outline {
	width: 100%;
	height: 100%;
	border-radius: 1000px;
	position: relative;
	overflow: hidden;
}

/* ---------------- Background Colors Outside ---------------- */
._containerAttitude .backContainerOut {
	width: 100%;
	height: 100%;
	position: absolute;
}
._containerAttitude .backContainerOut .backTop {
	width: 100%;
	height: 50%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 4;
	background-color: #2777c3;
}
._containerAttitude .backContainerOut .backBottom {
	width: 100%;
	height: 50%;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 4;
	background-color: #5f4c2d;
}

/* ---------------- Background Colors Inside ---------------- */
._containerAttitude .backContainerWindow {
	top: 20px;
	left: 20px;
	right: 20px;
	bottom: 20px;
	border-radius: 1000px;
	position: absolute;
	background-color: red;
	z-index: 3;
	overflow: hidden;
}
._containerAttitude .backContainer {
	width: 100%;
	left: 0;
	right: 0;
	bottom: 0;
	position: absolute;
}
._containerAttitude .backContainer .backTop {
	width: 3000px;
	height: 4000px;
	position: absolute;
	top: -2000px;
	left: -1000px;
	right: -1000px;
	background-color: #2777c3;
	z-index: 20;
}
._containerAttitude .backContainer .backBottom {
	width: 3000px;
	height: 4000px;
	position: absolute;
	top: 50%;
	left: -1000px;
	right: -1000px;
	background-color: #5f4c2d;
	z-index: 20;
}

/* ---------------- Bank Scale ---------------- */
._containerAttitude .bankScale {
	position: relative;
	width: 100%;
	height: 100%;
}
._containerAttitude .bankScaleLong {
	position: absolute;
	top: 10px;
	left: 10px;
	right: 10px;
	bottom: 10px;
}
._containerAttitude .bankScaleLong .line {
	position: absolute;
	width: 4px;
	height: 20px;
	background-color: white;
	border-radius: 5;
}
._containerAttitude .bankScaleShort {
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
}
._containerAttitude .bankScaleShort .line {
	position: absolute;
	width: 3px;
	height: 10px;
	background-color: white;
	border-radius: 5;
}
._containerAttitude .bankScaleTriangle {
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
}
._containerAttitude .bankScaleTriangle .line {
	position: absolute;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 10px solid white;
}
._containerAttitude .bankScaleBigTriangle {
	position: absolute;
	top: 10px;
	left: 10px;
	right: 10px;
	bottom: 10px;
}
._containerAttitude .bankScaleBigTriangle .line {
	position: absolute;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-top: 20px solid white;
}
._containerAttitude .bankScalePointer {
	position: absolute;
	top: 20px;
	left: 20px;
	right: 20px;
	bottom: 20px;
	border-radius: 1000px;
	z-index: 10;
	border: 1px solid rgba(255, 255, 255, 0.5);
}
._containerAttitude .bankScalePointer .pointer {
	position: absolute;
	width: 20px;
	height: 20px;
}

/* ---------------- Pitch Scale ---------------- */
._containerAttitude .pitchScaleWindow {
	position: absolute;
	width: calc(100% - 40px);
	height: calc(100% - 40px);
	top: 20px;
	left: 20px;
	z-index: 3;
	overflow: hidden;
	border-radius: 1000px;
}
._containerAttitude .pitchScale {
	position: absolute;
	width: 100%;
	height: 100%;
}
._containerAttitude .pitchScale .pitchScaleLong {
	position: absolute;
	top: 10px;
	left: 10px;
	right: 10px;
	bottom: 10px;
}
._containerAttitude .pitchScale .pitchScaleLong .line {
	position: absolute;
	width: 60px;
	height: 2px;
	left: calc(50% - 30px);
	background-color: white;
}
._containerAttitude .pitchScale .pitchScaleLong .rightText {
	position: absolute;
	width: 20px;
	height: 20px;
	left: calc(50% + (30px + 5px));
	font-size: 14px;
}
._containerAttitude .pitchScale .pitchScaleLong .leftText {
	position: absolute;
	width: 20px;
	height: 20px;
	left: calc(50% - (30px + 20px));
	font-size: 14px;
}
._containerAttitude .pitchScale .pitchScaleShort {
	position: absolute;
	top: 10px;
	left: 10px;
	right: 10px;
	bottom: 10px;
}
._containerAttitude .pitchScale .pitchScaleShort .line {
	position: absolute;
	width: 40px;
	height: 2px;
	left: calc(50% - 20px);
	background-color: white;
}
._containerAttitude .pitchScale .pitchScaleSoLong {
	position: absolute;
	width: 600%;
	height: 100%;
}
._containerAttitude .pitchScale .pitchScaleSoLong .line {
	position: absolute;
	width: 600%;
	height: 2px;
	/* left: -50%; */
	background-color: white;
}

/* ---------------- Aircraft Symbol ---------------- */
._containerAttitude .aircraftContainer {
	position: absolute;
	top: 20px;
	left: 20px;
	right: 20px;
	bottom: 20px;
	z-index: 10;
}
._containerAttitude .aircraftContainer .leftLine {
	position: absolute;
	width: 80px;
	height: 4px;
	top: calc(50% - 2px); /* height / 2 */
	left: calc(
		50% - 80px - 12px
	); /* self width, centerline_width / 2 + rightLine_width */
	background-color: #eb7121;
}
._containerAttitude .aircraftContainer .rightLine {
	position: absolute;
	width: 80px;
	height: 4px;
	top: calc(50% - 2px); /* height / 2 */
	left: calc(
		50% + 12px
	); /* self width, centerline_width / 2 + rightLine_width */
	background-color: #eb7121;
}
._containerAttitude .aircraftContainer .rightBottom {
	position: absolute;
	width: 4px;
	height: 18px;
	top: calc(50% - 2px); /* height / 2 */
	left: calc(
		50% + 12px
	); /* self width, centerline_width / 2 + rightLine_width */
	background-color: #eb7121;
}
._containerAttitude .aircraftContainer .leftBottom {
	position: absolute;
	width: 4px;
	height: 18px;
	top: calc(50% - 2px); /* height / 2 */
	left: calc(
		50% - 12px - 4px
	); /* self width, centerline_width / 2 + rightLine_width */
	background-color: #eb7121;
}
._containerAttitude .aircraftContainer .pointCircle {
	position: absolute;
	top: calc(50% - 4px);
	left: calc(50% - 4px); /* self width / 2 */
	width: 8px;
	height: 8px;
	background-color: yellow;
	border-radius: 100px;
}

.anim {
	transition: all 0.5s;
}
</style>
