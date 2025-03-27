<template>
	<div
		:class="['button-container', { disabled: disabled }]"
		ref="button"
		@click="emit('onClick')"
	>
		<slot name="label">
			{{ label }}
		</slot>
		<div class="effect"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";

const button = ref(null);

const props = defineProps({
	label: {
		type: String,
		default: "",
	},

	disabled: {
		type: Boolean,
		default: false,
	},

	router: {
		type: Object,
		default: () => {},
	},
});

const emit = defineEmits(["onClick"]);

onMounted(() => {
	button.value.addEventListener("mousemove", (e) => {
		const rect = button.value.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const coords = `will-change: top, left; top: ${y}px; left: ${x}px;`;
		button.value.querySelector(".effect").style = coords;
	});
});

onUnmounted(() => {
	if (button.value) button.value.removeEventListener("mousemove", () => {});
});
</script>

<style>
.button-container {
	position: relative;
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	flex-basis: auto;
	width: auto;
	min-height: 2.125rem;
	padding: 3px 25px;
	color: #000;
	text-align: center;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 100%;
	transition:
		color 0.5s,
		border-color 0.5s,
		box-shadow 0.3s;
	overflow: hidden;
	border: 1px solid #000;
	box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
	border-radius: 25px;
}

.button-container + .button-container {
	margin-left: 15px;
}

.button-container:not(:disabled) .effect {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 30px;
	height: 30px;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	background: red;
	content: "";
	-webkit-filter: blur(25px);
	filter: blur(25px);
	opacity: 0;
	-webkit-transition: opacity 0.6s;
	-o-transition: opacity 0.6s;
	transition: opacity 0.6s;
	will-change: top, left;
	border-radius: 50%;
}

.button-container:hover:not(:disabled):not(.disabled) .effect {
	opacity: 1;
}

.button-container.disabled {
	border: 1px solid #ccc;
	color: #ccc;
}
</style>
