type eventData = {
  iframeMounted: bool,
  focusTriggered: bool,
  blurTriggered: bool,
  clickTriggered: bool,
  elementType: string,
  classChange: bool,
  newClassType: string,
}
type event = {key: string, data: eventData}
type eventParam = Event(event) | EventData(eventData) | Empty
type eventHandler = eventParam => unit

module This = {
  type t
  @get
  external iframeElem: t => option<Nullable.t<Dom.element>> = "iframeElem"
}

type paymentElement = {
  on: (string, eventParam => unit) => unit,
  collapse: unit => unit,
  blur: unit => unit,
  update: JSON.t => unit,
  destroy: unit => unit,
  unmount: unit => unit,
  mount: string => unit,
  focus: unit => unit,
  clear: unit => unit,
}

type element = {
  getElement: string => option<paymentElement>,
  update: JSON.t => unit,
  fetchUpdates: unit => Promise.t<JSON.t>,
  create: (string, JSON.t) => paymentElement,
}

type confirmParams = {return_url: string}

type confirmPaymentParams = {
  elements: JSON.t,
  confirmParams: Nullable.t<confirmParams>,
}
type hyperInstance = {
  confirmPayment: JSON.t => Promise.t<JSON.t>,
  elements: JSON.t => element,
  confirmCardPayment: (string, option<JSON.t>, option<JSON.t>) => Promise.t<JSON.t>,
  retrievePaymentIntent: string => Promise.t<JSON.t>,
  widgets: JSON.t => element,
  paymentRequest: JSON.t => JSON.t,
  completeUpdateIntent: string => promise<JSON.t>,
  initiateUpdateIntent: unit => promise<JSON.t>,
}
type hyperInstanceMake = (JSON.t, option<JSON.t>, JSON.t) => hyperInstance

let confirmPaymentFn = (_elements: JSON.t) => {
  Promise.resolve(Dict.make()->JSON.Encode.object)
}
let confirmCardPaymentFn = (
  _clientSecretId: string,
  _data: option<JSON.t>,
  _options: option<JSON.t>,
) => {
  Promise.resolve(Dict.make()->JSON.Encode.object)
}

let retrievePaymentIntentFn = _paymentIntentId => {
  Promise.resolve(Dict.make()->JSON.Encode.object)
}
let update = _options => {
  ()
}

let getElement = _componentName => {
  None
}

let fetchUpdates = () => {
  //add API call
  Promise.make((resolve, _) => {
    setTimeout(() => resolve(Dict.make()->JSON.Encode.object), 1000)->ignore
  })
}
let defaultPaymentElement = {
  on: (_str, _func) => (),
  collapse: () => (),
  blur: () => (),
  update: _x => (),
  destroy: () => (),
  unmount: () => (),
  mount: _string => (),
  focus: () => (),
  clear: () => (),
}

let create = (_componentType, _options) => {
  defaultPaymentElement
}

let emptyElement = {
  getElement,
  update,
  fetchUpdates,
  create,
}
let emptyHyperInstance = {
  confirmPayment: confirmPaymentFn,
  confirmCardPayment: confirmCardPaymentFn,
  retrievePaymentIntent: retrievePaymentIntentFn,
  elements: _ev => emptyElement,
  widgets: _ev => emptyElement,
  paymentRequest: _ev => JSON.Encode.null,
  completeUpdateIntent: _ => Promise.resolve(Dict.make()->JSON.Encode.object),
  initiateUpdateIntent: _ => Promise.resolve(Dict.make()->JSON.Encode.object),
}

type eventType = Escape | Change | Click | Ready | Focus | Blur | None

let eventTypeMapper = event => {
  switch event {
  | "escape" => Escape
  | "change" => Change
  | "click" => Click
  | "ready" => Ready
  | "focus" => Focus
  | "blur" => Blur
  | _ => None
  }
}

let generateSessionID = () => {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  Belt.Array.make(32, 0)->Array.reduce("", (acc, _) => {
    let charIndex = Math.Int.random(0, chars->String.length)
    let newChar = chars->String.charAt(charIndex)
    acc ++ newChar
  })
}

let getEnv = option => {
  let dict = switch option {
  | Some(json) => json->JSON.Decode.object->Option.getOr(Dict.make())
  | None => Dict.make()
  }
  switch dict->Dict.get("env") {
  | Some(val) =>
    switch val->JSON.Decode.string {
    | Some(str) => str
    | None => ""
    }
  | None => ""
  }
}

module HyperJs = {
  @val @scope("window")
  external hyperInstance: Nullable.t<hyperInstanceMake> = "Hyper"
}
