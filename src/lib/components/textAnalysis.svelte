<script lang="ts">
	import { base } from '$app/paths';
	import apiConfig from '$lib/api/api.config';
	import type { SentimentAnalysis, SentimentError, SentimentResponse } from '$lib/interfaces';
	import appUtils from '$lib/utils/app.utils';
	import AsyncButton from './asyncButton.svelte';

	interface Props {
		onResult: (data: SentimentAnalysis) => void;
	}
	let { onResult }: Props = $props();

	let text = $state<string>();
	let error = $state<string>();
	let isLoading = $state<boolean>(false);

	const submit = async () => {
		if (!text) return;
		isLoading = true;
		const response = await apiConfig.submitSentiment(text);

		if ((response as SentimentError).error) {
			error = (response as SentimentError).error;
		} else {
			const sentimentAnalysis = appUtils.getSentimentAnalysis(response as SentimentResponse);
			onResult(sentimentAnalysis);
		}

		isLoading = false;
	};
</script>

<div class="border-wrapper">
	<div class="container">
		<img src={`${base}/svg/analysis.svg`} alt="analysis" class="svg-icon" />
		<input
			type="text"
			placeholder="Wprowadź tekst, sprawdź emocje"
			bind:value={text}
			onkeydown={(e) => e.key === 'Enter' && submit()}
		/>
		<AsyncButton {isLoading} class="async-button" onclick={submit}>Analizuj</AsyncButton>
	</div>
</div>

<style lang="scss">
	.border-wrapper {
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
		background: linear-gradient(to right, rgb(229, 134, 19), rgb(30, 181, 158));
		/* filter: brightness(0.9); */
	}
</style>
