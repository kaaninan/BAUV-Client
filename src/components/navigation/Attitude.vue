<template>
	<div class="_containerAttitude">
		<div class="_block_title">
			<span>ATTUTIDE</span>
		</div>

		<div class="_content">
			<div class="outline">

				<!-- Background Colors -->
				<div class="backContainer anim" :style="{transform: 'rotate('+roll+'deg)'}">
					<div class="backTop"></div>
					<div class="backBottom"></div>
				</div>
				
				<!-- Bank Scales -->
				<div class="bankScale anim" :style="{transform: 'rotate('+roll+'deg)'}">
					<div class="bankScaleLong">
						<div v-for="(n, i) in bankScalesLong" :key="i">
							<div class="line" :style="{transform: 'rotate(' + n + 'deg)', top: calcTop(n, 15), left: calcLeft(n, 4)}"></div>
						</div>
					</div>
					
					<div class="bankScaleShort">
						<div v-for="(n, i) in bankScalesShort" :key="i">
							<div class="line" :style="{transform: 'rotate(' + n + 'deg)', top: calcTop(n, 7.5), left: calcLeft(n, 2)}"></div>
						</div>
					</div>

					<div class="bankScaleTriangle">
						<div v-for="(n, i) in bankScalesTriangle" :key="i">
							<div class="line" :style="{transform: 'rotate(' + n + 'deg)', top: calcTop(n, 8), left: calcLeft(n, 8)}"></div>
						</div>
					</div>
					
					<div class="bankScaleBigTriangle">
						<div v-for="(n, i) in bankScalesBigTriangle" :key="i">
							<div class="line" :style="{transform: 'rotate(' + n + 'deg)', top: calcTop(n, 15), left: calcLeft(n, 15)}"></div>
						</div>
					</div>
				</div>

				<!-- Bank Scale Pointer - Sabit -->
				<div class="bankScalePointer">
					<img class="pointer" src="@/assets/images/pointer.png" :style="{top: 'calc('+calcTop(0, 15)+' + 15px)', left: calcLeft(0, 13)}">
				</div>

				<!-- Pitch Degree Markings -->
				<div class="pitchScale anim" :style="{transform: 'rotate('+roll+'deg)'}">
					<div class="pitchScaleLong">
						<div v-for="(n, i) in pitchScalesLong" :key="i">
							<div class="leftText" :style="{top: 'calc(' + calcPitchLine(n * -1) + ' - 12.5px)'}">{{Math.abs(n)}}</div>
							<div class="line" :style="{top: calcPitchLine(n)}"></div>
							<div class="rightText" :style="{top: 'calc(' + calcPitchLine(n * -1) + ' - 12.5px)'}">{{Math.abs(n)}}</div>
						</div>
					</div>
					<div class="pitchScaleShort">
						<div v-for="(n, i) in pitchScalesShort" :key="i">
							<div class="line" :style="{top: calcPitchLine(n)}"></div>
						</div>
					</div>
					<div class="pitchScaleSoLong">
						<div class="line" :style="{top: calcPitchLine(0)}"></div>
					</div>
				</div>

				<!-- Aircraft Symbol -->
				<div class="aircraftContainer">
					<div class="leftLine"></div>
					<div class="rightLine"></div>
					<div class="centerLine"></div>
					<div class="leftUpLine"></div>
					<div class="rightUpLine"></div>
					<div class="centerBottomLine"></div>
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

			roll: 20, // degree
			pitch: 9, // degree

			bankScalesLong: [270, 300, 330, 30, 60, 90],
			bankScalesShort: [340, 350, 10, 20],
			bankScalesTriangle: [315, 45],
			bankScalesBigTriangle: [0],

			pitchScalesLong: [10, 20, -10, -20],
			pitchScalesShort: [5, 15, -5, -15],
		}
	},
	mounted(){
		this.interval = setInterval(() => {
			// Convert number between -30 to 30
			this.roll = Math.floor(Math.random() * 60) - 30;
		}, 2000);
	},
	unmounted(){
		clearInterval(this.interval);
	},
	methods: {
		calcTop(i, diff) {
			return 'calc(' + this.map(Math.sin(this.toRadians(this.map(i, 0, 90, 90, 0))), 0, 1, 50, 0) + '% - ' + diff + 'px)';
		},
		calcLeft(i, diff) {
			return 'calc(' + this.map(Math.cos(this.toRadians(this.map(i, 0, 90, 90, 0))), 0, 1, 50, 100) + '% - ' + diff + 'px)';
		},
		calcPitchLine(i){
			return this.map(i, -20, 20, 25, 75) + '%';
		},
		map(x, in_min, in_max, out_min, out_max) {
			return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
		},
		toRadians (angle) {
			return angle * (Math.PI / 180);
		}
	},
}
</script>

<style scoped>
@import url('@/assets/styles/variables.css');

._containerAttitude{
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
	position: relative;
	margin-bottom: var(--block-margin);
}
._containerAttitude ._content{
	padding: 20px 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
._containerAttitude .outline{
	width: 90%;
	aspect-ratio: 1;
	border-radius: 1000px;
	/* border: 1px solid white; */
	position: relative;
	transition: all 1s ease-in-out;
	overflow: hidden;
}

/* ---------------- Bank Scale ---------------- */
._containerAttitude .bankScale{
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 10;
}
._containerAttitude .bankScaleLong{
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	border-radius: 1000px;
	z-index: 10;
}
._containerAttitude .bankScaleLong .line{
	position: absolute;
	width: 8px;
	height: 30px;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5;
	z-index: 10;
}
._containerAttitude .bankScaleShort{
	position: absolute;
	top: 22.5px;
	left: 22.5px;
	right: 22.5px;
	bottom: 22.5px;
	border-radius: 1000px;
	z-index: 10;
	/* border: 1px solid blue; */
}
._containerAttitude .bankScaleShort .line{
	position: absolute;
	width: 4px;
	height: 15px;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5;
	z-index: 10;
}
._containerAttitude .bankScaleTriangle{
	position: absolute;
	top: 20px;
	left: 20px;
	right: 20px;
	bottom: 20px;
	border-radius: 1000px;
	/* background-color: rosybrown; */
}
._containerAttitude .bankScaleTriangle .line{
	position: absolute;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-top: 16px solid white;
}
._containerAttitude .bankScaleBigTriangle{
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	border-radius: 1000px;
}
._containerAttitude .bankScaleBigTriangle .line{
	position: absolute;
	border-left: 15px solid transparent;
	border-right: 15px solid transparent;
	border-top: 30px solid white;
}
._containerAttitude .bankScalePointer{
	position: absolute;
	top: 30px;
	left: 30px;
	right: 30px;
	bottom: 30px;
	border-radius: 1000px;
	z-index: 10;
	border: 1px solid rgba(255, 255, 255, .5);
}
._containerAttitude .bankScalePointer .pointer{
	position: absolute;
	width: 26px;
	height: 30px;
}



/* ---------------- Pitch Scale ---------------- */
._containerAttitude .pitchScale{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	/* transform-origin: 50% 50%; */
	/* transform: rotate(10deg); */
	/* background-color: blue; */
	/* border: 2px solid magenta; */
}
._containerAttitude .pitchScale .pitchScaleLong{
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	display: flex;
	justify-content: center;
	z-index: 10;
	/* background-color: red; */
}
._containerAttitude .pitchScale .pitchScaleLong .line{
	position: absolute;
	width: 70px;
	left: calc(50% - 35px);
	height: 3px;
	background-color: white;
}
._containerAttitude .pitchScale .pitchScaleLong .rightText{
	position: absolute;
	width: 25px;
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	left: calc(50% + (35px + 5px));
	font-size: 16px;
}
._containerAttitude .pitchScale .pitchScaleLong .leftText{
	position: absolute;
	width: 25px;
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	left: calc(50% - (35px + 30px));
	font-size: 16px;
}
._containerAttitude .pitchScale .pitchScaleShort{
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	display: flex;
	justify-content: center;
	z-index: 10;
}
._containerAttitude .pitchScale .pitchScaleShort .line{
	position: absolute;
	width: 40px;
	left: calc(50% - 20px);
	height: 3px;
	background-color: white;
}
._containerAttitude .pitchScale .pitchScaleSoLong{
	position: absolute;
	top: 30px;
	left: 30px;
	right: 30px;
	bottom: 30px;
	display: flex;
	justify-content: center;
	z-index: 10;
	/* align-items: center; */
}
._containerAttitude .pitchScale .pitchScaleSoLong .line{
	position: absolute;
	width: 100%;
	height: 2px;
	background-color: white;
}


/* ---------------- Background Colors ---------------- */
._containerAttitude .backContainer{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
._containerAttitude .backTop{
	width: 100%;
	height: 50%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #2777C3;
	z-index: 1;
}
._containerAttitude .backBottom{
	width: 100%;
	height: 50%;
	position: absolute;
	top: 50%;
	left: 0;
	background-color: #5F4C2D;
	z-index: 1;
}

/* ---------------- Aircraft Symbol ---------------- */
._containerAttitude  .aircraftContainer{
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	z-index: 10;
}
._containerAttitude  .aircraftContainer .leftLine{
	position: absolute;
	width: 62px;
	height: 7px;
	top: calc(50% - 2px); /* height / 2 */
	left: calc(50% - 62px - 40px + 10px - 4px); /* self width, centerline_width / 2 + rightLine_width */
	background-color: #EB7121;
	border-radius: 10px;
}
._containerAttitude  .aircraftContainer .rightLine{
	position: absolute;
	width: 62px;
	height: 7px;
	top: calc(50% - 2px); /* height / 2 */
	left: calc(50% + 40px - 10px + 4px); /* self width, centerline_width / 2 + rightLine_width */
	background-color: #EB7121;
	border-radius: 10px;
}
._containerAttitude  .aircraftContainer .centerLine{
	position: absolute;
	width: 80px;
	height: 7px;
	top: calc(50% + 18px);
	left: calc(50% - 40px); /* self width / 2 */
	background-color: #EB7121;
	border-radius: 10px;
}
._containerAttitude  .aircraftContainer .leftUpLine{
	position: absolute;
	top: calc(50% - 2px);
	left: calc(50% - 40px); /* centerline_width / 2 */
	width: 7px;
	height: calc(18px + 8px); /* centerline top + centerline height */
	background-color: #EB7121;
	border-radius: 10px;
}
._containerAttitude  .aircraftContainer .rightUpLine{
	position: absolute;
	top: calc(50% - 2px);
	left: calc(50% + 40px - 7px); /* centerline_width / 2 ,self width */
	width: 7px;
	height: calc(18px + 8px); /* centerline top + centerline height */
	background-color: #EB7121;
	border-radius: 10px;
}
._containerAttitude  .aircraftContainer .centerBottomLine{}


.anim{
	transition: all .5s;
}

</style>