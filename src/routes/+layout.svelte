<script lang="ts">
	import { base } from '$app/paths';
	import '$lib/styles/global.scss';
	const VIDEO_NAME = 'abstract-color-lines.1920x1080 (1).mp4';

	let { children } = $props();

	let videoElement = $state<HTMLVideoElement>();

	function preventContextMenu(event: MouseEvent) {
		event.preventDefault(); // Disable right-click and context menu
	}

	function setPlaybackSpeed() {
		if (videoElement) videoElement.playbackRate = 0.7;
	}
</script>

<div class="wrapper">
	<!-- Background Video -->
	<video
		bind:this={videoElement}
		class="background-video"
		autoplay
		muted
		loop
		playsinline
		disablePictureInPicture
		controls={false}
		oncontextmenu={preventContextMenu}
		onloadedmetadata={setPlaybackSpeed}
	>
		<source src={`${base}/video/${VIDEO_NAME}`} type="video/mp4" />
		Ups. Your browser does not support the video tag.
	</video>
	{@render children()}
</div>

<style lang="scss">
	.wrapper {
		/* border: 1px solid green; */
		width: 100%;
		height: 100%;
		position: relative;

		.background-video {
			max-width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover; // Ensures the video covers the entire section
			z-index: -1; // Pushes the video behind content

			// Add a filter to make the video darker
			/* filter: brightness(1) contrast(1.2); // Adjust values to your preference */
			filter: brightness(1); // Adjust values to your preference

			/* Optional: Hide fullscreen button on iOS and mobile browsers */
			&::-webkit-media-controls-fullscreen-button {
				display: none;
			}

			@media (max-width: 550px) {
				filter: brightness(0.9);
			}
		}
	}
</style>
