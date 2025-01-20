declare module "@juspay-tech/hyper-js" {
  export interface EventData {
    iframeMounted: boolean;
    focusTriggered: boolean;
    blurTriggered: boolean;
    clickTriggered: boolean;
    elementType: string;
    classChange: boolean;
    newClassType: string;
  }

  export interface Event {
    key: string;
    data: EventData;
  }

  export type EventParam =
    | { type: "Event"; value: Event }
    | { type: "EventData"; value: EventData }
    | { type: "Empty" };
  export type EventHandler = (param: EventParam) => void;

  export interface PaymentElement {
    on(eventName: string, handler: (param: EventParam) => void): void;
    collapse(): void;
    blur(): void;
    update(options: object): void;
    destroy(): void;
    unmount(): void;
    mount(domElement: string): void;
    focus(): void;
    clear(): void;
  }

  export interface Element {
    getElement(componentName: string): PaymentElement | null;
    update(options: object): void;
    fetchUpdates(): Promise<object>;
    create(componentType: string, options: object): PaymentElement;
  }

  export interface ConfirmParams {
    return_url: string;
  }

  export interface ConfirmPaymentParams {
    elements: object;
    confirmParams: ConfirmParams | null;
  }

  export interface HyperInstance {
    confirmPayment(params: object): Promise<object>;
    elements(options: object): Element;
    confirmCardPayment(
      clientSecret: string,
      data?: object,
      options?: object
    ): Promise<object>;
    retrievePaymentIntent(paymentIntentId: string): Promise<object>;
    widgets(options: object): Element;
    paymentRequest(options: object): object;
  }

  export interface LoadOptions {
    env?: "SANDBOX" | "PROD";
    [key: string]: any;
  }

  /**
   * Initializes the Hyper SDK with the given publishable key and options.
   *
   * @param publishableKey - Your publishable API key
   * @param options - Optional configuration options
   * @returns A Promise that resolves to a HyperInstance object
   */
  export function loadHyper(
    publishableKey: string,
    options?: LoadOptions
  ): Promise<HyperInstance>;

  /**
   * @deprecated Use loadHyper instead
   */
  export function loadStripe(
    publishableKey: string,
    options?: LoadOptions
  ): Promise<HyperInstance>;

  export type EventType =
    | "Escape"
    | "Change"
    | "Click"
    | "Ready"
    | "Focus"
    | "Blur"
    | "None";
}
