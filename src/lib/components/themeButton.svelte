<script lang="ts">
    let { ...rest } = $props();
</script>

<button
	{...rest}
	class="bg-primary relative flex aspect-square
           items-center justify-center overflow-hidden rounded-full p-4 transition-all
           duration-300 hover:scale-125 hover:shadow-lg"
>
</button>
