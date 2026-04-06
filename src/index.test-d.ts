/**
 * Type-level tests for @juspay-tech/hyper-js
 *
 * Run with: npx tsc --project tsconfig.test.json --noEmit
 * Expected: 0 errors. Every exported type and method is exercised here.
 */

import {
  // Entry points
  loadHyper,
  loadStripe,

  // Core instance & element types
  HyperInstance,
  Element,
  PaymentElement,

  // Literal unions
  EventName,
  EventData,
  ComponentType,

  // Load / init
  LoadOptions,
  HyperObject,

  // Confirm payload types
  confirmPaymentInputPayload,
  usedConfirmParamsFromPayload,
  ConfirmPaymentResponse,
  ConfirmPaymentErrorResponse,
  RetrievePaymentIntentResponse,

  // Headless / Click-to-Pay session chain
  InitPaymentSession,
  GetCustomerSavedPaymentMethods,
  InitAuthenticationSession,
  ClickToPaySession,
  InitClickToPaySessionInput,
  IsCustomerPresentInput,
  ValidateCustomerAuthenticationInput,
  CheckoutWithCardInput,

  // Elements appearance / options
  ElementsOptions,
  ElementsUpdateOptions,
  ElementsAppearanceOptions,
  ElementsFontOptions,
  ElementsLoaderOption,
  AppearanceVariables,
  AppearanceRules,
  AppearanceRuleValue,
  AppearanceTheme,
  AppearanceLabels,
  AppearanceInnerLayout,
  AnalyticsData,

  // Nested response types
  BrowserInfo,
  CustomerDetailsResponse,
  RefundResponse,
  DisputeResponsePaymentsRetrieve,
  PaymentAttemptResponse,
  CaptureResponse,
  MandateAmountData,
  MandateTypeSingleUse,
  MandateTypeMultiUse,
  MandateType,
  MandateData,
  Address,
  AddressDetails,
  PhoneDetails,
  OrderDetailsWithAmount,
  RequestSurchargeDetails,
  IncrementalAuthorizationResponse,
  ExternalAuthenticationDetailsResponse,
  CustomerAcceptance,
  CustomerAcceptanceOnlineDetails,
} from "@juspay-tech/hyper-js";

// ---------------------------------------------------------------------------
// Helper: compile-time assertion that a value has a given type
// ---------------------------------------------------------------------------
function assertType<T>(_value: T): void {}

// ===== 1. loadHyper — string key =====
async function testLoadHyperWithString() {
  const hyper: HyperInstance = await loadHyper("pk_test_123");
  assertType<HyperInstance>(hyper);
}

// ===== 2. loadHyper — object key =====
async function testLoadHyperWithObject() {
  const hyper: HyperInstance = await loadHyper({
    publishableKey: "pk_test_123",
    profileId: "prof_abc",
  });
  assertType<HyperInstance>(hyper);
}

// ===== 3. loadHyper — with all LoadOptions fields =====
async function testLoadHyperWithAllOptions() {
  const opts: LoadOptions = {
    customBackendUrl: "https://api.example.com",
    env: "SANDBOX",
    isPreloadEnabled: true,
    isTestMode: false,
    isForceInit: true,
    redirectionFlags: {
      shouldUseTopRedirection: true,
      shouldRemoveBeforeUnloadEvents: false,
    },
    analytics: { metadata: { merchantId: "m_123" } },
    customExtraKey: "allowed by index signature",
  };
  const hyper = await loadHyper("pk_test_123", opts);
  assertType<HyperInstance>(hyper);
}

// ===== 4. loadStripe (deprecated) =====
async function testLoadStripe() {
  const hyper: HyperInstance = await loadStripe("pk_test_123");
  assertType<HyperInstance>(hyper);

  const hyper2: HyperInstance = await loadStripe(
    { publishableKey: "pk_test_123", profileId: "prof_abc" },
    { env: "PROD" }
  );
  assertType<HyperInstance>(hyper2);
}

// ===== 5. HyperInstance — all 13 methods =====
async function testHyperInstanceMethods(hyper: HyperInstance) {
  // 1. confirmPayment
  const confirmResult = await hyper.confirmPayment({
    confirmParams: { return_url: "https://example.com/return" },
    redirect: "if_required",
  });
  assertType<ConfirmPaymentResponse | ConfirmPaymentErrorResponse>(confirmResult);

  // 2. elements
  const element: Element = hyper.elements({ clientSecret: "cs_test_123" });
  assertType<Element>(element);

  // 3. confirmCardPayment
  const cardResult = await hyper.confirmCardPayment("cs_test_123", { card: {} });
  assertType<object>(cardResult);

  // 4. retrievePaymentIntent
  const retrieveResult = await hyper.retrievePaymentIntent("pi_test_123");
  assertType<RetrievePaymentIntentResponse | null>(retrieveResult);

  // 5. widgets
  const widgetElement: Element = hyper.widgets({ clientSecret: "cs_test_123" });
  assertType<Element>(widgetElement);

  // 6. paymentRequest
  const prResult: object = hyper.paymentRequest({ country: "US" });
  assertType<object>(prResult);

  // 7. confirmOneClickPayment
  const oneClickResult = await hyper.confirmOneClickPayment({ token: "tok_123" }, true);
  assertType<any>(oneClickResult);

  // 8. initPaymentSession
  const session: InitPaymentSession = hyper.initPaymentSession({ clientSecret: "cs_123" });
  assertType<InitPaymentSession>(session);

  // 9. initAuthenticationSession
  const authSession: InitAuthenticationSession = hyper.initAuthenticationSession({});
  assertType<InitAuthenticationSession>(authSession);

  // 10. paymentMethodsManagementElements
  const mgmtElement: Element = hyper.paymentMethodsManagementElements({
    clientSecret: "cs_test_123",
  });
  assertType<Element>(mgmtElement);

  // 11. completeUpdateIntent
  const completeResult = await hyper.completeUpdateIntent("cs_test_123");
  assertType<any>(completeResult);

  // 12. initiateUpdateIntent
  const initiateResult = await hyper.initiateUpdateIntent();
  assertType<any>(initiateResult);

  // 13. confirmTokenization
  const tokenResult = await hyper.confirmTokenization({ data: "some" });
  assertType<any>(tokenResult);
}

// ===== 6. Element — create() with all 14 ComponentType values =====
function testElementCreateAllComponentTypes(element: Element) {
  const componentTypes: ComponentType[] = [
    "card",
    "cardNumber",
    "cardExpiry",
    "cardCvc",
    "payment",
    "paymentMethodCollect",
    "paymentMethodsManagement",
    "googlePay",
    "payPal",
    "applePay",
    "klarna",
    "expressCheckout",
    "paze",
    "samsungPay",
  ];

  for (const ct of componentTypes) {
    const pe: PaymentElement = element.create(ct);
    assertType<PaymentElement>(pe);
  }

  // create with options
  const peWithOpts: PaymentElement = element.create("payment", { layout: "tabs" });
  assertType<PaymentElement>(peWithOpts);
}

// ===== 7. Element — getElement, update, fetchUpdates =====
async function testElementOtherMethods(element: Element) {
  // getElement returns PaymentElement | null
  const pe: PaymentElement | null = element.getElement("card");
  assertType<PaymentElement | null>(pe);

  // update
  element.update({ clientSecret: "cs_new", locale: "fr" });

  // fetchUpdates
  const updates: object = await element.fetchUpdates();
  assertType<object>(updates);
}

// ===== 8. PaymentElement — on() with all 9 EventName values =====
function testPaymentElementOnAllEvents(pe: PaymentElement) {
  const eventNames: EventName[] = [
    "change",
    "ready",
    "focus",
    "blur",
    "escape",
    "clickTriggered",
    "completeDoThis",
    "confirmTriggered",
    "oneClickConfirmTriggered",
  ];

  for (const name of eventNames) {
    pe.on(name, (data?: EventData) => {
      if (data) {
        assertType<boolean>(data.iframeMounted);
        assertType<boolean>(data.focus);
        assertType<boolean>(data.blur);
        assertType<boolean>(data.ready);
        assertType<boolean>(data.clickTriggered);
        assertType<boolean>(data.completeDoThis);
        assertType<string>(data.elementType);
        assertType<boolean>(data.classChange);
        assertType<string>(data.newClassType);
        assertType<boolean>(data.confirmTriggered);
        assertType<boolean>(data.oneClickConfirmTriggered);
      }
    });
  }

  // on() with no handler
  pe.on("change");

  // on() with null handler
  pe.on("ready", null);
}

// ===== 9. PaymentElement — all other methods =====
function testPaymentElementMethods(pe: PaymentElement) {
  pe.mount("#payment-form");
  pe.unmount();
  pe.destroy();
  pe.collapse();
  pe.blur();
  pe.focus();
  pe.clear();
  pe.update({ clientSecret: "cs_updated" });
}

// ===== 10. onSDKHandleClick — handler and null =====
function testOnSDKHandleClick(pe: PaymentElement) {
  // With async handler
  pe.onSDKHandleClick(async () => {
    // custom validation logic
  });

  // With null to remove handler
  pe.onSDKHandleClick(null);

  // With no argument
  pe.onSDKHandleClick();
}

// ===== 11. EventData — all 11 fields =====
function testEventDataShape() {
  const data: EventData = {
    iframeMounted: true,
    focus: false,
    blur: false,
    ready: true,
    clickTriggered: false,
    completeDoThis: false,
    elementType: "payment",
    classChange: false,
    newClassType: "",
    confirmTriggered: false,
    oneClickConfirmTriggered: false,
  };
  assertType<EventData>(data);
}

// ===== 12. LoadOptions — all new fields =====
function testLoadOptionsFields() {
  const opts: LoadOptions = {
    customBackendUrl: "https://backend.example.com",
    env: "PROD",
    isPreloadEnabled: false,
    isTestMode: true,
    isForceInit: false,
    redirectionFlags: {
      shouldUseTopRedirection: true,
      shouldRemoveBeforeUnloadEvents: true,
    },
    analytics: {
      metadata: { version: "1.0", merchant: "test" },
    },
  };
  assertType<LoadOptions>(opts);

  // Minimal
  const minimal: LoadOptions = {};
  assertType<LoadOptions>(minimal);
}

// ===== 13. HyperObject union =====
function testHyperObject() {
  const strObj: HyperObject = "pk_test_123";
  assertType<HyperObject>(strObj);

  const objObj: HyperObject = {
    publishableKey: "pk_test_123",
    profileId: "prof_abc",
  };
  assertType<HyperObject>(objObj);
}

// ===== 14. InitPaymentSession → GetCustomerSavedPaymentMethods chain =====
async function testPaymentSessionChain(hyper: HyperInstance) {
  const session: InitPaymentSession = hyper.initPaymentSession({});
  const savedMethods: GetCustomerSavedPaymentMethods =
    await session.getCustomerSavedPaymentMethods();

  // All 4 methods
  const defaultData: any = savedMethods.getCustomerDefaultSavedPaymentMethodData();
  assertType<any>(defaultData);

  const lastUsedData: any = savedMethods.getCustomerLastUsedPaymentMethodData();
  assertType<any>(lastUsedData);

  const confirmDefault: any = await savedMethods.confirmWithCustomerDefaultPaymentMethod({
    redirect: "if_required",
  });
  assertType<any>(confirmDefault);

  const confirmLastUsed: any = await savedMethods.confirmWithLastUsedPaymentMethod({
    redirect: "always",
  });
  assertType<any>(confirmLastUsed);
}

// ===== 15. InitAuthenticationSession → ClickToPaySession chain =====
async function testAuthSessionChain(hyper: HyperInstance) {
  const authSession: InitAuthenticationSession = hyper.initAuthenticationSession({});

  // initClickToPaySession
  const input: InitClickToPaySessionInput = { request3DSAuthentication: true };
  const ctpResult: any = await authSession.initClickToPaySession(input);
  assertType<any>(ctpResult);

  // getActiveClickToPaySession
  const activeSession: any = await authSession.getActiveClickToPaySession();
  assertType<any>(activeSession);
}

// ===== 16. ClickToPaySession — all 6 methods =====
async function testClickToPaySession(session: ClickToPaySession) {
  // isCustomerPresent — with input
  const presentInput: IsCustomerPresentInput = { isCustomerPresent: true };
  await session.isCustomerPresent(presentInput);

  // isCustomerPresent — with null
  await session.isCustomerPresent(null);

  // isCustomerPresent — no arg
  await session.isCustomerPresent();

  // getUserType
  const userType = await session.getUserType();
  assertType<any>(userType);

  // getRecognizedCards
  const cards = await session.getRecognizedCards();
  assertType<any>(cards);

  // validateCustomerAuthentication
  const authInput: ValidateCustomerAuthenticationInput = { otp: "123456" };
  await session.validateCustomerAuthentication(authInput);

  // checkoutWithCard
  const checkoutInput: CheckoutWithCardInput = {
    srcDigitalCardId: "card_123",
    windowRef: null,
  };
  await session.checkoutWithCard(checkoutInput);

  // checkoutWithCard — minimal
  await session.checkoutWithCard({ srcDigitalCardId: "card_456" });

  // signOut
  await session.signOut();
}

// ===== 17. ConfirmPaymentResponse — spot checks =====
function testConfirmPaymentResponseFields(resp: ConfirmPaymentResponse) {
  // Required fields
  assertType<string>(resp.payment_id);
  assertType<string>(resp.merchant_id);
  assertType<string>(resp.status);
  assertType<number>(resp.amount);
  assertType<number>(resp.net_amount);
  assertType<number>(resp.amount_capturable);
  assertType<string>(resp.currency);
  assertType<string>(resp.payment_method);
  assertType<number>(resp.attempt_count);

  // Optional fields (spot check)
  assertType<string | null | undefined>(resp.client_secret);
  assertType<string | null | undefined>(resp.connector);
  assertType<CustomerDetailsResponse | null | undefined>(resp.customer);
  assertType<Array<RefundResponse> | null | undefined>(resp.refunds);
  assertType<Array<DisputeResponsePaymentsRetrieve> | null | undefined>(resp.disputes);
  assertType<Array<PaymentAttemptResponse> | null | undefined>(resp.attempts);
  assertType<Array<CaptureResponse> | null | undefined>(resp.captures);
  assertType<MandateData | null | undefined>(resp.mandate_data);
  assertType<Address | null | undefined>(resp.shipping);
  assertType<Address | null | undefined>(resp.billing);
  assertType<Array<OrderDetailsWithAmount> | null | undefined>(resp.order_details);
  assertType<RequestSurchargeDetails | null | undefined>(resp.surcharge_details);
  assertType<Array<IncrementalAuthorizationResponse> | null | undefined>(
    resp.incremental_authorizations
  );
  assertType<ExternalAuthenticationDetailsResponse | null | undefined>(
    resp.external_authentication_details
  );
  assertType<BrowserInfo | null | undefined>(resp.browser_info);
  assertType<boolean | null | undefined>(resp.is_iframe_redirection_enabled);
  assertType<string | null | undefined>(resp.whole_connector_response);
}

// ===== 18. ConfirmPaymentErrorResponse =====
function testConfirmPaymentErrorResponse() {
  const err: ConfirmPaymentErrorResponse = {
    submitSuccessful: false,
    error: {
      type: "validation_error",
      message: "Card number is invalid",
    },
  };
  assertType<boolean>(err.submitSuccessful);
  assertType<string>(err.error.type);
  assertType<string>(err.error.message);
}

// ===== 19. RetrievePaymentIntentResponse =====
function testRetrieveResponse(resp: RetrievePaymentIntentResponse) {
  assertType<ConfirmPaymentResponse>(resp.paymentIntent);
  assertType<string>(resp.paymentIntent.payment_id);
}

// ===== 20. confirmPaymentInputPayload and nested types =====
function testConfirmPaymentInput() {
  const confirmParams: usedConfirmParamsFromPayload = {
    return_url: "https://example.com/return",
  };
  assertType<usedConfirmParamsFromPayload>(confirmParams);

  const payload: confirmPaymentInputPayload = {
    confirmParams,
    redirect: "if_required",
  };
  assertType<confirmPaymentInputPayload>(payload);

  // All optional
  const emptyPayload: confirmPaymentInputPayload = {};
  assertType<confirmPaymentInputPayload>(emptyPayload);

  // Null values
  const nullPayload: confirmPaymentInputPayload = {
    confirmParams: null,
    redirect: null,
  };
  assertType<confirmPaymentInputPayload>(nullPayload);
}

// ===== 21. ElementsOptions =====
function testElementsOptions() {
  const fullOpts: ElementsOptions = {
    clientSecret: "cs_test_123",
    paymentId: "pi_test_123",
    appearance: {
      theme: "midnight",
      variables: { colorPrimary: "#0570de", fontFamily: "Roboto" },
      rules: { ".Input": { borderColor: "#ccc" } },
      labels: "Floating",
      innerLayout: "Spaced",
    },
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
        family: "Roboto",
        src: "url(https://fonts.example.com/roboto.woff2)",
        weight: "400",
      },
    ],
    locale: "en",
    loader: "auto",
    blockConfirm: false,
    customPodUri: "https://custom.pod.example.com",
  };
  assertType<ElementsOptions>(fullOpts);

  // Minimal required only
  const minimal: ElementsOptions = { clientSecret: "cs_test_456" };
  assertType<ElementsOptions>(minimal);
}

// ===== 22. ElementsAppearanceOptions =====
function testAppearanceOptions() {
  const appearance: ElementsAppearanceOptions = {
    theme: "default",
    variables: {
      colorPrimary: "#0570de",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      borderRadius: "4px",
      fontFamily: "Roboto, sans-serif",
    },
    rules: {
      ".Input": { borderColor: "#e0e0e0" },
      ".Tab--selected": { borderColor: "#0570de" },
    },
    labels: "Above",
    innerLayout: "Compressed",
  };
  assertType<ElementsAppearanceOptions>(appearance);
}

// ===== 23. AppearanceVariables — comprehensive =====
function testAppearanceVariables() {
  const vars: AppearanceVariables = {
    fontFamily: "Inter, sans-serif",
    fontSizeBase: "16px",
    colorPrimary: "#0570de",
    colorBackground: "#ffffff",
    colorText: "#30313d",
    colorDanger: "#df1b41",
    colorDangerText: "#df1b41",
    borderRadius: "4px",
    fontVariantLigatures: "normal",
    fontVariationSettings: "normal",
    spacingUnit: "4px",
    fontWeightLight: "300",
    fontWeightNormal: "400",
    fontWeightMedium: "500",
    fontWeightBold: "700",
    fontLineHeight: "1.5",
    fontSize2Xl: "24px",
    fontSizeXl: "20px",
    fontSizeLg: "18px",
    fontSizeSm: "14px",
    fontSizeXs: "12px",
    fontSize2Xs: "10px",
    fontSize3Xs: "8px",
    colorSuccess: "#28a745",
    colorWarning: "#ffc107",
    colorPrimaryText: "#ffffff",
    colorBackgroundText: "#30313d",
    colorSuccessText: "#ffffff",
    colorWarningText: "#000000",
    colorTextSecondary: "#6c757d",
    colorTextPlaceholder: "#adb5bd",
    spacingTab: "8px",
    borderColor: "#e0e0e0",
    spacingAccordionItem: "12px",
    colorIconCardCvc: "#6c757d",
    colorIconCardCvcError: "#df1b41",
    colorIconCardError: "#df1b41",
    spacingGridColumn: "16px",
    spacingGridRow: "16px",
    buttonBackgroundColor: "#0570de",
    buttonHeight: "44px",
    buttonWidth: "100%",
    buttonBorderRadius: "4px",
    buttonBorderColor: "transparent",
    buttonTextColor: "#ffffff",
    buttonTextFontSize: "16px",
    buttonTextFontWeight: "600",
    buttonBorderWidth: "1px",
    disabledFieldColor: "#f5f5f5",
    // Index signature allows custom keys
    customBrandColor: "#ff5500",
  };
  assertType<AppearanceVariables>(vars);
}

// ===== 24. AppearanceTheme, AppearanceLabels, AppearanceInnerLayout =====
function testAppearanceLiterals() {
  const themes: AppearanceTheme[] = [
    "default",
    "midnight",
    "brutal",
    "charcoal",
    "soft",
    "bubblegum",
    "none",
    "custom-theme",
  ];
  assertType<AppearanceTheme[]>(themes);

  const labels: AppearanceLabels[] = ["Above", "Floating", "Never", "custom"];
  assertType<AppearanceLabels[]>(labels);

  const layouts: AppearanceInnerLayout[] = ["Spaced", "Compressed", "custom"];
  assertType<AppearanceInnerLayout[]>(layouts);
}

// ===== 25. AppearanceRules and AppearanceRuleValue =====
function testAppearanceRules() {
  const ruleValue: AppearanceRuleValue = { borderColor: "#000", fontSize: "14px" };
  assertType<AppearanceRuleValue>(ruleValue);

  const rules: AppearanceRules = {
    ".Input": { borderColor: "#ccc", borderRadius: "4px" },
    ".Tab": { backgroundColor: "#f5f5f5" },
    ".Label": { color: "#333" },
  };
  assertType<AppearanceRules>(rules);
}

// ===== 26. ElementsLoaderOption =====
function testLoaderOption() {
  const loaders: ElementsLoaderOption[] = ["auto", "always", "never", "custom"];
  assertType<ElementsLoaderOption[]>(loaders);
}

// ===== 27. ElementsFontOptions =====
function testFontOptions() {
  const font: ElementsFontOptions = {
    cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    family: "Roboto",
    src: "url(https://fonts.example.com/roboto.woff2)",
    weight: "400",
  };
  assertType<ElementsFontOptions>(font);
}

// ===== 28. ElementsUpdateOptions =====
function testUpdateOptions() {
  const update: ElementsUpdateOptions = {
    clientSecret: "cs_new_123",
    appearance: { theme: "charcoal" },
    locale: "de",
  };
  assertType<ElementsUpdateOptions>(update);

  // All optional
  const empty: ElementsUpdateOptions = {};
  assertType<ElementsUpdateOptions>(empty);
}

// ===== 29. AnalyticsData =====
function testAnalyticsData() {
  const data: AnalyticsData = {
    sessionID: "sess_abc123",
    timeStamp: "2026-04-07T12:00:00Z",
  };
  assertType<AnalyticsData>(data);
}

// ===== 30. BrowserInfo =====
function testBrowserInfo() {
  const info: BrowserInfo = {
    os_type: "macOS",
    language: "en-US",
    time_zone: -480,
    ip_address: "192.168.1.1",
    os_version: "14.0",
    user_agent: "Mozilla/5.0",
    color_depth: 24,
    device_model: "MacBook Pro",
    java_enabled: false,
    screen_width: 1920,
    accept_header: "text/html",
    screen_height: 1080,
    accept_language: "en-US,en",
    java_script_enabled: true,
  };
  assertType<BrowserInfo>(info);
}

// ===== 31. CustomerDetailsResponse =====
function testCustomerDetails() {
  const customer: CustomerDetailsResponse = {
    id: "cust_123",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1234567890",
    phone_country_code: "+1",
  };
  assertType<CustomerDetailsResponse>(customer);

  // All optional
  const empty: CustomerDetailsResponse = {};
  assertType<CustomerDetailsResponse>(empty);
}

// ===== 32. RefundResponse =====
function testRefundResponse() {
  const refund: RefundResponse = {
    refund_id: "ref_123",
    payment_id: "pi_123",
    amount: 1000,
    currency: "USD",
    status: "succeeded",
    connector: "stripe",
  };
  assertType<RefundResponse>(refund);
}

// ===== 33. DisputeResponsePaymentsRetrieve =====
function testDisputeResponse() {
  const dispute: DisputeResponsePaymentsRetrieve = {
    dispute_id: "dis_123",
    dispute_stage: "pre_dispute",
    dispute_status: "dispute_opened",
    connector_status: "open",
    connector_dispute_id: "dp_123",
    created_at: "2026-04-07T12:00:00Z",
  };
  assertType<DisputeResponsePaymentsRetrieve>(dispute);
}

// ===== 34. PaymentAttemptResponse =====
function testPaymentAttempt() {
  const attempt: PaymentAttemptResponse = {
    attempt_id: "att_123",
    status: "charged",
    amount: 5000,
    created_at: "2026-04-07T12:00:00Z",
    modified_at: "2026-04-07T12:01:00Z",
  };
  assertType<PaymentAttemptResponse>(attempt);
}

// ===== 35. CaptureResponse =====
function testCaptureResponse() {
  const capture: CaptureResponse = {
    capture_id: "cap_123",
    status: "charged",
    amount: 5000,
    connector: "stripe",
    authorized_attempt_id: "att_123",
    capture_sequence: 1,
  };
  assertType<CaptureResponse>(capture);
}

// ===== 36. Mandate types =====
function testMandateTypes() {
  const amountData: MandateAmountData = {
    amount: 10000,
    currency: "USD",
    start_date: "2026-01-01",
    end_date: "2027-01-01",
    metadata: "{}",
  };
  assertType<MandateAmountData>(amountData);

  const singleUse: MandateTypeSingleUse = { single_use: amountData };
  assertType<MandateTypeSingleUse>(singleUse);

  const multiUse: MandateTypeMultiUse = { multi_use: amountData };
  assertType<MandateTypeMultiUse>(multiUse);

  const multiUseNull: MandateTypeMultiUse = { multi_use: null };
  assertType<MandateTypeMultiUse>(multiUseNull);

  // Union type
  const mandateType1: MandateType = singleUse;
  const mandateType2: MandateType = multiUse;
  assertType<MandateType>(mandateType1);
  assertType<MandateType>(mandateType2);

  const mandateData: MandateData = {
    update_mandate_id: "mandate_123",
    customer_acceptance: {
      acceptance_type: "online",
      accepted_at: "2026-04-07T12:00:00Z",
      online: {
        user_agent: "Mozilla/5.0",
        ip_address: "192.168.1.1",
      },
    },
    mandate_type: singleUse,
  };
  assertType<MandateData>(mandateData);
}

// ===== 37. Address, AddressDetails, PhoneDetails =====
function testAddressTypes() {
  const phone: PhoneDetails = {
    number: "+1234567890",
    country_code: "+1",
  };
  assertType<PhoneDetails>(phone);

  const addressDetails: AddressDetails = {
    city: "San Francisco",
    country: "US",
    line1: "123 Main St",
    line2: "Apt 4",
    line3: null,
    zip: "94105",
    state: "CA",
    first_name: "Jane",
    last_name: "Doe",
  };
  assertType<AddressDetails>(addressDetails);

  const address: Address = {
    address: addressDetails,
    phone,
    email: "jane@example.com",
  };
  assertType<Address>(address);
}

// ===== 38. OrderDetailsWithAmount =====
function testOrderDetails() {
  const order: OrderDetailsWithAmount = {
    product_name: "Widget",
    quantity: 2,
    amount: 1000,
    tax_rate: 8.5,
    total_tax_amount: 170,
    requires_shipping: true,
    product_img_link: "https://example.com/widget.png",
    product_id: "prod_123",
    category: "electronics",
    sub_category: "gadgets",
    brand: "Acme",
    product_type: "physical",
    product_tax_code: "txcd_123",
  };
  assertType<OrderDetailsWithAmount>(order);
}

// ===== 39. RequestSurchargeDetails =====
function testSurchargeDetails() {
  const surcharge: RequestSurchargeDetails = {
    surcharge_amount: 100,
    tax_amount: 10,
  };
  assertType<RequestSurchargeDetails>(surcharge);
}

// ===== 40. IncrementalAuthorizationResponse =====
function testIncrementalAuth() {
  const auth: IncrementalAuthorizationResponse = {
    authorization_id: "auth_123",
    amount: 15000,
    status: "success",
    previously_authorized_amount: 10000,
  };
  assertType<IncrementalAuthorizationResponse>(auth);
}

// ===== 41. ExternalAuthenticationDetailsResponse =====
function testExternalAuth() {
  const extAuth: ExternalAuthenticationDetailsResponse = {
    status: "success",
    authentication_flow: "decoupled",
    electronic_commerce_indicator: "05",
    ds_transaction_id: "ds_123",
    version: "2.2.0",
  };
  assertType<ExternalAuthenticationDetailsResponse>(extAuth);
}

// ===== 42. CustomerAcceptance and online details =====
function testCustomerAcceptance() {
  const onlineDetails: CustomerAcceptanceOnlineDetails = {
    user_agent: "Mozilla/5.0",
    ip_address: "192.168.1.1",
  };
  assertType<CustomerAcceptanceOnlineDetails>(onlineDetails);

  const acceptance: CustomerAcceptance = {
    acceptance_type: "online",
    accepted_at: "2026-04-07T12:00:00Z",
    online: onlineDetails,
  };
  assertType<CustomerAcceptance>(acceptance);

  // Offline type
  const offlineAcceptance: CustomerAcceptance = {
    acceptance_type: "offline",
    accepted_at: "2026-04-07T12:00:00Z",
  };
  assertType<CustomerAcceptance>(offlineAcceptance);
}

// Ensure all test functions are referenced to prevent unused warnings
void testLoadHyperWithString;
void testLoadHyperWithObject;
void testLoadHyperWithAllOptions;
void testLoadStripe;
void testHyperInstanceMethods;
void testElementCreateAllComponentTypes;
void testElementOtherMethods;
void testPaymentElementOnAllEvents;
void testPaymentElementMethods;
void testOnSDKHandleClick;
void testEventDataShape;
void testLoadOptionsFields;
void testHyperObject;
void testPaymentSessionChain;
void testAuthSessionChain;
void testClickToPaySession;
void testConfirmPaymentResponseFields;
void testConfirmPaymentErrorResponse;
void testRetrieveResponse;
void testConfirmPaymentInput;
void testElementsOptions;
void testAppearanceOptions;
void testAppearanceVariables;
void testAppearanceLiterals;
void testAppearanceRules;
void testLoaderOption;
void testFontOptions;
void testUpdateOptions;
void testAnalyticsData;
void testBrowserInfo;
void testCustomerDetails;
void testRefundResponse;
void testDisputeResponse;
void testPaymentAttempt;
void testCaptureResponse;
void testMandateTypes;
void testAddressTypes;
void testOrderDetails;
void testSurchargeDetails;
void testIncrementalAuth;
void testExternalAuth;
void testCustomerAcceptance;
