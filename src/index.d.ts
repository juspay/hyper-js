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
   * Represents Details of customer attached to the payment
   */
  export interface CustomerDetailsResponse {
    /** The identifier for the customer. */
    id?: string | null;
    /** The customer's name */
    name?: string | null;
    /** The customer's email address */
    email?: string | null;
    /** The customer's phone number */
    phone?: string | null;
    /** The country code for the customer's phone number */
    phone_country_code?: string | null;
  }

  /**
   * Represents Details of refund attached to the payment
   */
  export interface RefundResponse {
    /** Unique Identifier for the refund */
    refund_id: string;
    /** The payment id against which refund is initiated */
    payment_id: string;
    /** The refund amount, which should be less than or equal to the total payment amount. Amount for the payment in lowest denomination of the currency. (i.e) in cents for USD denomination, in paisa for INR denomination etc */
    amount: number;
    /** The three-letter ISO currency code */
    currency: string;
    /** The status of the refund */
    status: string;
    /** An arbitrary string attached to the object. Often useful for displaying to users and your customer support executive */
    reason?: string | null;
    /** You can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long. Metadata is useful for storing additional, structured information on an object */
    metadata?: any | null;
    /** The error message */
    error_message?: string | null;
    /** The code for the error */
    error_code?: string | null;
    /** Error code unified across the connectors is received here if there was an error while calling connector */
    unified_code?: string | null;
    /** Error message unified across the connectors is received here if there was an error while calling connector */
    unified_message?: string | null;
    /** The timestamp at which refund is created */
    created_at?: string | null;
    /** The timestamp at which refund is updated */
    updated_at?: string | null;
    /** The connector used for the refund and the corresponding payment */
    connector: string;
    /** The id of business profile for this refund */
    profile_id?: string | null;
    /** The merchant_connector_id of the processor through which this payment went through */
    merchant_connector_id?: string | null;
    /** Split refund details */
    split_refunds?: any | null;
    /** Error code received from the issuer in case of failed refunds */
    issuer_error_code?: string | null;
    /** Error message received from the issuer in case of failed refunds */
    issuer_error_message?: string | null;
  }

  /**
   * Represents Details of dispute attached to the payment
   */
  export interface DisputeResponsePaymentsRetrieve {
    /** The identifier for dispute */
    dispute_id: string;
    /** The stage of the dispute */
    dispute_stage: string;
    /** The status of the dispute */
    dispute_status: string;
    /** Status of the dispute sent by connector */
    connector_status: string;
    /** Dispute id sent by connector */
    connector_dispute_id: string;
    /** Reason of dispute sent by connector */
    connector_reason?: string | null;
    /** Reason code of dispute sent by connector */
    connector_reason_code?: string | null;
    /** Evidence deadline of dispute sent by connector */
    challenge_required_by?: string | null;
    /** Dispute created time sent by connector */
    connector_created_at?: string | null;
    /** Dispute updated time sent by connector */
    connector_updated_at?: string | null;
    /** Time at which dispute is received */
    created_at: string;
  }

  /**
   * Represents payment attempt attached to the payment
   */
  export interface PaymentAttemptResponse {
    /** A unique identifier for this specific payment attempt. */
    attempt_id: string;
    /** Current status of the payment attempt. */
    status: string;
    /** The payment attempt amount. Amount for the payment in the lowest denomination of the currency (e.g., in cents for USD, in paisa for INR). */
    amount: number;
    /** The payment attempt tax amount. */
    order_tax_amount?: number | null;
    /** The currency of the payment attempt. */
    currency?: string | null;
    /** The name of the payment connector (e.g., 'stripe', 'adyen') used for this attempt. */
    connector?: string | null;
    /** A human-readable message from the connector explaining any error that occurred during this payment attempt. */
    error_message?: string | null;
    /** The payment method used for this attempt. */
    payment_method?: string | null;
    /** A unique identifier for a payment provided by the connector. */
    connector_transaction_id?: string | null;
    /** The capture method used for the payment attempt. */
    capture_method?: string | null;
    /** The authentication type used for the payment attempt. */
    authentication_type?: string | null;
    /** Time at which the payment attempt was created. */
    created_at: string;
    /** Time at which the payment attempt was last modified. */
    modified_at: string;
    /** The reason for cancellation if the payment was cancelled. */
    cancellation_reason?: string | null;
    /** The ID of the mandate associated with this payment attempt, if applicable (e.g., for recurring payments). */
    mandate_id?: string | null;
    /** The error code returned by the connector if this payment attempt failed. This code is specific to the connector. */
    error_code?: string | null;
    /** The payment token representing the saved payment method if a tokenized payment method was used for this attempt. */
    payment_token?: string | null;
    /** Additional data related to some connectors. */
    connector_metadata?: any | null;
    /** The payment experience used for the attempt. */
    payment_experience?: string | null;
    /** The type of payment method used. */
    payment_method_type?: string | null;
    /** The connector's own reference or transaction ID for this specific payment attempt. Useful for reconciliation with the connector. */
    reference_id?: string | null;
    /** (This field is not live yet) Error code unified across the connectors received if there was an error while calling the connector. */
    unified_code?: string | null;
    /** (This field is not live yet) Error message unified across the connectors received if there was an error while calling the connector. */
    unified_message?: string | null;
    /** Value passed in the X-CLIENT-SOURCE header during the payments confirm request by the client. */
    client_source?: string | null;
    /** Value passed in the X-CLIENT-VERSION header during the payments confirm request by the client. */
    client_version?: string | null;
  }

  /**
   * Represents Details of capture attached to the payment
   */
  export interface CaptureResponse {
    /** A unique identifier for this specific capture operation. */
    capture_id: string;
    /** Current status of the capture operation. */
    status: string; // Assuming CaptureStatus is an existing type
    /** The capture amount. Amount for the payment in the lowest denomination of the currency (e.g., in cents for USD, in paisa for INR). */
    amount: number;
    /** The currency of the capture. */
    currency?: string | null; // Assuming Currency is an existing type
    /** The name of the payment connector that processed this capture. */
    connector: string;
    /** The ID of the payment attempt that was successfully authorized and subsequently captured by this operation. */
    authorized_attempt_id: string;
    /** A unique identifier for this capture provided by the connector. */
    connector_capture_id?: string | null;
    /** Sequence number of this capture, in the series of captures made for the parent attempt. */
    capture_sequence: number;
    /** A human-readable message from the connector explaining why this capture operation failed, if applicable. */
    error_message?: string | null;
    /** The error code returned by the connector if this capture operation failed. This code is connector-specific. */
    error_code?: string | null;
    /** A more detailed reason from the connector explaining the capture failure, if available. */
    error_reason?: string | null;
    /** The connector's own reference or transaction ID for this specific capture operation. Useful for reconciliation. */
    reference_id?: string | null;
  }

  /**
   * The maximum amount to be debited for the mandate transaction.
   */
  export interface MandateAmountData {
    amount: number;
    currency: string;
    /** Specifying start date of the mandate. */
    start_date?: string | null;
    /** Specifying end date of the mandate. */
    end_date?: string | null;
    /** Additional details required by mandate. */
    metadata?: string | null;
  }

  /**
   * Represents a single-use mandate type.
   */
  export interface MandateTypeSingleUse {
    single_use: MandateAmountData;
  }

  /**
   * Represents a multi-use mandate type.
   */
  export interface MandateTypeMultiUse {
    multi_use: MandateAmountData | null;
  }

  /**
   * Represents the type of mandate, either single-use or multi-use.
   */
  export type MandateType = MandateTypeSingleUse | MandateTypeMultiUse;

  export interface MandateData {
    /** A way to update the mandate's payment method details. */
    update_mandate_id?: string | null;
    /** Details about the customer's acceptance of the mandate. */
    customer_acceptance?: CustomerAcceptance | null; // Assuming CustomerAcceptance is an existing type
    /** The type of mandate. */
    mandate_type?: MandateType | null; // Assuming MandateType is an existing type
  }

  /**
   * Represents a payment address.
   */
  export interface Address {
    /** Details of the address. */
    address?: AddressDetails | null;
    /** Details of the phone number. */
    phone?: PhoneDetails | null;
    /** The email address. */
    email?: string | null;
  }

  /**
   * Represents billing/shipping details for a payment
   */
  export interface AddressDetails {
    /** The city, district, suburb, town, or village of the address. */
    city?: string | null;
    /** The country of the address in Alpha-2 format. */
    country?: string | null; // Assuming CountryAlpha2 is an existing type
    /** The first line of the street address or P.O. Box. */
    line1?: string | null;
    /** The second line of the street address or P.O. Box (e.g., apartment, suite, unit, or building). */
    line2?: string | null;
    /** The third line of the street address, if applicable. */
    line3?: string | null;
    /** The zip/postal code for the address. */
    zip?: string | null;
    /** The address state. */
    state?: string | null;
    /** The first name for the address. */
    first_name?: string | null;
    /** The last name for the address. */
    last_name?: string | null;
  }

  /**
   * Represents phone details for a payment
   */
  export interface PhoneDetails {
    /** The contact number. */
    number?: string | null;
    /** The country code attached to the number. */
    country_code?: string | null;
  }

  /**
   * Represents order details with amount information.
   */
  export interface OrderDetailsWithAmount {
    /** Name of the product that is being purchased. */
    product_name: string;
    /** The quantity of the product to be purchased. */
    quantity: number;
    /** The amount per quantity of product. */
    amount: number;
    /** Tax rate applicable to the product. */
    tax_rate?: number | null;
    /** Total tax amount applicable to the product. */
    total_tax_amount?: number | null;
    /** Indicates if the product requires shipping. */
    requires_shipping?: boolean | null;
    /** The image URL of the product. */
    product_img_link?: string | null;
    /** ID of the product that is being purchased. */
    product_id?: string | null;
    /** Category of the product that is being purchased. */
    category?: string | null;
    /** Sub category of the product that is being purchased. */
    sub_category?: string | null;
    /** Brand of the product that is being purchased. */
    brand?: string | null;
    /** The type of product. */
    product_type?: string | null; // Assuming ProductType is an existing type
    /** The tax code for the product. */
    product_tax_code?: string | null;
  }

  /**
   * Represents surcharge details for a payment.
   */
  export interface RequestSurchargeDetails {
    /** The surcharge amount. */
    surcharge_amount: number;
    /** This Unit struct represents MinorUnit in which core amount works. */
    tax_amount?: number | null;
  }

  /**
   * Represents incremental authorization response
   */
  export interface IncrementalAuthorizationResponse {
    /** The unique identifier of authorization. */
    authorization_id: string;
    /** Amount the authorization has been made for. */
    amount: number;
    /** The status of the authorization. */
    status: string; // Assuming AuthorizationStatus is an existing type
    /** Error code sent by the connector for authorization. */
    error_code?: string | null;
    /** Error message sent by the connector for authorization. */
    error_message?: string | null;
    /** This Unit struct represents MinorUnit in which core amount works. */
    previously_authorized_amount: number;
  }

  /** Details of external authentication. */
  export interface ExternalAuthenticationDetailsResponse {
    /** The authentication flow used (e.g., decoupled authentication type). */
    authentication_flow?: string | null; // Assuming DecoupledAuthenticationType is an existing type
    /** Electronic Commerce Indicator (ECI). */
    electronic_commerce_indicator?: string | null;
    /** The status of the authentication. */
    status: string; // Assuming AuthenticationStatus is an existing type
    /** DS Transaction ID. */
    ds_transaction_id?: string | null;
    /** Message Version. */
    version?: string | null;
    /** Error Code. */
    error_code?: string | null;
    /** Error Message. */
    error_message?: string | null;
  }

  /**
   * Represents the response of a payment confirmation.
   * This corresponds to the `PaymentsResponse` or `PaymentsIntentResponse` in the Rust backend.
   */
  export interface ConfirmPaymentResponse {
    /** Unique identifier for the payment. This ensures idempotency for multiple payments that have been done by a single merchant. */
    payment_id: string;
    /** This is an identifier for the merchant account. This is inferred from the API key provided during the request */
    merchant_id: string;
    /** The status of the payment intent */
    status: string;
    /** The payment amount. Amount for the payment in lowest denomination of the currency. (i.e) in cents for USD denomination, in paisa for INR denomination etc., */
    amount: number;
    /** The payment net amount. net_amount = amount + surcharge_details.surcharge_amount + surcharge_details.tax_amount + shipping_cost + order_tax_amount, If no surcharge_details, shipping_cost, order_tax_amount, net_amount = amount */
    net_amount: number;
    /** The shipping cost for the payment. */
    shipping_cost?: number | null;
    /** The amount (in minor units) that can still be captured for this payment. This is relevant when `capture_method` is `manual`. Once fully captured, or if `capture_method` is `automatic` and payment succeeded, this will be 0. */
    amount_capturable: number;
    /** The total amount (in minor units) that has been captured for this payment. For `fauxpay` sandbox connector, this might reflect the authorized amount if `status` is `succeeded` even if `capture_method` was `manual`. */
    amount_received?: number | null;
    /** The name of the payment connector (e.g., 'stripe', 'adyen') that processed or is processing this payment. */
    connector?: string | null;
    /** A secret token unique to this payment intent. It is primarily used by client-side applications (e.g., Hyperswitch SDKs) to authenticate actions like confirming the payment or handling next actions. This secret should be handled carefully and not exposed publicly beyond its intended client-side use. */
    client_secret?: string | null;
    /** Timestamp indicating when this payment intent was created, in ISO 8601 format. */
    created?: string | null;
    /** The currency of the payment */
    currency: string;
    /** The identifier for the customer object. If not provided the customer ID will be autogenerated. This field will be deprecated soon. Please refer to `customer.id` */
    customer_id?: string | null;
    /** Customer details response object */
    customer?: CustomerDetailsResponse | null;
    /** An arbitrary string providing a description for the payment, often useful for display or internal record-keeping. */
    description?: string | null;
    /** An array of refund objects associated with this payment. Empty or null if no refunds have been processed. */
    refunds?: Array<RefundResponse> | null;
    /** List of disputes that happened on this intent */
    disputes?: Array<DisputeResponsePaymentsRetrieve> | null;
    /** List of attempts that happened on this intent */
    attempts?: Array<PaymentAttemptResponse> | null;
    /** List of captures done on latest attempt */
    captures?: Array<CaptureResponse> | null;
    /** A unique identifier to link the payment to a mandate, can be used instead of payment_method_data, in case of setting up recurring payments */
    mandate_id?: string | null;
    /** Mandate data object */
    mandate_data?: MandateData | null;
    /** Setup future usage configuration */
    setup_future_usage?: string | null;
    /** Set to true to indicate that the customer is not in your checkout flow during this payment, and therefore is unable to authenticate. This parameter is intended for scenarios where you collect card details and charge them later. This parameter can only be used with confirm=true. */
    off_session?: boolean | null;
    /** A timestamp (ISO 8601 code) that determines when the payment should be captured. Providing this field will automatically set `capture` to true */
    capture_on?: string | null;
    /** The capture method for the payment */
    capture_method?: string | null;
    /** The payment method used for this payment */
    payment_method: string;
    /** Payment method data with billing information */
    payment_method_data?: any | null;
    /** Provide a reference to a stored payment method */
    payment_token?: string | null;
    /** Shipping address information */
    shipping?: Address | null;
    /** Billing address information */
    billing?: Address | null;
    /** Information about the product , quantity and amount for connectors. (e.g. Klarna) */
    order_details?: Array<OrderDetailsWithAmount> | null;
    /** The customer's email address This field will be deprecated soon. Please refer to `customer.email` object */
    email?: string | null;
    /** The customer's name This field will be deprecated soon. Please refer to `customer.name` object */
    name?: string | null;
    /** The customer's phone number This field will be deprecated soon. Please refer to `customer.phone` object */
    phone?: string | null;
    /** The URL to redirect after the completion of the operation */
    return_url?: string | null;
    /** The authentication type used for the payment */
    authentication_type?: string | null;
    /** For non-card charges, you can use this value as the complete description that appears on your customers' statements. Must contain at least one letter, maximum 22 characters. */
    statement_descriptor_name?: string | null;
    /** Provides information about a card payment that customers see on their statements. Concatenated with the prefix (shortened descriptor) or statement descriptor that's set on the account to form the complete statement descriptor. Maximum 255 characters for the concatenated descriptor. */
    statement_descriptor_suffix?: string | null;
    /** Next action data for the payment */
    next_action?: any | null;
    /** If the payment intent was cancelled, this field provides a textual reason for the cancellation (e.g., "requested_by_customer", "abandoned"). */
    cancellation_reason?: string | null;
    /** The connector-specific error code from the last failed payment attempt associated with this payment intent. */
    error_code?: string | null;
    /** A human-readable error message from the last failed payment attempt associated with this payment intent. */
    error_message?: string | null;
    /** error code unified across the connectors is received here if there was an error while calling connector */
    unified_code?: string | null;
    /** error message unified across the connectors is received here if there was an error while calling connector */
    unified_message?: string | null;
    /** The payment experience type */
    payment_experience?: string | null;
    /** The payment method type used */
    payment_method_type?: string | null;
    /** A label identifying the specific merchant connector account (MCA) used for this payment. This often combines the connector name, business country, and a custom label (e.g., "stripe_US_primary"). */
    connector_label?: string | null;
    /** The business country code */
    business_country?: string | null;
    /** The label identifying the specific business unit or profile under which this payment was processed by the merchant. */
    business_label?: string | null;
    /** An optional sub-label for further categorization of the business unit or profile used for this payment. */
    business_sub_label?: string | null;
    /** Allowed Payment Method Types for a given PaymentIntent */
    allowed_payment_method_types?: Array<string> | null;
    /** Ephemeral key create response */
    ephemeral_key?: any | null;
    /** If true the payment can be retried with same or different payment method which means the confirm call can be made again. */
    manual_retry_allowed?: boolean | null;
    /** A unique identifier for a payment provided by the connector */
    connector_transaction_id?: string | null;
    /** FRM message object */
    frm_message?: any | null;
    /** You can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long. Metadata is useful for storing additional, structured information on an object. */
    metadata?: any | null;
    /** Connector metadata object */
    connector_metadata?: any | null;
    /** Feature metadata object */
    feature_metadata?: any | null;
    /** reference(Identifier) to the payment at connector side */
    reference_id?: string | null;
    /** Payment link response object */
    payment_link?: any | null;
    /** The business profile that is associated with this payment */
    profile_id?: string | null;
    /** Surcharge details object */
    surcharge_details?: RequestSurchargeDetails | null;
    /** Total number of attempts associated with this payment */
    attempt_count: number;
    /** Denotes the action(approve or reject) taken by merchant in case of manual review. Manual review can occur when the transaction is marked as risky by the frm_processor, payment processor or when there is underpayment/over payment incase of crypto payment */
    merchant_decision?: string | null;
    /** Identifier of the connector ( merchant connector account ) which was chosen to make the payment */
    merchant_connector_id?: string | null;
    /** If true, incremental authorization can be performed on this payment, in case the funds authorized initially fall short. */
    incremental_authorization_allowed?: boolean | null;
    /** Total number of authorizations happened in an incremental_authorization payment */
    authorization_count?: number | null;
    /** List of incremental authorizations happened to the payment */
    incremental_authorizations?: Array<IncrementalAuthorizationResponse> | null;
    /** External authentication details response */
    external_authentication_details?: ExternalAuthenticationDetailsResponse | null;
    /** Flag indicating if external 3ds authentication is made or not */
    external_3ds_authentication_attempted?: boolean | null;
    /** Date Time for expiry of the payment */
    expires_on?: string | null;
    /** Payment Fingerprint, to identify a particular card. It is a 20 character long alphanumeric code. */
    fingerprint?: string | null;
    /** Browser information object */
    browser_info?: BrowserInfo | null;
    /** A unique identifier for the payment method used in this payment. If the payment method was saved or tokenized, this ID can be used to reference it for future transactions or recurring payments. */
    payment_method_id?: string | null;
    /** The payment method status */
    payment_method_status?: string | null;
    /** Date time at which payment was updated */
    updated?: string | null;
    /** Split payments data */
    split_payments?: any | null;
    /** You can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long. FRM Metadata is useful for storing additional, structured information on an object related to FRM. */
    frm_metadata?: any | null;
    /** flag that indicates if extended authorization is applied on this payment or not */
    extended_authorization_applied?: boolean | null;
    /** date and time after which this payment cannot be captured */
    capture_before?: string | null;
    /** Merchant's identifier for the payment/invoice. This will be sent to the connector if the connector provides support to accept multiple reference ids. In case the connector supports only one reference id, Hyperswitch's Payment ID will be sent as reference. */
    merchant_order_reference_id?: string | null;
    /** This Unit struct represents MinorUnit in which core amount works */
    order_tax_amount?: number | null;
    /** Connector Identifier for the payment method */
    connector_mandate_id?: string | null;
    /** Card discovery object */
    card_discovery?: string | null;
    /** Indicates if 3ds challenge is forced */
    force_3ds_challenge?: boolean | null;
    /** Indicates if 3ds challenge is triggered */
    force_3ds_challenge_trigger?: boolean | null;
    /** Error code received from the issuer in case of failed payments */
    issuer_error_code?: string | null;
    /** Error message received from the issuer in case of failed payments */
    issuer_error_message?: string | null;
    /** Indicates if the redirection has to open in the iframe */
    is_iframe_redirection_enabled?: boolean | null;
    /** Contains whole connector response */
    whole_connector_response?: string | null;
  }

  /**
   * Represents the details of the online acceptance method.
   */
  export interface CustomerAcceptanceOnlineDetails {
    /** The user agent string of the browser used for acceptance. */
    user_agent: string;
    /** The IP address of the customer, if available. */
    ip_address?: string | null;
  }

  /**
   * Represents customer acceptance details for a mandate.
   */
  export interface CustomerAcceptance {
    /** The type of acceptance (e.g., "online", "offline"). */
    acceptance_type: "online" | "offline" | string;
    /** The timestamp when the acceptance was recorded (ISO 8601 format). */
    accepted_at: string;
    /** Details specific to online acceptance. Present if 'acceptance_type' is 'online'. */
    online?: CustomerAcceptanceOnlineDetails | null;
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
