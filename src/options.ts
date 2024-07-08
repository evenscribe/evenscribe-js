export class Options {
	retry: number;
	maxExectionTime: number
	socketAddr: string;
	serviceName: string;
	resourceAttributes: Record<string, string>;
	devMode: boolean;


	withDefaults() {
		this.retry = 3;
		this.maxExectionTime = 1000;
		this.socketAddr = "/tmp/olympus_socket.sock";
		this.serviceName = "default";
		this.resourceAttributes = {};
		this.devMode = true;
		return this;
	}

	withRetry(retry: number) {
		this.retry = retry;
		return this;
	}

	withMaxExecutionTime(maxExecutionTime: number) {
		this.maxExectionTime = maxExecutionTime;
		return this;
	}

	withSocketAddr(socketAddr: string) {
		this.socketAddr = socketAddr;
		return this;
	}

	withServiceName(serviceName: string) {
		this.serviceName = serviceName;
		return this;
	}

	withResourceAttributes(resourceAttributes: Record<string, string>) {
		this.resourceAttributes = resourceAttributes;
		return this;
	}

	withDevMode(devMode: boolean) {
		this.devMode = devMode;
		return this;
	}
}
