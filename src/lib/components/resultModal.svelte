<script lang="ts">
	import { base } from '$app/paths';
	import Modal from './modal.svelte';
	import type { AnalysisResultDesc, ResultCategoryEnum } from '$lib/interfaces';
	import textAnalysisResults from '$lib/constants/textAnalysisResults';
	import { onDestroy, onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	interface Props {
		result: ResultCategoryEnum;
		score: string;
		onModalClose: () => void;
	}
	let { result, score, onModalClose }: Props = $props();

	const MOUNT_DURATION = 700;
	let analysisResultDesc = $state<AnalysisResultDesc>(textAnalysisResults[result]);
	let modalRef = $state<HTMLElement | null>(null);
	let onMountTimer = $state<NodeJS.Timeout>();

	function handleClickOutside(event: MouseEvent) {
		if (modalRef && !modalRef.contains(event.target as Node)) {
			onModalClose();
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Enter') {
			onModalClose();
		}
	}

	onMount(() => {
		onMountTimer = setTimeout(() => {
			document.addEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeyPress);
		}, MOUNT_DURATION);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
		document.removeEventListener('keydown', handleKeyPress);
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
			<h2 class="title">Twoja analiza jest gotowa!</h2>

			<div class="result">
				<img src={`${base}/svg/${analysisResultDesc.iconName}`} alt="result" class="svg-icon" />
				<div class="result-desc">
					<h2 style="color: {analysisResultDesc.color}">
						{analysisResultDesc.title}
						<img
							src={`${base}/svg/${analysisResultDesc.iconName}`}
							alt="result"
							class="svg-icon-mobile"
						/>
					</h2>
					<p>Wynik: <span style="color: {analysisResultDesc.color}">{score}</span></p>
					<p>{@html analysisResultDesc.desc}</p>
				</div>
			</div>
			<button onclick={onModalClose}>Ok</button>
		</div>
	</div>
</Modal>

<style lang="scss">
	$borderRadius: 5px;
	$width: 650px;
	$height: 350px;
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
		.result-desc {
			p {
				margin: 5px 0;
				&:first-of-type {
					font-weight: 700;
				}
			}
		}
	}

	.svg-icon {
		margin-top: 2rem;
		$size: 65px;
		height: $size;
		width: $size;
	}
	.svg-icon-mobile {
		$size: 30px;
		height: $size;
		width: $size;
		display: none;
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

	@media (max-width: 700px) {
		$width: 80vw;
		$height: 350px;
		$border: 5px;
		.border-wrapper {
			width: $width;
			height: $height;
			.container {
				width: calc($width - $border);
				height: calc($height - $border);
			}
		}

		.result {
			/* outline: 1px solid red; */
			margin: 1rem 0;

			gap: 1rem;
		}

		.svg-icon {
			$size: 45px;
			height: $size;
			width: $size;
		}
	}

	@media (max-width: 500px) {
		$height: 400px;
		$border: 5px;
		.border-wrapper {
			height: $height;
			.container {
				height: calc($height - $border);
			}
		}
		.result-desc h2 {
			font-size: 20px;
			width: fit-content;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 1rem;
		}
		.svg-icon-mobile {
			display: block;
		}
		.svg-icon {
			display: none;
		}
	}

	@media (max-width: 400px) {
		$height: 430px;
		$border: 5px;
		.border-wrapper {
			height: $height;
			.container {
				height: calc($height - $border);
			}
		}

		.result-desc h2 {
			font-size: 18px;
			width: fit-content;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 1rem;
		}
	}
</style>
