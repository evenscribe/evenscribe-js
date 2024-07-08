import net from "node:net";
import { Options } from "./options";
import { exit } from "node:process";
import { GetSeverityNumber, Severity } from "./severity";
import { LogBuilder } from "./log-builder";
import { Log } from "./log";



export class Logger {
	static instance: Logger | null = null;

	private conn: net.Socket
	options: Options

	static initLoggerWithOptions(options: Options) {
		Logger.setInstance(new Logger(options))
	}

	static initLoggerWithDefaultOpts() {
		Logger.setInstance(new Logger(new Options().withDefaults()))
	}

	private constructor(options: Options) {
		this.options = options;
		this.conn = net.createConnection({ path: this.options.socketAddr });
		this.conn.on("connect", () => {
			console.log("[info] connected to evenscribe collector");
		})
		this.conn.on("error", (err) => {
			console.error("[error] ", err);
			exit(1);
		})
	}


	close() {
		this.conn.destroy()
	}

	static destroy() {
		Logger.getInstance().close();
		Logger.setInstance(null);
	}


	private write(msg: string, severity: Severity) {
		const log = new LogBuilder().
			withSeverity(severity).
			withServiceName(this.options.serviceName).
			withBody(msg).
			withResourceAttributes(this.options.resourceAttributes).
			withLogAttributes({}).
			withTraceId("").
			withSpanId("").
			withTraceFlags(0).
			build();
		this.writeToSocket(log);
		if (this.options.devMode) {
			this.writeToStdout(log.Timestamp, log.SeverityText, log.SeverityNumber, log.Body)
		}
	}

	private writeS(msg: string, severity: Severity, args: any[]) {
		const log = new LogBuilder().
			withSeverity(severity).
			withServiceName(this.options.serviceName).
			withBody(msg).
			withResourceAttributes(this.options.resourceAttributes).
			withArgs(args).
			build();
		this.writeToSocket(log);
		if (this.options.devMode) {
			this.writeToStdout(log.Timestamp, log.SeverityText, log.SeverityNumber, log.Body)
		}
	}

	private getHumanTime(timestamp: number): string {
		return new Date(timestamp).toLocaleString()
	}

	private writeToStdout(timestamp: number, severityText: string, severityNumber: number, body: string) {
		if (severityNumber >= GetSeverityNumber(Severity.WARN)) {
			console.error(`[${severityText}] | ${this.getHumanTime(timestamp)} | ${body}`)
		} else {
			console.log(`[${severityText}] | ${this.getHumanTime(timestamp)} | ${body}`)
		}
	}

	private async writeToSocket(log: Log) {
		const bufferSize = 1000;
		const buffer = Buffer.alloc(bufferSize, " ", "utf-8");

		// Copy the message into the buffer
		buffer.write(JSON.stringify(log), 0, 'utf-8');
		this.conn.write(buffer)
	}

	static setInstance(logger: Logger | null) {
		Logger.instance = logger;
	}

	static getInstance() {
		if (!Logger.instance) {
			throw new Error("evenscribe logger not initialized")
		}
		return Logger.instance;
	}

	static info(msg: string) {
		Logger.getInstance().write(msg, Severity.INFO)
	}

	static debug(msg: string) {
		Logger.getInstance().write(msg, Severity.DEBUG)
	}

	static trace(msg: string) {
		Logger.getInstance().write(msg, Severity.TRACE)
	}

	static warn(msg: string) {
		Logger.getInstance().write(msg, Severity.WARN)
	}

	static error(msg: string) {
		Logger.getInstance().write(msg, Severity.ERROR)
	}

	static fatal(msg: string) {
		Logger.getInstance().write(msg, Severity.FATAL)
	}

	static infoS(msg: string, ...args: any[]) {
		Logger.getInstance().writeS(msg, Severity.INFO, args)
	}

	static debugS(msg: string, ...args: any[]) {
		Logger.getInstance().writeS(msg, Severity.DEBUG, args)
	}

	static traceS(msg: string, ...args: any[]) {
		Logger.getInstance().writeS(msg, Severity.TRACE, args)
	}

	static warnS(msg: string, ...args: any[]) {
		Logger.getInstance().writeS(msg, Severity.WARN, args)
	}

	static errorS(msg: string, ...args: any[]) {
		Logger.getInstance().writeS(msg, Severity.ERROR, args)
	}

	static fatalS(msg: string, ...args: any[]) {
		Logger.getInstance().writeS(msg, Severity.FATAL, args)
	}
}

