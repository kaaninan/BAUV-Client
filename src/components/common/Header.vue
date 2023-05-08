<template>
	<header class="navbar navbar-expand navbar-light sticky-top">
		<div class="container-fluid">
			<h1 class="navbar-brand d-none-navbar-horizontal">
				<a @click="route('Navigation')" style="cursor: pointer">
					<img
						src="@/assets/images/logo.png"
						class="navbar-brand-image"
					/>
				</a>
			</h1>
			<div>
				<div class="container-fluid">
					<ul class="navbar-nav">
						<li
							class="nav-item"
							:class="{ active: isActive('Navigation') }"
						>
							<div
								class="nav-link"
								@click="route('Navigation')"
								style="cursor: pointer"
							>
								<span class="nav-link-icon d-lg-inline-block">
									<!-- Download SVG icon from http://tabler-icons.io/i/home -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="icon icon-tabler icon-tabler-map"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										></path>
										<path
											d="M3 7l6 -3l6 3l6 -3l0 13l-6 3l-6 -3l-6 3l0 -13"
										></path>
										<path d="M9 4l0 13"></path>
										<path d="M15 7l0 13"></path>
									</svg>
								</span>
								<span class="nav-link-title"> Navigation </span>
							</div>
						</li>

						<li
							class="nav-item"
							:class="{ active: isActive('MissionControl') }"
						>
							<div
								class="nav-link"
								@click="route('MissionControl')"
								style="cursor: pointer"
							>
								<span class="nav-link-icon d-lg-inline-block">
									<!-- Download SVG icon from http://tabler-icons.io/i/package -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="icon icon-tabler icon-tabler-git-branch"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										></path>
										<path
											d="M7 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
										></path>
										<path
											d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
										></path>
										<path
											d="M17 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
										></path>
										<path d="M7 8l0 8"></path>
										<path
											d="M9 18h6a2 2 0 0 0 2 -2v-5"
										></path>
										<path d="M14 14l3 -3l3 3"></path>
									</svg>
								</span>
								<span class="nav-link-title">
									Mission Control
								</span>
							</div>
						</li>

						<li
							class="nav-item"
							:class="{ active: isActive('Settings') }"
						>
							<div
								class="nav-link"
								@click="route('Settings')"
								style="cursor: pointer"
							>
								<span class="nav-link-icon d-lg-inline-block">
									<!-- Download SVG icon from http://tabler-icons.io/i/package -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="icon icon-tabler icon-tabler-settings"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										></path>
										<path
											d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
										></path>
										<path
											d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"
										></path>
									</svg>
								</span>
								<span class="nav-link-title"> Settings </span>
							</div>
						</li>

						<li
							class="nav-item"
							:class="{ active: isActive('Manipulation') }"
						>
							<div
								class="nav-link"
								@click="route('Manipulation')"
								style="cursor: pointer"
							>
								<span class="nav-link-icon d-lg-inline-block">
									<!-- Download SVG icon from http://tabler-icons.io/i/package -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="icon icon-tabler icon-tabler-device-gamepad-2"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										></path>
										<path
											d="M12 5h3.5a5 5 0 0 1 0 10h-5.5l-4.015 4.227a2.3 2.3 0 0 1 -3.923 -2.035l1.634 -8.173a5 5 0 0 1 4.904 -4.019h3.4z"
										></path>
										<path
											d="M14 15l4.07 4.284a2.3 2.3 0 0 0 3.925 -2.023l-1.6 -8.232"
										></path>
										<path d="M8 9v2"></path>
										<path d="M7 10h2"></path>
										<path d="M14 10h2"></path>
									</svg>
								</span>
								<span class="nav-link-title">
									Manipulation
								</span>
							</div>
						</li>

						<li
							class="nav-item"
							:class="{ active: isActive('Comms') }"
						>
							<div
								class="nav-link"
								@click="route('Comms')"
								style="cursor: pointer"
							>
								<span class="nav-link-icon d-lg-inline-block">
									<!-- Download SVG icon from http://tabler-icons.io/i/package -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="icon icon-tabler icon-tabler-access-point"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										></path>
										<path d="M12 12l0 .01"></path>
										<path
											d="M14.828 9.172a4 4 0 0 1 0 5.656"
										></path>
										<path
											d="M17.657 6.343a8 8 0 0 1 0 11.314"
										></path>
										<path
											d="M9.168 14.828a4 4 0 0 1 0 -5.656"
										></path>
										<path
											d="M6.337 17.657a8 8 0 0 1 0 -11.314"
										></path>
									</svg>
								</span>
								<span class="nav-link-title"> Comms </span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<h3 class="p-0 m-0">
				<span class="status">
					Version: {{ $store.getters.appVersion }}
				</span>
			</h3>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header',
	methods: {
		route(name) {
			this.$router.push({
				name: name
			})
		},
		isActive(name) {
			return this.$route.name == name
		}
	}
}
</script>
