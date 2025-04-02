<script lang="ts">
	let { children } = $props();
</script>

<div class="modal">
	<!-- remove box shadow when background color is transparent -->
	<div class="modal-content">
		{@render children()}
	</div>
</div>

<style>
	.modal {
		user-select: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 36vh;
		z-index: 1000;
	}

	.modal-content {
		position: relative;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
		border-radius: 10px;
	}
</style>
