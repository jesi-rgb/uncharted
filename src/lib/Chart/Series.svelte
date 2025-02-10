<script lang="ts">
	interface Props<T extends { [key: string]: any }> {
		data: T[];
		xKey: keyof T;
		yKey: keyof T;
		xScale: any;
		yScale: any;
		children?: (args: { xScale: any; yScale: any; data: T[]; xKey: keyof T; yKey: keyof T }) => any;
	}

	let { xScale, yScale, data, xKey, yKey, children } = $props() as Props<any>;
</script>

{@render children?.({ xScale, yScale, data, xKey, yKey })}
