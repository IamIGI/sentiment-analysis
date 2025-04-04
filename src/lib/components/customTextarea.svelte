<script lang="ts">
	interface Props {
		onSubmit: () => void;
		onTextChange: (text: string) => void;
	}
	let { onSubmit, onTextChange }: Props = $props();

	let text = $state<string>('');
	let textAreaRef = $state<HTMLTextAreaElement>();

	const adjustHeight = () => {
		if (!textAreaRef) return;
		textAreaRef.style.height = 'auto';
		textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
	};

	const trimExtraCharacters = () => {
		if (text.length > 500) {
			text = text.slice(0, 500); // Trim extra characters
		}
	};

	const handleInput = () => {
		trimExtraCharacters();
		adjustHeight();
		onTextChange(text);
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			onSubmit();
		}
	};
</script>

<div class="textarea-wrapper">
	<textarea
		data-testid="customTextarea"
		placeholder="Wprowadź tekst, sprawdź emocje"
		bind:this={textAreaRef}
		bind:value={text}
		oninput={handleInput}
		onkeydown={handleKeyDown}
	>
	</textarea>
	<span class="char-counter" class:char-limit={text.length === 500}>{text.length} / 500</span>
</div>

<style lang="scss">
	.textarea-wrapper {
		position: relative;
		width: 100%;
	}

	textarea {
		width: 100%;
		height: auto;
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

	@media (max-width: 600px) {
		textarea {
			min-height: 25vh;
		}
	}
</style>
