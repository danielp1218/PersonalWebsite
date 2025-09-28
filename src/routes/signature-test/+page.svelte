<script lang="ts">
	import SignatureAnimation from '$lib/components/signatureAnimation.svelte';
	
	let signatureRef: SignatureAnimation;
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-8">
	<h1 class="text-4xl font-bold mb-8 text-primary">Signature Animation Test</h1>
	
	<div class="bg-background border-2 border-primary rounded-lg p-8 shadow-lg">
		<SignatureAnimation bind:this={signatureRef} />
	</div>
	
	<button 
		class="mt-8 px-6 py-3 bg-primary text-background rounded-lg hover:opacity-80 transition-opacity"
		onclick={() => signatureRef?.restart()}
	>
		Restart Animation
	</button>
</div>
