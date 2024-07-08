import { Options } from "../options";
import { expect, test } from "vitest";

test("Create a option with defaults", () => {
	const options = new Options().withDefaults();
	expect(options.retry).toBe(3);
})

test("Create a custom Retry", () => {
	const options = new Options().withRetry(5);
	expect(options.retry).toBe(5);
})
