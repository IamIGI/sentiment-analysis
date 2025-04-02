<script lang="ts">
	import TextAnalysis from '$lib/components/textAnalysis.svelte';
</script>

<div class="wrapper">
	<div class="container">
		<h1>Sprawdź sentyment swojego tekstu online</h1>
		<h2>Analizuj emocje wprowadzonych zdań</h2>
		<TextAnalysis />
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
		gap: 2rem;
	}
</style>
