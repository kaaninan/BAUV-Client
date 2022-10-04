<template>
	<div class="_containerAttitude">
		<div class="_block_title">
			<span>ATTUTIDE</span>
		</div>

		<div class="_content">
			<div class="outline">
				
				<!-- Bank Scales -->
				<div style="position: relative; width: 100%; height: 100%; transform: rotate(0deg);">
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

				<!-- Bank Scale Pointer -->
				<div class="bankScalePointer">
					<img class="pointer" src="@/assets/images/pointer.png" :style="{top: calcTop(0, 15), left: calcLeft(0, 13)}">
				</div>

				<!-- Pitch Degree Markings -->
				<div class="pitchScale">
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



			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Compass',
	data() {
		return {
			bankScalesLong: [270, 300, 330, 30, 60, 90],
			bankScalesShort: [340, 350, 10, 20],
			bankScalesTriangle: [315, 45],
			bankScalesBigTriangle: [0],

			pitchScalesLong: [10, 20, -10, -20],
			pitchScalesShort: [5, 15, -5, -15],
		}
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

._containerAttitude .triangle{
	border-left: 12px solid transparent;
	border-right: 12px solid transparent;
	border-top: 20px solid #31FD00;
	/* position: absolute; */
	/* top: 0; */
	/* left: 50%; */
	/* transform: translateX(-50%); */
}
._containerAttitude .outline{
	width: 90%;
	aspect-ratio: 1;
	border-radius: 1000px;
	border: 1px solid white;
	position: relative;
	transition: all 1s ease-in-out;
}

/* BANK SCALE */
._containerAttitude .bankScaleLong{
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	border-radius: 1000px;
	/* background-color: transparent; */
	/* background-color: rosybrown; */
	/* border: 30px solid red; */
	/* border: 2px solid red; */
}
._containerAttitude .bankScaleLong .line{
	position: absolute;
	width: 8px;
	height: 30px;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5
}

._containerAttitude .bankScaleShort{
	position: absolute;
	top: 22.5px;
	left: 22.5px;
	right: 22.5px;
	bottom: 22.5px;
	border-radius: 1000px;
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
	border-radius: 5
}

._containerAttitude .bankScaleTriangle{
	position: absolute;
	top: 27px;
	left: 27px;
	right: 27px;
	bottom: 27px;
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
	/* background-color: rosybrown; */
}

._containerAttitude .bankScaleBigTriangle .line{
	position: absolute;
	border-left: 15px solid transparent;
	border-right: 15px solid transparent;
	border-top: 30px solid white;
}

._containerAttitude .bankScalePointer{
	position: absolute;
	top: 50px;
	left: 50px;
	right: 50px;
	bottom: 50px;
	border-radius: 1000px;
	/* background-color: rosybrown; */
}

._containerAttitude .bankScalePointer .pointer{
	position: absolute;
	width: 26px;
	height: 30px;
	/* border: 1px solid red; */
}




._containerAttitude .pitchScale{
	
}
._containerAttitude .pitchScale .pitchScaleLong{
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	display: flex;
	justify-content: center;
	/* align-items: center; */
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
	/* align-items: center; */
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
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	display: flex;
	justify-content: center;
	/* align-items: center; */
}

._containerAttitude .pitchScale .pitchScaleSoLong .line{
	position: absolute;
	width: 100%;
	/* left: calc(50% - 100px); */
	height: 2px;
	background-color: white;
}




</style>