<script lang="ts">
	interface Props<T extends { [key: string]: any }> {
		data: T[];
		width?: number;
		height?: number;
		xKey?: keyof T;
		yKey?: keyof T;
		children?: (args: {
			data: T[];
			width: number;
			height: number;
			xKey?: keyof T;
			yKey?: keyof T;
		}) => any;
	}

	let { data, width = 600, height = 300, xKey, yKey, children } = $props() as Props<any>;
</script>

<svg {width} {height}>
	{@render children?.({ data, width, height, xKey, yKey })}
</svg>
