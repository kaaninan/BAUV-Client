<template>
	<div class="_containerCompass">
		<div class="_block_title">
			<span>COMPASS</span>
		</div>

		<div class="_content">

			<div class="triangle"></div>

			<div class="outline">
				
				<div class="angles">
					<div v-for="(n, i) in 359" :key="i">
						<div class="angleItem" v-if="i % 15 == 0" :style="{transform: 'rotate(' + i + 'deg)', top: calcTop(i, 15), left: calcLeft(i, 15)}">{{i}}</div>
					</div>
				</div>

				<div class="linesShort">
					<div v-for="(n, i) in 359" :key="i">
						<div class="lineItem short" v-if="i % 5 == 0 && i % 15 != 0" :style="{transform: 'rotate(' + i + 'deg)', top: calcTop(i, 5), left: calcLeft(i, .5)}"></div>
					</div>
				</div>

				<div class="linesLong">
					<div v-for="(n, i) in 359" :key="i">
						<div class="lineItem long" v-if="i % 15 == 0" :style="{transform: 'rotate(' + i + 'deg)', top: calcTop(i, 10), left: calcLeft(i, .5)}"></div>
					</div>
				</div>
				
				<div class="directions">
					<div v-for="(n, i) in directionsBig" :key="i">
						<div class="directionItem" :style="{transform: 'rotate(' + n.degree + 'deg)', top: calcTop(n.degree, 10), left: calcLeft(n.degree, 20)}">{{n.name}}</div>
					</div>
				</div>
				<div class="directions">
					<div v-for="(n, i) in directionsSmall" :key="i">
						<div class="directionItemSmall" :style="{transform: 'rotate(' + n.degree + 'deg)', top: calcTop(n.degree, 10), left: calcLeft(n.degree, 20)}">{{n.name}}</div>
					</div>
				</div>
				
				<div class="borderBack"></div>

				<div class="headingContainer">
					<div class="headingText">Heading<br>{{heading}}</div>
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
			directionsBig: [{degree: 0, name: 'N'}, {degree: 90, name: 'E'}, {degree: 180, name: 'S'}, {degree: 270, name: 'W'}],
			directionsSmall: [{degree: 45, name: 'NE'}, {degree: 135, name: 'SE'}, {degree: 225, name: 'SW'}, {degree: 315, name: 'NW'}],
			heading: 315,
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
	}
}
</script>

<style scoped>
@import url('@/assets/styles/variables.css');

._containerCompass{
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
	position: relative;
}
._containerCompass ._content{
	padding: 20px 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

._containerCompass .triangle{
	border-left: 12px solid transparent;
	border-right: 12px solid transparent;
	border-top: 20px solid #31FD00;
	/* position: absolute; */
	/* top: 0; */
	/* left: 50%; */
	/* transform: translateX(-50%); */
}
._containerCompass .outline{
	width: 90%;
	aspect-ratio: 1;
	border-radius: 1000px;
	transform: rotate(45deg);
	/* background-color: transparent; */
	/* background-color: blue; */
	/* border: 1px solid white; */
	/* border: 30px solid white; */
	position: relative;
}
._containerCompass .angles{
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	border-radius: 1000px;
	/* background-color: red; */
	background-color: transparent;
	z-index: 2;
	/* border: 30px solid red; */
	/* border: 2px solid red; */
}
._containerCompass .angleItem{
	position: absolute;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.99rem;
}

._containerCompass .linesShort{
	position: absolute;
	top: 50px;
	left: 50px;
	right: 50px;
	bottom: 50px;
	border-radius: 1000px;
	background-color: transparent;
	z-index: 2;
	/* border: 1px solid red; */
}
._containerCompass .linesLong{
	position: absolute;
	top: 45px;
	left: 45px;
	right: 45px;
	bottom: 45px;
	border-radius: 1000px;
	background-color: transparent;
	z-index: 2;
	/* border: 1px solid blue; */
}
._containerCompass .lineItem{
	position: absolute;
	width: 1px;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	border-radius: 5px;
}

._containerCompass .long{ height: 20px }
._containerCompass .short{ height: 10px }

._containerCompass .directions{
	position: absolute;
	top: 75px;
	left: 75px;
	right: 75px;
	bottom: 75px;
	border-radius: 1000px;
	background-color: transparent;
	/* border: 1px solid blue; */
}

._containerCompass .directionItem{
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
._containerCompass .directionItemSmall{
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

._containerCompass .borderBack{
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

._containerCompass .headingContainer{
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