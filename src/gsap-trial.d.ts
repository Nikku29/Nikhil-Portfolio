declare module "gsap-trial/SplitText" {
  export class SplitText {
    constructor(target: string | Element | NodeList | Array<Element | string>, vars?: any);
    chars: Element[];
    words: Element[];
    lines: Element[];
    revert(): void;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  export class ScrollSmoother {
    constructor(vars?: any);
    paused(value?: boolean): boolean;
    kill(): void;
    scrollTop(value?: number): number;
    scrollTo(target: any, smooth?: boolean, position?: string | number): void;
    static create(vars: any): ScrollSmoother;
    static refresh(force?: boolean): void;
  }
}
