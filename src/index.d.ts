declare module "@juspay-tech/hyper-js" {
  // Event-related interfaces
  interface EventData {
    iframeMounted: boolean;
    focusTriggered: boolean;
    blurTriggered: boolean;
    clickTriggered: boolean;
    elementType: string;
    classChange: boolean;
    newClassType: string;
  }

  interface Event {
    key: string;
    data: EventData;
  }

  type EventParam =
    | { type: "Event"; value: Event }
    | { type: "EventData"; value: EventData }
    | { type: "Empty" };

  type EventHandler = (param: EventParam) => void;

  // Payment Element interfaces
  interface PaymentElement {
    on(eventName: string, handler: (param: EventParam) => void): void;
    collapse(): void;
    blur(): void;
    update(options: ElementsUpdateOptions): void;
    destroy(): void;
    unmount(): void;
    mount(domElement: string): void;
    focus(): void;
    clear(): void;
  }

  interface Element {
    getElement(componentName: string): PaymentElement | null;
    update(options: object): void;
    fetchUpdates(): Promise<object>;
    create(componentType: string, options: object): PaymentElement;
  }

  // Main Hyper interfaces
  /**
   * Type for the nested 'confirmParams' object within the payload,
   * reflecting only the 'return_url' field that is explicitly used.
   */
  interface usedConfirmParamsFromPayload {
    return_url?: string | null | undefined;
  }

  /**
   * Type for the main 'payload' object passed to confirmPaymentWrapper,
   * reflecting only the 'confirmParams' (for its 'return_url') and 'redirect' fields.
   */
  interface confirmPaymentInputPayload {
    confirmParams?: usedConfirmParamsFromPayload | null | undefined;
    redirect?: string | null | undefined; // Expected values like "if_required" or "always"
  }

  interface HyperInstance {
    confirmPayment(params: confirmPaymentInputPayload): Promise<object>;
    elements(options: ElementsOptions): Element;
    confirmCardPayment(
      clientSecret: string,
      data?: object,
      options?: object
    ): Promise<object>;
    retrievePaymentIntent(paymentIntentId: string): Promise<object>;
    widgets(options: ElementsOptions): Element;
    paymentRequest(options: object): object;
  }

  interface LoadOptions {
    customBackendUrl?: string;
    env?: "SANDBOX" | "PROD";
    [key: string]: any;
  }

  type HyperObject =
    | string
    | {
        publishableKey: string;
        profileId: string;
      };

  interface AnalyticsData {
    sessionID: string;
    timeStamp: string;
  }

  /**
   * Represents the possible values for the labels
   */
  type AppearanceLabels = "Above" | "Floating" | "Never" | string;

  /**
   * Represents the possible values for the theme
   */
  type AppearanceTheme =
    | "default"
    | "midnight"
    | "brutal"
    | "charcoal"
    | "soft"
    | "bubblegum"
    | "none"
    | string; // Allows for other string-based theme names

  /**
   * Represents the structure of the 'variables' object, based on src/DefaultTheme.res
   */
  interface AppearanceVariables {
    /**
     * The font family
     */
    fontFamily?: string | null;
    /**
     * The base font size
     */
    fontSizeBase?: string | null;
    /**
     * The primary color
     */
    colorPrimary?: string | null;
    /**
     * The background color
     */
    colorBackground?: string | null;
    /**
     * The text color
     */
    colorText?: string | null;
    /**
     * The danger color
     */
    colorDanger?: string | null;
    /**
     * The danger text color
     */
    colorDangerText?: string | null; // Added from CardThemeType.res
    /**
     * The border radius
     */
    borderRadius?: string | null;
    /**
     * The font variant ligatures
     */
    fontVariantLigatures?: string | null;
    /**
     * The font variation settings
     */
    fontVariationSettings?: string | null;
    /**
     * The spacing unit
     */
    spacingUnit?: string | null;
    /**
     * The font weight light
     */
    fontWeightLight?: string | null;
    /**
     * The font weight normal
     */
    fontWeightNormal?: string | null;
    /**
     * The font weight medium
     */
    fontWeightMedium?: string | null;
    /**
     * The font weight bold
     */
    fontWeightBold?: string | null;
    /**
     * The font line height
     */
    fontLineHeight?: string | null;
    /**
     * The font size 2Xl
     */
    fontSize2Xl?: string | null;
    /**
     * The font size Xl
     */
    fontSizeXl?: string | null;
    /**
     * The font size Lg
     */
    fontSizeLg?: string | null;
    /**
     * The font size Sm
     */
    fontSizeSm?: string | null;
    /**
     * The font size Xs
     */
    fontSizeXs?: string | null;
    /**
     * The font size 2Xs
     */
    fontSize2Xs?: string | null;
    /**
     * The font size 3Xs
     */
    fontSize3Xs?: string | null;
    /**
     * The success color
     */
    colorSuccess?: string | null;
    /**
     * The warning color
     */
    colorWarning?: string | null;
    /**
     * The primary text color
     */
    colorPrimaryText?: string | null;
    /**
     * The background text color
     */
    colorBackgroundText?: string | null;
    /**
     * The success text color
     */
    colorSuccessText?: string | null;
    /**
     * The warning text color
     */
    colorWarningText?: string | null;
    /**
     * The secondary text color
     */
    colorTextSecondary?: string | null;
    /**
     * The text placeholder color
     */
    colorTextPlaceholder?: string | null;
    /**
     * The spacing tab
     */
    spacingTab?: string | null;
    /**
     * The border color
     */
    borderColor?: string | null;
    /**
     * The spacing accordion item
     */
    spacingAccordionItem?: string | null;
    /**
     * The color icon card Cvc
     */
    colorIconCardCvc?: string | null;
    /**
     * The color icon card Cvc error
     */
    colorIconCardCvcError?: string | null;
    /**
     * The color icon card error
     */
    colorIconCardError?: string | null;
    /**
     * The spacing grid column
     */
    spacingGridColumn?: string | null;
    /**
     * The spacing grid row
     */
    spacingGridRow?: string | null;
    /**
     * The button background color
     */
    buttonBackgroundColor?: string | null;
    /**
     * The button height
     */
    buttonHeight?: string | null;
    /**
     * The button width
     */
    buttonWidth?: string | null;
    /**
     * The button border radius
     */
    buttonBorderRadius?: string | null;
    /**
     * The button border color
     */
    buttonBorderColor?: string | null;
    /**
     * The button text color
     */
    buttonTextColor?: string | null;
    /**
     * The button text font size
     */
    buttonTextFontSize?: string | null;
    /**
     * The button text font weight
     */
    buttonTextFontWeight?: string | null;
    /**
     * The button border width
     */
    buttonBorderWidth?: string | null;
    /**
     * The disabled field color
     */
    disabledFieldColor?: string | null;
    // This record is not defined as exact, allowing for other custom string variables.
    [key: string]: string | null | undefined;
  }

  /**
   * Value of a single CSS rule (e.g., {"border": "1px solid #ccc"})
   */
  interface AppearanceRuleValue {
    [key: string]: string;
  }

  /**
   * The 'rules' object (e.g., {".Input": {"borderColor": "#000"})
   */
  interface AppearanceRules {
    [key: string]: AppearanceRuleValue;
  }

  /**
   * src/Types/CardThemeType.res defines 'innerLayout' as: Spaced | Compressed
   */
  type AppearanceInnerLayout = "Spaced" | "Compressed" | string; // For flexibility

  /**
   * The complete type for the 'appearance' object within elementsOptions
   */
  interface ElementsAppearanceOptions {
    /**
     * The theme
     */
    theme?: AppearanceTheme | null;
    /**
     * The variables
     */
    variables?: AppearanceVariables | null;
    /**
     * The rules
     */
    rules?: AppearanceRules | null;
    /**
     * The labels
     */
    labels?: AppearanceLabels | null; // Added based on CardThemeType.res
    /**
     * The inner layout
     */
    innerLayout?: AppearanceInnerLayout | null;
  }

  /**
   * Based on src/Types/CardThemeType.res 'fonts' type
   */
  interface ElementsFontOptions {
    /**
     * The CSS source
     */
    cssSrc: string;
    /**
     * The font family
     */
    family: string;
    /**
     * The source
     */
    src: string;
    /**
     * The font weight
     */
    weight: string;
  }

  /**
   * src/Types/CardThemeType.res defines 'showLoader' as: Auto | Always | Never
   * This corresponds to the 'loader' field in elementsOptions.
   */
  type ElementsLoaderOption = "auto" | "always" | "never" | string; // For flexibility if other string values are used

  /**
   * The final, consolidated type for the 'elementsOptions' JSON object
   */
  interface ElementsOptions {
    /**
     * The client secret
     */
    clientSecret: string; // Required
    /**
     * The payment id
     */
    paymentId?: string | null; // Optional
    /**
     * The appearance
     */
    appearance?: ElementsAppearanceOptions | null; // Optional
    /**
     * The fonts
     */
    fonts?: ElementsFontOptions[] | null; // Optional array of font objects
    /**
     * The locale
     */
    locale?: string | null; // Optional (e.g., "en", "auto")
    /**
     * The loader
     */
    loader?: ElementsLoaderOption | null; // Optional
    /**
     * The block confirm
     */
    blockConfirm?: boolean | null; // Optional, likely internal
    /**
     * The custom pod Uri
     */
    customPodUri?: string | null; // Optional, likely internal
    // displaySavedPaymentMethods?: boolean | null; // Optional, inferred from Elements.res logic
  }

  /**
   * Type for the 'newOptions' parameter of the 'update' function
   */
  interface ElementsUpdateOptions {
    clientSecret?: string | null;
    appearance?: ElementsAppearanceOptions | null;
    locale?: string | null;
  }

  // Main exported functions
  /**
   * Initializes the Hyper SDK with the given publishable key and options.
   *
   * @param hyperObject - Either a string publishable key or an object containing hyperObject and profileId
   * @param options - Configuration options including customBackendUrl and env settings
   * @returns A Promise that resolves to a HyperInstance object
   *
   * @example
   * Using string publishable key
   * const hyperPromise = loadHyper("YOUR_PUBLISHABLE_KEY", {
   *   customBackendUrl: "YOUR_BACKEND_URL",
   *   env: "SANDBOX"
   * });
   *
   * Using object with publishable key
   * const hyperPromise = loadHyper({
   *   publishableKey: "YOUR_PUBLISHABLE_KEY",
   *   profileId: "YOUR_PROFILE_ID"
   * }, {
   *   customBackendUrl: "YOUR_BACKEND_URL",
   *   env: "PROD"
   * });
   */
  function loadHyper(
    hyperObject: HyperObject,
    options?: LoadOptions
  ): Promise<HyperInstance>;

  /**
   * @deprecated Use loadHyper instead
   */
  function loadStripe(
    hyperObject: string | HyperObject,
    options?: LoadOptions
  ): Promise<HyperInstance>;
}
