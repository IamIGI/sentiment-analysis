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

	let text = $state<string>('');
	let error = $state<string>('');
	let isLoading = $state<boolean>(false);
	let textAreaRef = $state<HTMLTextAreaElement>();

	const submit = async () => {
		if (!text) return;
		isLoading = true;
		const response = await apiConfig.submitSentiment(text);

		if ((response as SentimentError).error) {
			//error
			error = (response as SentimentError).error;
		} else {
			//success
			text = '';
			const sentimentAnalysis = appUtils.getSentimentAnalysis(response as SentimentResponse);
			onResult(sentimentAnalysis);
		}
		isLoading = false;
	};

	const adjustHeight = () => {
		if (!textAreaRef) return;
		textAreaRef.style.height = 'auto'; // Reset height to auto to allow for re-calculation
		textAreaRef.style.height = `${textAreaRef.scrollHeight}px`; // Set the height based on scrollHeight
	};

	const trimExtraCharacters = () => {
		if (text.length > 500) {
			text = text.slice(0, 500); // Trim extra characters
		}
	};
	const removeErrorMsg = () => {
		if (error.length > 0) error = '';
	};
</script>

<div class="wrapper">
	<div class="gradient-border">
		<div class="container">
			<img src={`${base}/svg/analysis.svg`} alt="analysis" class="svg-icon" />

			<div class="textarea-wrapper">
				<textarea
					placeholder="Wprowadź tekst, sprawdź emocje"
					bind:this={textAreaRef}
					bind:value={text}
					oninput={() => {
						removeErrorMsg();
						trimExtraCharacters();
						adjustHeight();
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter') {
							if (e.shiftKey) return;
							// Enter alone = Submit
							e.preventDefault();
							submit();
						}
					}}
				>
				</textarea>
				<span class="char-counter" class:char-limit={text.length === 500}>{text.length} / 500</span>
			</div>

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

	.textarea-wrapper {
		/* outline: 1px solid blue; */
		position: relative;
		width: 100%;
	}

	textarea {
		width: 100%;
		/* outline: 1px solid red; */
		height: auto;
		flex: 1;
		background: transparent;
		border: none;
		color: #ccc;
		font-size: var(--font-size-p);

		padding: 16px 5px;
		resize: none;
	}

	.char-counter {
		position: absolute;
		bottom: 5px;
		right: 10px;
		font-size: 12px;
		color: #aaa;
		padding: 2px 6px;
		border-radius: 5px;
	}

	.char-limit {
		color: var(--main-alert-color);
		text-decoration: underline;
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
</style>
