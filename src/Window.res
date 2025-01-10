type window
type parent
type domElement
type body
type event = {data: JSON.t}

@val external window: window = "window"

@val @scope("window")
external addEventListener: (string, _ => unit) => unit = "addEventListener"

@val @scope("document")
external querySelectorAll: string => array<Dom.element> = "querySelectorAll"

@val @scope("document")
external createElement: string => Dom.element = "createElement"

@val @scope("document")
external body: body = "body"

@send external appendChild: (body, Dom.element) => unit = "appendChild"
@set external src: (Dom.element, string) => unit = "src"

@set external onload: (Dom.element, unit => unit) => unit = "onload"
@set external onerror: (Dom.element, exn => unit) => unit = "onerror"
