<script lang="ts">
	import ResultModal from '$lib/components/modals/resultModal.svelte';
	import TextAnalysis from '$lib/components/textAnalysis.svelte';
	import type { SentimentAnalysisResult } from '$lib/interfaces';
	import { mount, unmount } from 'svelte';

	const openResultModal = (data: SentimentAnalysisResult) => {
		const closeModal = () => unmount(resultModal);

		const resultModal = mount(ResultModal, {
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
	</div>
</div>

<style lang="scss">
	.wrapper {
		/* outline: 1px solid red; */
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
		$backgroundColor: rgba(rgb(7, 7, 7), 0.7);
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
		@media (max-width: 700px) {
			padding: 4rem 1.4rem 3rem 1.4rem;
		}
	}

	@media (max-width: 600px) {
		.wrapper {
			padding-top: 1vh;
		}
		.container {
			padding: 1rem 1.4rem 3rem 1.4rem;
		}
	}
</style>
