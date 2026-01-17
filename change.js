const axios = require('axios')

const outfitids = [ // put ids here seperated by commas, no limit (to get outfitids get the avis bot on supers.lol/avis and use the /outfits username command to see outfit ids, ur inventory must be public to view outfits)
  id, id, id
]
const interval = 1000 // set to value in miliseconds between outfit changes, 1000 ms = 1 second so if u want 3 seconds u put 3000
const cookie = ".ROBLOSECURITY=inputcookie" // replace inputcookie with ur roblosecurity cookie, Dont share it..

// dont touch anything below this or u risk breaking it

let csrftoken = "" 
let outfits = [] 
let index = 0 

async function post(url, body, retries = 0) {
  try {
    const r = await axios.post(url, body, {
      headers: {
        "content-type": "application/json",
        "x-csrf-token": csrftoken,
        "cookie": cookie
      }
    })
    return r
  } catch (e) {
    if (e.response && e.response.status === 403) {
      csrftoken = e.response.headers["x-csrf-token"]
      throw new Error("csrf refreshed")
    }
    if (e.response && e.response.status >= 500 && e.response.status <= 599 && retries < 3) {
      await new Promise(resolve => setTimeout(resolve, 500))
      return await post(url, body, retries + 1)
    }
    throw e
  }
}

async function load() {
  for (const id of outfitids) {
    try {
      const r = await axios.get(
        `https://avatar.roblox.com/v3/outfits/${id}/details`,
        { headers: { "cookie": cookie } }
      )
      outfits.push(r.data)
    } catch {}
  }
}

async function apply(o) {
  async function go(url, body) {
    try {
      return await post(url, body)
    } catch (e) {
      if (e.message === "csrf refreshed") {
        return await post(url, body)
      }
      throw e
    }
  }

  try {
    await go(
      "https://avatar.roblox.com/v2/avatar/set-body-colors",
      o.bodyColor3s
    )
  } catch {}
  
  try {
    await go(
      "https://avatar.roblox.com/v1/avatar/set-player-avatar-type",
      { playerAvatarType: o.playerAvatarType }
    )
  } catch {}
  
  try {
    await go(
      "https://avatar.roblox.com/v1/avatar/set-scales",
      o.scale
    )
  } catch {}
  
  try {
    await go(
      "https://avatar.roblox.com/v2/avatar/set-wearing-assets",
      { assets: o.assets }
    )
  } catch {}
}

function loop() {
  setInterval(async () => {
    const o = outfits[index]
    index = (index + 1) % outfits.length
    if (!o) return
    try {
      await apply(o)
    } catch {}
  }, interval)
}

;(async () => {
  await load()
  loop()
})()
