<template>
	<div class="_containerCompass">
		<div class="_content">
			<div class="triangle" />

			<div class="outline">
				<div class="angles">
					<div v-for="(n, i) in 359" :key="i">
						<div
							v-if="i % 30 == 0"
							class="angleItem"
							:style="{
								transform: 'rotate(' + i + 'deg)',
								top: calcTop(i, 10),
								left: calcLeft(i, 10)
							}"
						>
							{{ i }}
						</div>
					</div>
				</div>

				<div class="linesShort">
					<div v-for="(n, i) in 359" :key="i">
						<div
							v-if="i % 5 == 0 && i % 15 != 0"
							class="lineItem short"
							:style="{
								transform: 'rotate(' + i + 'deg)',
								top: calcTop(i, 5),
								left: calcLeft(i, 0.5)
							}"
						/>
					</div>
				</div>

				<div class="linesLong">
					<div v-for="(n, i) in 359" :key="i">
						<div
							v-if="i % 15 == 0"
							class="lineItem long"
							:style="{
								transform: 'rotate(' + i + 'deg)',
								top: calcTop(i, 10),
								left: calcLeft(i, 0.5)
							}"
						/>
					</div>
				</div>

				<div class="directions">
					<div v-for="(n, i) in directionsBig" :key="i">
						<div
							class="directionItem"
							:style="{
								transform: 'rotate(' + n.degree + 'deg)',
								top: calcTop(n.degree, 10),
								left: calcLeft(n.degree, 20)
							}"
						>
							{{ n.name }}
						</div>
					</div>
				</div>
				<div class="directions">
					<div v-for="(n, i) in directionsSmall" :key="i">
						<div
							class="directionItemSmall"
							:style="{
								transform: 'rotate(' + n.degree + 'deg)',
								top: calcTop(n.degree, 10),
								left: calcLeft(n.degree, 20)
							}"
						>
							{{ n.name }}
						</div>
					</div>
				</div>

				<!-- <div class="borderBack"></div> -->
			</div>

			<div class="outline2">
				<div class="headingContainer">
					<div class="headingText">{{ parseInt(heading) }}</div>
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
			directionsBig: [
				{ degree: 0, name: 'N' },
				{ degree: 90, name: 'E' },
				{ degree: 180, name: 'S' },
				{ degree: 270, name: 'W' }
			],
			directionsSmall: [
				{ degree: 45, name: 'NE' },
				{ degree: 135, name: 'SE' },
				{ degree: 225, name: 'SW' },
				{ degree: 315, name: 'NW' }
			]
		}
	},
	computed: {
		heading() {
			return this.$store.state.data.heading
		}
	},
	watch: {
		heading: function (val) {
			document.querySelector(
				'._containerCompass ._content .outline'
			).style.transform = 'rotate(' + -val + 'deg)'
		}
	},
	unmounted() {
		clearInterval(this.interval)
	},
	methods: {
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
._containerCompass {
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
	position: relative;
	margin-bottom: var(--block-margin);
}
._containerCompass ._content {
	width: calc(100% - 20px);
	height: calc(100% - 20px);
	padding: 10px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

._containerCompass .triangle {
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-top: 15px solid #31fd00;
}
._containerCompass .outline {
	width: 100%;
	border-radius: 1000px;
	position: relative;
	transition: all 1s ease-in-out;
}
._containerCompass .outline:after {
	content: '';
	display: block;
	padding-bottom: 100%;
}
._containerCompass .outline2 {
	width: 100%;
	/* aspect-ratio: 1; */
	border-radius: 1000px;
	transform: rotate(45deg);
	position: absolute;
}
._containerCompass .outline2:after {
	content: '';
	display: block;
	padding-bottom: 100%;
}
._containerCompass .angles {
	position: absolute;
	top: 10px;
	left: 10px;
	right: 10px;
	bottom: 10px;
	border-radius: 1000px;
	background-color: transparent;
	z-index: 2;
}
._containerCompass .angleItem {
	position: absolute;
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.9rem;
}

._containerCompass .linesShort {
	position: absolute;
	top: 35px;
	left: 35px;
	right: 35px;
	bottom: 35px;
	border-radius: 1000px;
	background-color: transparent;
	z-index: 2;
}
._containerCompass .linesLong {
	position: absolute;
	top: 30px;
	left: 30px;
	right: 30px;
	bottom: 30px;
	border-radius: 1000px;
	background-color: transparent;
	z-index: 2;
}
._containerCompass .lineItem {
	position: absolute;
	width: 1px;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	border-radius: 5px;
}

._containerCompass .long {
	height: 20px;
}
._containerCompass .short {
	height: 10px;
}

._containerCompass .directions {
	position: absolute;
	top: 60px;
	left: 60px;
	right: 60px;
	bottom: 60px;
	border-radius: 1000px;
	background-color: transparent;
}

._containerCompass .directionItem {
	position: absolute;
	width: 40px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	border-radius: 5px;
}
._containerCompass .directionItemSmall {
	position: absolute;
	width: 40px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.8rem;
	border-radius: 5px;
}

._containerCompass .borderBack {
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

._containerCompass .headingContainer {
	position: absolute;
	top: calc(50% - 50px + 5px);
	left: calc(50% - 50px + 5px);
	transform: rotate(-45deg);
	width: 100px;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-weight: 600;
	font-size: 1.4rem;
}
</style>
