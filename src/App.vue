<template>
	<div class="app">
		<TOOButton @onClick="() => console.log('Button Clicked')">
			<template #label> label </template>
		</TOOButton>

		<TOOButton label="test" @onClick="() => console.log('Button Clicked')" />

		<TOOButton
			:disabled="true"
			label="disabled"
			@onClick="() => console.log('Button Clicked')"
		/>
	</div>
</template>

<script setup>
import TOOButton from "@/components/button.vue";
</script>
