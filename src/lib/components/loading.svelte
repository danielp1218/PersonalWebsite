<script lang="ts">
	import { fade } from 'svelte/transition';
    import SignatureAnimation from './signatureAnimation.svelte';
</script>

<div
	transition:fade={{ duration: 1000 }}
	class="fixed top-0 left-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white"
>
	<div class="w-[30%]">
		<SignatureAnimation duration={0.2} />
	</div>
</div>
