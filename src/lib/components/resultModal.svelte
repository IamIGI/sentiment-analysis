<script lang="ts">
	import { base } from '$app/paths';

	import Modal from './modal.svelte';
	import type { AnalysisResultDesc } from '$lib/interfaces';
	import textAnalysisResults from '$lib/constants/textAnalysisResults';
	import { onDestroy, onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	interface Props {
		result: 'good' | 'bad' | 'neutral';
		closeModal: () => void;
	}

	const MOUNT_DURATION = 700;
	let { result, closeModal }: Props = $props();
	let analysisResultDesc = $state<AnalysisResultDesc>(textAnalysisResults[result]);
	let modalRef = $state<HTMLElement | null>(null);
	let onMountTimer = $state<NodeJS.Timeout>();

	function handleClickOutside(event: MouseEvent) {
		if (modalRef && !modalRef.contains(event.target as Node)) {
			closeModal();
		}
	}

	onMount(() => {
		onMountTimer = setTimeout(
			() => document.addEventListener('click', handleClickOutside),
			MOUNT_DURATION
		);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
		clearTimeout(onMountTimer);
	});
</script>

<Modal>
	<div
		class="border-wrapper"
		bind:this={modalRef}
		transition:scale={{ start: 2, duration: MOUNT_DURATION }}
	>
		<div class="container">
			<h2 class="title">Twoja analiza jest gotowa! Oto wyniki:</h2>

			<div class="result">
				<img src={`${base}/svg/${analysisResultDesc.iconName}`} alt="result" class="svg-icon" />
				<div>
					<h2 style="color: {analysisResultDesc.color}">{analysisResultDesc.title}</h2>
					<p>{@html analysisResultDesc.desc}</p>
				</div>
			</div>
			<button onclick={closeModal}>Ok</button>
		</div>
	</div>
</Modal>

<style lang="scss">
	$borderRadius: 5px;
	$width: 650px;
	$height: 320px;
	$border: 5px;
	$backgroundGradient: linear-gradient(to right, rgb(229, 134, 19), rgb(30, 181, 158));

	.border-wrapper {
		background: $backgroundGradient;

		border-radius: $borderRadius;
		width: $width;
		height: $height;
		display: flex;
		justify-content: center;
		align-items: center;

		.container {
			width: calc($width - $border);
			height: calc($height - $border);
			background-color: var(--main-background-color);
			border-radius: calc($borderRadius + 1px);
			padding: 30px;
			padding-top: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.title {
				font-family: 'Playfair Display', serif;
			}
		}
	}

	.result {
		/* outline: 1px solid red; */
		margin: 1rem 0;
		display: flex;
		gap: 2rem;
	}

	.svg-icon {
		margin-top: 2rem;
		$size: 65px;
		height: $size;
		width: $size;
	}

	button {
		background-color: red;
		color: white;

		padding: 15px 70px;
		background: $backgroundGradient;
		border-radius: 10px;
		font-size: var(--font-size-p);
		font-weight: 700;
		text-transform: uppercase;
	}
</style>
