<script lang="ts">
	import { base } from '$app/paths';
	import apiConfig from '$lib/api/api.config';
	import type { SentimentError, SentimentResponse } from '$lib/interfaces';
	import appUtils from '$lib/utils/app.utils';
	import AsyncButton from './asyncButton.svelte';

	let text = $state<string>();
	let result = $state<string>();
	let isLoading = $state<boolean>(false);

	const submit = async () => {
		if (!text) return;
		const response = await apiConfig.submitSentiment(text);

		if ((response as SentimentError).error) {
			result = (response as SentimentError).error;
		}

		result = appUtils.getSentimentAnalysis(response as SentimentResponse);
	};
</script>

<div class="wrapper">
	<img src={`${base}/svg/analysis.svg`} alt="analysis" class="svg-icon" />
	<input type="text" bind:value={text} placeholder="Wprowadź tekst, sprawdź emocje" />
	<AsyncButton {isLoading} class="async-button" onclick={submit}>Analizuj</AsyncButton>
</div>

<style lang="scss">
	.wrapper {
		/* outline: 1px solid red; */
		max-width: 800px;
		min-width: 325px;
		width: 80%;
		height: 60px;
		display: flex;
		align-items: center;
		gap: 1rem;
		background: var(--main-input-color);
		border-radius: 20px;
		padding: 0 15px;
		position: relative;
		box-sizing: border-box;
		$border: 2px;
		background-clip: padding-box;
		border: solid $border transparent;
		border-radius: 1em;

		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;
			margin: -$border;
			border-radius: inherit;
			background: linear-gradient(to right, #555, #222);
		}
	}

	.svg-icon {
		$size: 45px;
		height: $size;
		width: $size;
	}
	input {
		height: 100%;
		/* outline: 1px solid red; */
		flex: 1;
		background: transparent;
		border: none;
		/* color: #ccc; */
		color: #000;
		color: #e4dede; // Change this to any color you want
		font-size: var(--font-size-p);
		padding-right: 5px;

		&::placeholder {
			color: #d6d3d3; // Change this to any color you want
			font-weight: 700;
			opacity: 1; // Ensure full visibility (some browsers lower opacity)
		}
	}

	:global(.async-button) {
		height: 70%;
		min-width: 100px;
		font-size: 17px;
		font-weight: 700;
		letter-spacing: 0.3px;
		padding: 0 15px;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
