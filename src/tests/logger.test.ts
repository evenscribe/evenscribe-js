import { Logger } from "../logger";
import { Options } from "../options";
import { expect, test } from "vitest";

test("logging without init", () => {
	try {
		Logger.info("Hello World")
	} catch (e) {
		expect(e.message).toBe("evenscribe logger not initialized")
	}

})

test("create a logger with default options with factory", () => {
	Logger.initLoggerWithDefaultOpts();
	expect(Logger.getInstance().options.retry).toBe(3);
	Logger.destroy();
})


test("create a logger with custom options with factory", () => {
	const options = new Options().withRetry(5).withServiceName("testing")
	Logger.initLoggerWithOptions(
		options.
			withSocketAddr("/tmp/olympus_socket.sock").
			withRetry(10).
			withServiceName("hello-evenscribe").
			withResourceAttributes({ "env": "testing" })
	);
	Logger.destroy();
})

test("basic logging", () => {
	const options = new Options().withRetry(5).withServiceName("testing")
	Logger.initLoggerWithOptions(
		options.
			withSocketAddr("/tmp/olympus_socket.sock").
			withRetry(10).
			withServiceName("hello-evenscribe").
			withResourceAttributes({ "env": "testing" })
	);
	Logger.info("Hello World")
})

test("structured logging", () => {
	const options = new Options().withRetry(5).withServiceName("testing")
	Logger.initLoggerWithOptions(
		options.
			withSocketAddr("/tmp/olympus_socket.sock").
			withRetry(10).
			withServiceName("hello-evenscribe").
			withResourceAttributes({ "env": "testing" })
	);
	Logger.infoS("Hello World", "traceID", "1", "traceFlags", 22, "logAttributes", { "userID": "12344" }, "spanID", "2")

})
