<script lang="ts">
	import apiConfig from '$lib/api/api.config';
	import type { SentimentError, SentimentResponse } from '$lib/interfaces';
	import appUtils from '$lib/utils/app.utils';

	let text = $state<string>();
	let result = $state<string>();

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
	<h1>Sentiment Analysis</h1>
	<input type="text" bind:value={text} placeholder="Enter a phrase" required />
	<button onclick={submit}>Submit</button>
	{#if result}
		<p>{result}</p>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input {
		margin-bottom: 10px;
		padding: 8px;
		width: 100%;
		max-width: 400px;
	}
	button {
		padding: 8px 16px;
		cursor: pointer;
	}
	p {
		margin-top: 20px;
		font-size: 1.2em;
	}
</style>
