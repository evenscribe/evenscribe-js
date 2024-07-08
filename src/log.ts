export interface Log {
	Timestamp: number;
	TraceId: string;
	SpanId: string;
	TraceFlags: number;
	SeverityText: string;
	SeverityNumber: number;
	ServiceName: string;
	Body: string;
	ResourceAttributes: Record<string, string>;
	LogAttributes: Record<string, string>;
}
