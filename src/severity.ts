export enum Severity {
	TRACE = "TRACE",
	DEBUG = "DEBUG",
	INFO = "INFO",
	WARN = "WARN",
	ERROR = "ERROR",
	FATAL = "FATAL"
}

export function GetSeverityString(severity: Severity): string {
	return severity as string;
}

export function GetSeverityNumber(severity: Severity): number {
	switch (severity) {
		case Severity.TRACE:
			return 1;
		case Severity.DEBUG:
			return 5;
		case Severity.INFO:
			return 9;
		case Severity.WARN:
			return 13;
		case Severity.ERROR:
			return 17;
		case Severity.FATAL:
			return 21;
	}
}

