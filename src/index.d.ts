declare module "@juspay-tech/hyper-js" {
  // Event-related interfaces
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

  // Payment Element interfaces
  export interface PaymentElement {
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

  export interface Element {
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
  export interface usedConfirmParamsFromPayload {
    /** The URL to redirect the customer to after the payment is complete. */
    return_url?: string | null | undefined;
  }

  /**
   * Type for the main 'payload' object passed to confirmPaymentWrapper,
   * reflecting only the 'confirmParams' (for its 'return_url') and 'redirect' fields.
   */
  export interface confirmPaymentInputPayload {
    /** Contains parameters related to the confirmation of the payment. */
    confirmParams?: usedConfirmParamsFromPayload | null | undefined;
    /** Specifies the redirect behavior for the payment. Expected values like "if_required" or "always". */
    redirect?: string | null | undefined;
  }

  /**
   * Represents the details of a customer.
   */
  export interface CustomerDetailsResponse {
    /** The unique identifier for the customer. */
    id: string | null;
    /** The name of the customer. */
    name: string | null;
    /** The email address of the customer. */
    email: string | null;
    /** The phone number of the customer. */
    phone: string | null;
    /** The phone country code of the customer. */
    phone_country_code: string | null;
  }

  /**
   * Represents the response data for wallet payments.
   */
  export interface WalletDataResponse {
    /** The issuer name of the wallet (e.g., "paypal", "gpay"). */
    issuer_name?: string | null;
    /** Allows for an empty object or other properties if the wallet data structure is not fully known or varies. */
    [key: string]: any;
  }

  /**
   * Represents the payment method data.
   */
  export interface PaymentMethodData {
    /** Wallet-specific payment data. Can be an empty object or a structured WalletDataResponse. */
    wallet?: WalletDataResponse | {};
    /** Billing details associated with the payment method. */
    billing?: BillingDetails | null;
    /** Allows for other payment method types as keys, e.g., card, bank_transfer. */
    [key: string]: any;
  }

  /**
   * Represents a payment address.
   */
  export interface PaymentAddress {
    /** City, district, suburb, town, or village. */
    city: string | null;
    /** Two-letter country code (ISO 3166-1 alpha-2). */
    country: string | null;
    /** Address line 1 (e.g., street, PO Box, or company name). */
    line1: string | null;
    /** Address line 2 (e.g., apartment, suite, unit, or building). */
    line2: string | null;
    /** Address line 3. */
    line3: string | null;
    /** ZIP or postal code. */
    zip: string | null;
    /** State, county, province, or region. */
    state: string | null;
    /** First name. */
    first_name: string | null;
    /** Last name. */
    last_name: string | null;
  }

  /**
   * Represents billing details for a payment.
   */
  export interface BillingDetails {
    /** The billing address. */
    address: PaymentAddress | null;
    /** The billing phone number. */
    phone: string | null;
    /** The billing email address. */
    email: string | null;
  }

  /**
   * Represents secrets for session token data, typically used in 3DS or similar authentication flows.
   */
  export interface SessionTokenDataSecrets {
    /** Information to display to the user. */
    display: string;
    /** Payment-related secret data. */
    payment: string;
  }

  /**
   * Represents session token data.
   */
  export interface SessionTokenData {
    /** Secrets associated with the session token. */
    secrets: SessionTokenDataSecrets;
  }

  /**
   * Represents the total amount for a payment request.
   */
  export interface PaymentRequestDataTotal {
    /** A human-readable description of the total amount. */
    label: string;
    /** The type of the total amount, if applicable. */
    type: string | null;
    /** The total amount as a string. */
    amount: string;
  }

  /**
   * Represents data for a payment request, often used with payment providers like Apple Pay or Google Pay.
   */
  export interface PaymentRequestData {
    /** The two-letter country code (ISO 3166-1 alpha-2) for the payment request. */
    country_code: string;
    /** The three-letter ISO currency code. */
    currency_code: string;
    /** The total amount and label for the payment. */
    total: PaymentRequestDataTotal;
    /** The merchant's capabilities (e.g., "supports3DS"). */
    merchant_capabilities: string[];
    /** The payment networks supported by the merchant (e.g., "visa", "masterCard"). */
    supported_networks: string[];
    /** The merchant identifier, if applicable. */
    merchant_identifier: string | null;
  }

  /**
   * Represents the next SDK action to be performed.
   */
  export interface SdkNextAction {
    /** The type of the next SDK action (e.g., "sync"). */
    next_action: string;
  }

  /**
   * Represents a session token, often used in third-party SDK integrations.
   */
  export interface SessionToken {
    /** The name of the wallet provider (e.g., "apple_pay"). */
    wallet_name: string;
    /** Data associated with the session token. */
    session_token_data: SessionTokenData;
    /** Data for the payment request. */
    payment_request_data: PaymentRequestData;
    /** The connector used for this session. */
    connector: string;
    /** Indicates if the session token is delayed. */
    delayed_session_token: boolean;
    /** The next SDK action to be performed. */
    sdk_next_action: SdkNextAction;
    /** Connector-specific reference ID. */
    connector_reference_id: string | null;
    /** Public key for the connector SDK. */
    connector_sdk_public_key: string | null;
    /** Merchant ID for the connector. */
    connector_merchant_id: string | null;
  }

  /**
   * Represents the next action required for a payment.
   */
  export interface NextAction {
    /** The type of the next action (e.g., "third_party_sdk_session_token"). */
    type: string;
    /** The session token details if the next action involves a third-party SDK. */
    session_token: SessionToken;
  }

  /**
   * Represents browser information collected during a payment.
   */
  export interface BrowserInfo {
    /** The operating system type (e.g., "iOS", "Windows"). */
    os_type: string | null;
    /** The browser language (e.g., "en-US"). */
    language: string | null;
    /** The time zone offset from UTC in minutes. */
    time_zone: number | null;
    /** The IP address of the customer. */
    ip_address: string | null;
    /** The operating system version. */
    os_version: string | null;
    /** The user agent string of the browser. */
    user_agent: string | null;
    /** The color depth of the screen. */
    color_depth: number | null;
    /** The device model. */
    device_model: string | null;
    /** Indicates if Java is enabled in the browser. */
    java_enabled: boolean | null;
    /** The screen width in pixels. */
    screen_width: number | null;
    /** The accept header sent by the browser. */
    accept_header: string | null;
    /** The screen height in pixels. */
    screen_height: number | null;
    /** The accept language header sent by the browser. */
    accept_language: string | null;
    /** Indicates if JavaScript is enabled in the browser. */
    java_script_enabled: boolean | null;
  }

  /**
   * Represents the response of a payment confirmation.
   * This corresponds to the `PaymentsResponse` or `PaymentsIntentResponse` in the Rust backend.
   */
  export interface ConfirmPaymentResponse {
    /** The unique identifier for the payment. */
    payment_id: string;
    /** The unique identifier for the merchant. */
    merchant_id: string;
    /** The status of the payment (e.g., "requires_customer_action", "succeeded"). */
    status: string;
    /** The total amount of the payment. */
    amount: number;
    /** The net amount of the payment after deductions. */
    net_amount: number;
    /** The shipping cost associated with the payment. */
    shipping_cost: number | null;
    /** The amount that can be captured for this payment. */
    amount_capturable: number | null;
    /** The amount that has been received for this payment. */
    amount_received: number | null;
    /** The payment connector used (e.g., "trustpay"). */
    connector: string | null;
    /** The client secret for the payment session. */
    client_secret: string | null;
    /** The timestamp when the payment was created. */
    created: string | null;
    /** The currency of the payment (e.g., "AUD"). */
    currency: string;
    /** The unique identifier for the customer. */
    customer_id: string | null;
    /** Customer details associated with the payment. */
    customer: CustomerDetailsResponse | null;
    /** A description for the payment. */
    description: string | null;
    /** A list of refunds associated with this payment. */
    refunds: any[] | null;
    /** A list of disputes associated with this payment. */
    disputes: any[] | null;
    /** The unique identifier for the mandate, if applicable. */
    mandate_id: string | null;
    /** Data related to the mandate. */
    mandate_data: MandateData | null;
    /** Indicates how the payment method should be set up for future usage (e.g., "off_session"). */
    setup_future_usage: string | null;
    /** Indicates if the payment is an off-session payment. */
    off_session: boolean | null;
    /** The timestamp when the payment should be captured. */
    capture_on: string | null;
    /** The capture method for the payment (e.g., "automatic", "manual"). */
    capture_method: string | null;
    /** The payment method used (e.g., "wallet", "card"). */
    payment_method: string | null;
    /** Data specific to the payment method used. */
    payment_method_data: PaymentMethodData | null;
    /** A token representing the payment method. */
    payment_token: string | null;
    /** Shipping details for the payment. */
    shipping: PaymentAddress | null;
    /** Billing details for the payment. */
    billing: BillingDetails | null;
    /** Details of the order associated with the payment. */
    order_details: any[] | null;
    /** The email address of the customer. */
    email: string | null;
    /** The name of the customer. */
    name: string | null;
    /** The phone number of the customer. */
    phone: string | null;
    /** The URL to redirect the customer to after the payment. */
    return_url: string | null;
    /** The type of authentication used for the payment (e.g., "three_ds"). */
    authentication_type: string | null;
    /** The name to appear on the customer's statement. */
    statement_descriptor_name: string | null;
    /** An additional suffix for the statement descriptor. */
    statement_descriptor_suffix: string | null;
    /** The next action required for the payment. */
    next_action: NextAction | null;
    /** The reason for payment cancellation, if applicable. */
    cancellation_reason: string | null;
    /** The error code, if the payment failed. */
    error_code: string | null;
    /** The error message, if the payment failed. */
    error_message: string | null;
    /** A unified error code. */
    unified_code: string | null;
    /** A unified error message. */
    unified_message: string | null;
    /** The payment experience type. */
    payment_experience: string | null;
    /** The type of payment method used (e.g., "apple_pay"). */
    payment_method_type: string | null;
    /** The label for the payment connector. */
    connector_label: string | null;
    /** The business country of the merchant. */
    business_country: string | null;
    /** The business label of the merchant. */
    business_label: string | null;
    /** A sub-label for the business. */
    business_sub_label: string | null;
    /** A list of allowed payment method types. */
    allowed_payment_method_types: string[] | null;
    /** An ephemeral key for the payment session. */
    ephemeral_key: object | null;
    /** Indicates if manual retry is allowed for the payment. */
    manual_retry_allowed: boolean | null;
    /** The transaction ID from the connector. */
    connector_transaction_id: string | null;
    /** A message from the fraud management system. */
    frm_message: object | null;
    /** Metadata associated with the payment. */
    metadata: object | null;
    /** Metadata from the connector. */
    connector_metadata: object | null;
    /** Metadata related to specific features. */
    feature_metadata: object | null;
    /** A reference ID for the payment. */
    reference_id: string | null;
    /** A link to the payment page, if applicable. */
    payment_link: string | null;
    /** The profile ID associated with the payment. */
    profile_id: string | null;
    /** Details of any surcharge applied to the payment. */
    surcharge_details: object | null;
    /** The number of attempts made for this payment. */
    attempt_count: number | null;
    /** The merchant's decision regarding the payment. */
    merchant_decision: string | null;
    /** The merchant's connector ID. */
    merchant_connector_id: string | null;
    /** Indicates if incremental authorization is allowed. */
    incremental_authorization_allowed: boolean | null;
    /** The count of authorizations. */
    authorization_count: number | null;
    /** A list of incremental authorizations. */
    incremental_authorizations: any[] | null;
    /** Details of external authentication. */
    external_authentication_details: object | null;
    /** Indicates if external 3DS authentication was attempted. */
    external_3ds_authentication_attempted: boolean | null;
    /** The timestamp when the payment expires. */
    expires_on: string | null;
    /** A browser fingerprint. */
    fingerprint: string | null;
    /** Information about the customer's browser. */
    browser_info: BrowserInfo | null;
    /** The ID of the payment method used. */
    payment_method_id: string | null;
    /** The status of the payment method. */
    payment_method_status: string | null;
    /** The timestamp when the payment was last updated. */
    updated: string | null;
    /** Details of split payments, if applicable. */
    split_payments: any[] | null;
    /** Metadata from the fraud management system. */
    frm_metadata: object | null;
    /** Indicates if extended authorization was applied. */
    extended_authorization_applied: boolean | null;
    /** The timestamp before which the payment must be captured. */
    capture_before: string | null;
    /** The merchant's order reference ID. */
    merchant_order_reference_id: string | null;
    /** The tax amount for the order. */
    order_tax_amount: number | null;
    /** The connector's mandate ID. */
    connector_mandate_id: string | null;
    /** Information from card discovery. */
    card_discovery: object | null;
    /** Indicates if 3DS challenge is forced. */
    force_3ds_challenge: boolean | null;
    /** Indicates if 3DS challenge trigger is forced. */
    force_3ds_challenge_trigger: boolean | null;
    /** The error code from the issuer. */
    issuer_error_code: string | null;
    /** The error message from the issuer. */
    issuer_error_message: string | null;
    /** Indicates if iframe redirection is enabled. */
    is_iframe_redirection_enabled: boolean | null;
    /** The whole connector response. */
    whole_connector_response: object | null;
  }

  /**
   * Represents customer acceptance details for a mandate.
   * Placeholder: The exact structure needs to be defined based on backend API.
   */
  export interface CustomerAcceptance {
    // Define properties based on actual CustomerAcceptance structure
    [key: string]: any; // Placeholder for now
  }

  /**
   * Represents the type of mandate.
   * Placeholder: The exact structure needs to be defined based on backend API.
   */
  export interface MandateType {
    // Define properties based on actual MandateType structure
    [key: string]: any; // Placeholder for now
  }

  /**
   * Represents data related to a mandate.
   * This is used when creating or updating a mandate.
   */
  export interface MandateData {
    /** A way to update the mandate's payment method details. The ID of the mandate to be updated. */
    update_mandate_id?: string | null;
    /** A consent from the customer to store the payment method. */
    customer_acceptance?: CustomerAcceptance | null;
    /** A way to select the type of mandate used. */
    mandate_type?: MandateType | null;
  }

  /**
   * Represents the error response of a payment confirmation.
   * This is returned when the payment confirmation fails before a full payment response can be generated.
   */
  export interface ConfirmPaymentErrorResponse {
    /** Indicates if the submission was initially successful before encountering an error. */
    submitSuccessful: boolean;
    /** Contains details about the error. */
    error: {
      /** The type of error that occurred (e.g., "validation_error"). */
      type: string;
      /** A descriptive message for the error. */
      message: string;
    };
  }

  /**
   * Represents the successful response of retrieving a payment intent.
   */
  export interface RetrievePaymentIntentResponse {
    /** Contains the payment intent details. */
    paymentIntent: ConfirmPaymentResponse;
  }

  export interface HyperInstance {
    /**
     * Confirms a payment with the given parameters.
     * @param params - The payload for confirming the payment.
     * @returns A Promise that resolves to either a ConfirmPaymentResponse on success
     * or a ConfirmPaymentErrorResponse if an error occurs during the process.
     */
    confirmPayment(
      params: confirmPaymentInputPayload
    ): Promise<ConfirmPaymentResponse | ConfirmPaymentErrorResponse>;
    elements(options: ElementsOptions): Element;
    confirmCardPayment(
      clientSecret: string,
      data?: object,
      options?: object
    ): Promise<object>;
    /**
     * Retrieves a payment intent by its ID.
     * @param paymentIntentId - The ID of the payment intent to retrieve.
     * @returns A Promise that resolves to a RetrievePaymentIntentResponse object on success, or null if the retrieval fails.
     */
    retrievePaymentIntent(
      paymentIntentId: string
    ): Promise<RetrievePaymentIntentResponse | null>;
    widgets(options: ElementsOptions): Element;
    paymentRequest(options: object): object;
  }

  export interface LoadOptions {
    customBackendUrl?: string;
    env?: "SANDBOX" | "PROD";
    [key: string]: any;
  }

  export type HyperObject =
    | string
    | {
        publishableKey: string;
        profileId: string;
      };

  export interface AnalyticsData {
    sessionID: string;
    timeStamp: string;
  }

  /**
   * Represents the possible values for the labels
   */
  export type AppearanceLabels = "Above" | "Floating" | "Never" | string;

  /**
   * Represents the possible values for the theme
   */
  export type AppearanceTheme =
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
  export interface AppearanceVariables {
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
  export interface AppearanceRuleValue {
    [key: string]: string;
  }

  /**
   * The 'rules' object (e.g., {".Input": {"borderColor": "#000"})
   */
  export interface AppearanceRules {
    [key: string]: AppearanceRuleValue;
  }

  /**
   * src/Types/CardThemeType.res defines 'innerLayout' as: Spaced | Compressed
   */
  export type AppearanceInnerLayout = "Spaced" | "Compressed" | string; // For flexibility

  /**
   * The complete type for the 'appearance' object within elementsOptions
   */
  export interface ElementsAppearanceOptions {
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
  export interface ElementsFontOptions {
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
  export type ElementsLoaderOption = "auto" | "always" | "never" | string; // For flexibility if other string values are used

  /**
   * The final, consolidated type for the 'elementsOptions' JSON object
   */
  export interface ElementsOptions {
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
  export interface ElementsUpdateOptions {
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
  export function loadHyper(
    hyperObject: HyperObject,
    options?: LoadOptions
  ): Promise<HyperInstance>;

  /**
   * @deprecated Use loadHyper instead
   */
  export function loadStripe(
    hyperObject: string | HyperObject,
    options?: LoadOptions
  ): Promise<HyperInstance>;
}
