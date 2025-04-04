<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		isLoading: boolean;
	}
	let { isLoading, children, ...restProps }: Props = $props();
</script>

<button data-testid="asyncButton" {...restProps}>
	{#if isLoading}
		<div class="loader-spinner"></div>
	{:else}
		{@render children?.()}
	{/if}
</button>

<style lang="scss">
	.loader-spinner {
		margin: auto;
		width: 25px;
		padding: 4px;
		aspect-ratio: 1;
		border-radius: 50%;
		background: #fff;
		--_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
		-webkit-mask: var(--_m);
		mask: var(--_m);
		-webkit-mask-composite: source-out;
		mask-composite: subtract;
		animation: l3 1s infinite linear;

		@keyframes l3 {
			to {
				transform: rotate(1turn);
			}
		}
	}
</style>
