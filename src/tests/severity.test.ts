import { GetSeverityNumber, GetSeverityString, Severity } from "../severity";
import { expect, test } from "vitest";

test("Severity enum to string", () => {
	expect(GetSeverityString(Severity.TRACE)).toBe("TRACE");
})

test("Severity enum to number", () => {
	expect(GetSeverityNumber(Severity.TRACE)).toBe(1);
	expect(GetSeverityNumber(Severity.DEBUG)).toBe(5);
	expect(GetSeverityNumber(Severity.INFO)).toBe(9);
	expect(GetSeverityNumber(Severity.WARN)).toBe(13);
	expect(GetSeverityNumber(Severity.ERROR)).toBe(17);
	expect(GetSeverityNumber(Severity.FATAL)).toBe(21);
})
