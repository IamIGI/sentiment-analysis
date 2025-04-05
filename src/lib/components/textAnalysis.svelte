<script lang="ts">
	import { base } from '$app/paths';
	import type { SentimentAnalysisResult, SentimentError, SentimentResponse } from '$lib/interfaces';
	import appUtils from '$lib/utils/app.utils';
	import apiConfig from '../api/api.config';
	import AsyncButton from './ui/asyncButton.svelte';
	import CustomTextarea from './ui/customTextarea.svelte';

	interface Props {
		onResult: (data: SentimentAnalysisResult) => void;
	}
	let { onResult }: Props = $props();

	let text = $state<string>('');
	let error = $state<string>('');
	let isLoading = $state<boolean>(false);

	const submit = async () => {
		if (!text) return;
		//loading
		isLoading = true;
		const response = await apiConfig.submitSentiment(text);

		if ((response as SentimentError).error) {
			//error
			error = (response as SentimentError).error;
		} else {
			//success
			text = '';
			const SentimentAnalysisResult = appUtils.getSentimentAnalysis(response as SentimentResponse);
			onResult(SentimentAnalysisResult);
		}
		isLoading = false;
	};

	const onTextUpdate = (updatedText: string) => {
		if (error.length > 0) error = '';
		text = updatedText;
	};
</script>

<div data-testid="textAnalysis" class="wrapper">
	<div class="gradient-border">
		<div class="container">
			<img src={`${base}/svg/analysis.svg`} alt="analysis" class="svg-icon" />
			<CustomTextarea {text} onTextChange={onTextUpdate} onSubmit={submit} />
			<AsyncButton
				{isLoading}
				class="async-button"
				onclick={submit}
				disabled={text.length === 0 || text.length > 500}>Analizuj</AsyncButton
			>
		</div>
	</div>
	{#if error.length > 0}
		<p class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		/* outline: 1px solid red; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	.gradient-border {
		$borderRadius: 15px;
		background: linear-gradient(to right, white, rgba(32, 32, 32));
		border-radius: $borderRadius;
		max-width: 800px;
		min-width: 325px;
		width: 80%;

		.container {
			/* outline: 1px solid red; */
			width: 100%;
			height: 100%;
			min-height: 70px;
			display: flex;
			align-items: flex-end;
			gap: 1rem;
			background: var(--main-input-color);
			border-radius: calc($borderRadius + 1px);
			padding: 6px 15px;
			color: #fff;
			background-clip: padding-box;
			border: solid 1px transparent;
		}
	}

	.svg-icon {
		margin-bottom: 20px;
		$size: 45px;
		height: $size;
		width: $size;
	}

	.error {
		color: var(--main-alert-color);
		padding: 10px 20px;
		border-radius: 10px;
		font-weight: 700;
	}

	:global(.async-button) {
		height: 42px;
		min-width: 100px;
		font-size: 17px;
		font-weight: 700;
		letter-spacing: 0.3px;
		padding: 0 15px;
		margin-bottom: 20px;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(to right, rgb(229, 134, 19), rgb(30, 181, 158));
	}

	@media (max-width: 700px) {
		.wrapper {
			.gradient-border {
				width: 100%;
			}
		}
	}

	@media (max-width: 600px) {
		.gradient-border {
			.container {
				flex-direction: column;
				align-items: center;
				gap: 0.2rem;
				min-height: 35vh;
			}
		}
		.svg-icon {
			display: none;
		}

		:global(.async-button) {
			width: 100%;
			margin-bottom: 5px;
		}
	}
</style>
