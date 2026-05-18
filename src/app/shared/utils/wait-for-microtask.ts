export const waitForMicrotasks: () => Promise<unknown> = () => new Promise(resolve => setTimeout(resolve, 0));
