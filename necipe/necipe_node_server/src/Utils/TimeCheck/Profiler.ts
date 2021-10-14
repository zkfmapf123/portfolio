class Profiler{
  private lastTime: [number, number];
  
  constructor() {
    this.lastTime = null;
  };

  public start(): void{
    this.lastTime = process.hrtime();
  };

  public end(label: string): void{
    const diff = process.hrtime(this.lastTime);

    console.log(`${label} : ${diff[0]} ~ ${diff[1]}`);
  };
};

export default (env : "development" | "production") => {
  if (env === "development") {
    return new Profiler();
  } else {
    return {
      start: () => { },
      end: (label: string) => { }
    }
  }
};

