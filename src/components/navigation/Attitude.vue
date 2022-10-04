<template>
	<div class="_containerAttitude">
		<div class="_block_title">
			<span>ATTUTIDE</span>
		</div>

		<div class="_content">
			<div class="outline">
				
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
						<div class="line" :style="{transform: 'rotate(' + n + 'deg)', top: calcTop(n, 7.5), left: calcLeft(n, 6)}"></div>
					</div>
				</div>
				
				<div class="bankScaleBigTriangle">
					<div v-for="(n, i) in bankScalesBigTriangle" :key="i">
						<div class="line" :style="{transform: 'rotate(' + n + 'deg)', top: calcTop(n, 15), left: calcLeft(n, 10)}"></div>
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
		}
	},
	methods: {
		calcTop(i, diff) {
			return 'calc(' + this.map(Math.sin(this.toRadians(this.map(i, 0, 90, 90, 0))), 0, 1, 50, 0) + '% - ' + diff + 'px)';
		},
		calcLeft(i, diff) {
			return 'calc(' + this.map(Math.cos(this.toRadians(this.map(i, 0, 90, 90, 0))), 0, 1, 50, 100) + '% - ' + diff + 'px)';
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
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 15px solid white;
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
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-top: 30px solid white;
}









._containerAttitude .directions{
	position: absolute;
	top: 75px;
	left: 75px;
	right: 75px;
	bottom: 75px;
	border-radius: 1000px;
	background-color: transparent;
	/* border: 1px solid blue; */
}

._containerAttitude .directionItem{
	position: absolute;
	width: 40px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	border-radius: 5px;
	/* border: 1px solid green; */
}
._containerAttitude .directionItemSmall{
	position: absolute;
	width: 40px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	border-radius: 5px;
	/* border: 1px solid green; */
}

._containerAttitude .borderBack{
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	border-radius: 1000px;
	background-color: transparent;
	border: 3vw solid navy;
	z-index: 1;
}

._containerAttitude .headingContainer{
	/* background-color: red; */
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) rotate(-45deg);
	width: 100px;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-weight: 600;
	color: greenyellow;
	font-size: 1.5rem;
}

</style>