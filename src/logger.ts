import * as xhook from 'xhrhook';

class Logger {
  private static instance: Logger;

  private logs: any = [];
  private exceptions: any = [];
  private console: any = [];
  private requests: any = [];
  private apikey: string;
  private config: any;
  private runCode: any;
  private errors: any = [];

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  constructor() {
    this.initRequestSniffer();
    this.initErrorListener();
  }


  public setApikey(apikey: string) {
    this.apikey = apikey;
  }

  public setConfig(cfg: any) {
    this.config = cfg;
  }
  
  public setRuncode(runCode: string) {
    this.runCode = runCode;
  }

  public addLog(message: string, extra?: any) {
    this.logs.push({ time: Date.now(), message, extra });
  }

  public addException(e: Error) {
    this.exceptions.push({
      time: Date.now(),
      msg: e.message,
      // @ts-ignore
      details: e.details,
      stack: e.stack
    })
  }

  public download() {
    const a = document.createElement('a');
    a.href = this.getDownloadLink();
    a.download = `debug-log-for-${this.apikey}.json`;
    a.click();
  }

  public getDownloadLink() {
    const data = {
      apikey: this.apikey,
      config: this.config,
      logs: this.logs,
      exceptions: this.exceptions,
      requests: this.requests,
      console: this.console,
      runCode: this.runCode,
      timings: window.performance.getEntriesByType('resource')
    };

    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    return URL.createObjectURL(file);
  }

  private initErrorListener() {
    window.addEventListener('error', (...data) => this.errors.push(data));
  }

  private initRequestSniffer() {
    xhook.after((request: any, response: any) => {
      this.requests.push({
        time: Date.now(),
        data: JSON.parse(JSON.stringify({ request, response })),
      });
    });
  }
}

export const LoggerInstance = Logger.getInstance();
