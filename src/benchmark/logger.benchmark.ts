import { Logger } from "../logger";
import { Options } from "../options";
import { Bench } from "tinybench"

async function benchmarks() {
	const bench = new Bench();

	const options = new Options().withRetry(5).withServiceName("testing")
	Logger.initLoggerWithOptions(
		options.
			withSocketAddr("/tmp/olympus_socket.sock").
			withRetry(10).
			withServiceName("hello-evenscribe").
			withResourceAttributes({ "env": "testing" })
	);

	bench.add("logging one log at a time", () => {
		Logger.info("Hello World")
	})

	await bench.run();
	console.table(bench.table());
}

benchmarks().catch(e => console.error(e))
