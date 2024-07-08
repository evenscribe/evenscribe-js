import { Log } from "./log";
import { GetSeverityNumber, GetSeverityString, Severity } from "./severity";

export class LogBuilder {
	private traceID: string;
	private spanID: string;
	private traceFlags: number;
	private severityText: string;
	private severityNumber: number;
	private serviceName: string;
	private body: string;
	private resourceAttributes: Record<string, string>;
	private logAttributes: Record<string, string>;

	withResourceAttributes(resourceAttributes: Record<string, string>): LogBuilder {
		this.resourceAttributes = resourceAttributes;
		return this;
	}

	withLogAttributes(logAttributes: Record<string, string>): LogBuilder {
		this.logAttributes = logAttributes;
		return this;
	}

	withTraceId(traceId: string): LogBuilder {
		this.traceID = traceId;
		return this;
	}

	withSpanId(spanId: string): LogBuilder {
		this.spanID = spanId;
		return this;
	}

	withTraceFlags(traceFlags: number): LogBuilder {
		this.traceFlags = traceFlags;
		return this;
	}

	withSeverity(severity: Severity): LogBuilder {
		this.severityText = GetSeverityString(severity);
		this.severityNumber = GetSeverityNumber(severity);
		return this;
	}

	withServiceName(serviceName: string): LogBuilder {
		this.serviceName = serviceName;
		return this;
	}

	withBody(body: string): LogBuilder {
		this.body = body;
		return this;
	}

	withResourceAttribute(attrs: Record<string, string>): LogBuilder {
		this.resourceAttributes = attrs;
		return this;
	}

	withLogAttribute(attrs: Record<string, string>): LogBuilder {
		this.logAttributes = attrs;
		return this;
	}

	withArgs(args: any[]): LogBuilder {
		if (args.length % 2 !== 0) {
			return this;
		}
		for (let i = 0; i < args.length; i += 2) {
			const key = args[i];
			if (typeof key !== "string") {
				continue;
			}
			switch (key) {
				case "traceID":
					if (typeof args[i + 1] !== "string") continue;
					this.traceID = args[i + 1];
					break;
				case "spanID":
					if (typeof args[i + 1] !== "string") continue;
					this.spanID = args[i + 1];
					break;
				case "traceFlags":
					if (typeof args[i + 1] !== "number") continue;
					this.traceFlags = args[i + 1];
					break;
				case "logAttributes":
					if (typeof args[i + 1] !== "object" && "key" in args) continue;
					this.logAttributes = args[i + 1];
					break;
				default:
					continue;
			}

		}


		return this;
	}

	fillMissingFields() {
		if (!this.traceID) this.traceID = "";
		if (!this.spanID) this.spanID = "";
		if (!this.traceFlags) this.traceFlags = 0;
		if (!this.logAttributes) this.logAttributes = {};
	}


	build(): Log {
		this.fillMissingFields();
		return {
			Timestamp: Date.now() / 1000 | 0,
			TraceId: this.traceID,
			SpanId: this.spanID,
			TraceFlags: this.traceFlags,
			SeverityText: this.severityText,
			SeverityNumber: this.severityNumber,
			ServiceName: this.serviceName,
			Body: this.body,
			ResourceAttributes: this.resourceAttributes,
			LogAttributes: this.logAttributes,
		}
	}

}


