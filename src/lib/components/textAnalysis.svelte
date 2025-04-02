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

<div class="border">
	<div class="container">
		<img src={`${base}/svg/analysis.svg`} alt="analysis" class="svg-icon" />
		<input type="text" bind:value={text} placeholder="Wprowadź tekst, sprawdź emocje" />
		<AsyncButton {isLoading} class="async-button" onclick={submit}>Analizuj</AsyncButton>
	</div>
</div>

<style lang="scss">
	.border {
		$borderRadius: 15px;
		background: linear-gradient(to right, white, rgba(32, 32, 32));
		border-radius: $borderRadius;
		max-width: 800px;
		min-width: 325px;
		width: 80%;

		.container {
			width: 100%;
			height: 60px;
			display: flex;
			align-items: center;
			gap: 1rem;
			background: var(--main-input-color);
			border-radius: calc($borderRadius + 1px);
			padding: 0 15px;
			color: #fff;
			background-clip: padding-box;
			border: solid 1px transparent;
		}
	}

	.svg-icon {
		$size: 45px;
		height: $size;
		width: $size;
	}
	input {
		height: 100%;
		flex: 1;
		background: transparent;
		border: none;
		color: #ccc;
		font-size: var(--font-size-p);
		padding-right: 5px;
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
