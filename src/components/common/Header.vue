<template>
	<div class="_containerHeader">
		<img src="@/assets/images/logo.png" alt="logo" class="_logo" />

		<div class="_menu">
			<router-link v-slot="{ navigate, href }" to="/" custom>
				<a
					class="_link"
					:class="{ _active: isActiveRoute(href) }"
					:href="href"
					@click="navigate"
					>NAVIGATION</a
				>
			</router-link>
			<router-link
				v-slot="{ navigate, href }"
				to="/mission-control"
				custom
			>
				<a
					class="_link"
					:class="{ _active: isActiveRoute(href) }"
					:href="href"
					@click="navigate"
					>MISSION CONTROL</a
				>
			</router-link>
			<router-link v-slot="{ navigate, href }" to="/settings" custom>
				<a
					class="_link"
					:class="{ _active: isActiveRoute(href) }"
					:href="href"
					@click="navigate"
					>SETTINGS</a
				>
			</router-link>
			<router-link v-slot="{ navigate, href }" to="/manipulation" custom>
				<a
					class="_link"
					:class="{ _active: isActiveRoute(href) }"
					:href="href"
					@click="navigate"
					>MANIPULATION</a
				>
			</router-link>
			<router-link v-slot="{ navigate, href }" to="/comms" custom>
				<a
					class="_link"
					:class="{ _active: isActiveRoute(href) }"
					:href="href"
					@click="navigate"
					>COMMS</a
				>
			</router-link>
		</div>

		<div class="_version">
			<span>Version:&nbsp;</span>{{ $store.getters.appVersion }}
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		isActiveRoute(href) {
			return href === this.$router.currentRoute._rawValue.fullPath
		}
	}
}
</script>

<style scoped>
@import '@/assets/styles/variables.css';

._containerHeader {
	border-bottom: 1px solid var(--border-color);
	display: flex;
	justify-content: space-between;
	height: var(--header-height);
	padding: 0 var(--screen-padding);
}
._containerHeader ._logo {
	height: 60px;
	object-fit: contain;
	opacity: 0.7;
	align-self: center;
}
._containerHeader ._menu {
	height: var(--header-height);
	display: flex;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	position: absolute;
	left: 0;
	right: 0;
	min-width: 1024px;
	/* not selectable */
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
._containerHeader a._active {
	color: var(--active-color) !important;
	border: 1px solid var(--active-color) !important;
}
._containerHeader a._link {
	display: flex;
	height: fit-content;
	text-decoration: none;
	color: white;
	letter-spacing: 0.1em;
	border: 1px solid var(--border-color);
	padding: 12px 20px;
	margin: 0 10px;
	transition: all 0.3s ease-in-out;
}
._containerHeader a._link:hover {
	background-color: rgba(0, 0, 0, 0.7);
}
._containerHeader ._version {
	color: white;
	display: flex;
	align-items: center;
}
._containerHeader ._version span {
	opacity: 0.6;
}
</style>
