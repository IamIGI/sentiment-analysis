<script lang="ts">
	import '$lib/styles/global.scss';
	import { base } from '$app/paths';
	import BackgroundMedia from '$lib/components/backgroundMedia.svelte';

	const VIDEO_NAME = 'abstract-color-lines.1920x1080 (1).mp4';
	const FALLBACK_IMAGE = 'background_image.JPG';

	let { children } = $props();
</script>

<div class="wrapper">
	<BackgroundMedia
		videoUrl={`${base}/video/${VIDEO_NAME}`}
		imageUrl={`${base}/img/${FALLBACK_IMAGE}`}
	/>

	{@render children()}
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
