<script lang="ts">
	interface Props {
		videoUrl: string;
		imageUrl: string;
	}
	let { videoUrl, imageUrl }: Props = $props();

	let videoElement = $state<HTMLVideoElement>();
	let showBackgroundImage = $state<boolean>(true);

	function preventContextMenu(event: MouseEvent) {
		event.preventDefault();
	}

	function setPlaybackSpeed() {
		if (videoElement) videoElement.playbackRate = 0.7;
	}
</script>

{#if showBackgroundImage}
	<img src={imageUrl} alt="Fallback background" class="background-video" />
{/if}

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
	onloadeddata={() => (showBackgroundImage = false)}
>
	<source src={videoUrl} type="video/mp4" onerror={() => (showBackgroundImage = true)} />
	Ups. Your browser does not support the video tag.
</video>

<style lang="scss">
	.background-video {
		max-width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover; // Ensures the video covers the entire section
		z-index: -1; // Pushes the video behind content

		&::-webkit-media-controls-fullscreen-button {
			display: none;
		}

		@media (max-width: 550px) {
			filter: brightness(0.9);
		}
	}
</style>
