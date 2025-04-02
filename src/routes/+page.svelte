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
		padding-top: 27vh;
	}

	.container {
		border: none;
		background-color: var(--main-background-color);
		$backgroundColor: rgba(115, 112, 112, 0.95);
		$backgroundColor: rgba(241, 240, 240, 0.95);
		background-color: $backgroundColor;
		box-shadow: 0 0 7rem 9rem $backgroundColor;
		border-radius: 3rem;
		width: fit-content;
		margin: auto;
		padding: 4rem 3rem 3rem 3rem;
		/* outline: 1px solid red; */
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		color: black;

		h1 {
			font-family: 'Playfair Display', serif;
		}
	}
</style>
