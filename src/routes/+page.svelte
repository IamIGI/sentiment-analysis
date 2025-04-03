<script lang="ts">
	import ResultModal from '$lib/components/resultModal.svelte';
	import TextAnalysis from '$lib/components/textAnalysis.svelte';
	import type { SentimentAnalysis } from '$lib/interfaces';
	import { mount, unmount } from 'svelte';

	const openResultModal = (data: SentimentAnalysis) => {
		const closeModal = () => unmount(m);

		const m = mount(ResultModal, {
			target: document.body,
			props: { result: data.resultCategory, score: data.score, onModalClose: closeModal }
		});
	};
</script>

<div class="wrapper">
	<div class="container">
		<h1>Sprawdź sentyment swojego tekstu online</h1>
		<h2>Analizuj emocje wprowadzonych zdań</h2>
		<TextAnalysis onResult={(data) => openResultModal(data)} />
		<!-- <button onclick={() => openResultModal(SENTIMENT_ANALYSIS_MOCK)}>modal</button> -->
	</div>
</div>

<style lang="scss">
	.wrapper {
		height: 100%;
		margin: auto;
		padding-top: 29vh;

		h1 {
			font-family: 'Playfair Display', serif;
		}
	}

	.container {
		/* outline: 1px solid red; */

		$backgroundColor: rgba(black, 0.7);
		$backgroundColor: rgba(rgb(12, 12, 12), 0.7);
		background-color: $backgroundColor;
		box-shadow: 0 0 7rem 8rem $backgroundColor;
		border-radius: 3rem;
		width: fit-content;
		margin: auto;
		padding: 4rem 3rem 3rem 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 2rem;
	}
</style>
