open Types

let loadHyper = (hyperObject: JSON.t, option: option<JSON.t>) => {
  let str = switch hyperObject->JSON.Classify.classify {
  | String(val) => val
  | Object(json) =>
    json
    ->Dict.get("publishableKey")
    ->Option.flatMap(JSON.Decode.string)
    ->Option.getOr("")
  | _ => ""
  }
  Promise.make((resolve, reject) => {
    let sessionID = generateSessionID()
    let timeStamp = Date.now()
    let scriptURL = switch getEnv(option) {
    | "SANDBOX" => "https://beta.hyperswitch.io/v1/HyperLoader.js"
    | "PROD" => "https://checkout.hyperswitch.io/v0/HyperLoader.js"
    | _ =>
      str->String.startsWith("pk_prd_")
        ? "https://checkout.hyperswitch.io/v0/HyperLoader.js"
        : "https://beta.hyperswitch.io/v1/HyperLoader.js"
    }
    let analyticsObj =
      [
        ("sessionID", sessionID->JSON.Encode.string),
        ("timeStamp", timeStamp->Float.toString->JSON.Encode.string),
      ]
      ->Dict.fromArray
      ->JSON.Encode.object
    if Window.querySelectorAll(`script[src="${scriptURL}"]`)->Array.length === 0 {
      let script = Window.createElement("script")
      script->Window.src(scriptURL)
      script->Window.onload(() => {
        switch HyperJs.hyperInstance->Nullable.toOption {
        | Some(instance) => resolve(instance(hyperObject, option, analyticsObj))
        | None => ()
        }
      })
      script->Window.onerror(err => {
        reject(err)
      })
      Window.body->Window.appendChild(script)
    } else {
      Console.warn(
        `INTEGRATION WARNING: There is already an existing script tag for ${scriptURL}. Multiple additions of HyperLoader.js is not permitted, please add it on the top level only once.`,
      )
      switch HyperJs.hyperInstance->Nullable.toOption {
      | Some(instance) => resolve(instance(hyperObject, option, analyticsObj))
      | None => ()
      }
    }
  })
}

let loadStripe = (str, option) => {
  Console.warn("loadStripe is deprecated. Please use loadHyper instead.")
  loadHyper(str, option)
}
