<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<NuxtLink class="navbar-item" to="/">
				<img src="~/assets/images/logo.svg" />
			</NuxtLink>

			<a
				role="button"
				class="navbar-burger"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbarBasicExample"
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div id="navbarBasicExample" class="navbar-menu">
			<div class="navbar-start">
				<NuxtLink to="/" class="navbar-item">
					Home
				</NuxtLink>

				<a class="navbar-item">
					About
				</a>

				<div class="navbar-item has-dropdown is-hoverable">
					<a class="navbar-link">
						Categories
					</a>

					<div class="navbar-dropdown">
						<NuxtLink class="navbar-item" to="/physiography">Physiography</NuxtLink>
						<NuxtLink class="navbar-item" to="/water">Water</NuxtLink>
						<NuxtLink class="navbar-item" to="/light">Light</NuxtLink>
						<NuxtLink class="navbar-item" to="/climate">Climate</NuxtLink>
						<NuxtLink class="navbar-item" to="/engineering">Engineering</NuxtLink>
					</div>
				</div>
			</div>

			<div class="navbar-end">
				<div class="navbar-item">
					<div class="buttons">
						<a class="button is-light" href="http://earthmaps.io">
							<strong>Data API</strong>
						</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<style lang="scss" scoped>
nav {
	border-bottom: 1px solid #eaeaea;
}
.navbar-brand img {
	min-height: 4rem;
}
</style>

<script>
export default {
	name: "Navbar"
};
</script>
