import fetch from 'node-fetch'

const TIME_INTERVAL = 1000
const NUM_OF_SIMULTANEOUS_REQ = 5
const NUM_OF_ATTEMPTS = 10

let attempt = 0

const fn = async () => {
  try {
    attempt += 1
    if (attempt === NUM_OF_ATTEMPTS) clearInterval(loop)
    const currentAttempt = attempt
    console.log('line 10: attempt # ', currentAttempt)
    const arr = new Array(NUM_OF_SIMULTANEOUS_REQ).fill()
    const promises = arr.map(() => {
      return fetch(
        'https://testnet.waxsweden.org/v1/history/get_key_accounts',
        {
          method: 'POST',
          body: '{"public_key":"PUB_K1_88VqmDmJJ9S23eNqdeWYf2zySxv3ckQrWBKy7EvVRCUuhEDJJt"}'
        }
      )
    })
    const responses = await Promise.all(promises)
    // console.log('line 26: responses - ', responses)
    const jsons = await Promise.all(responses.map(response => response.json()))
    console.log(`line 28: json - attempt #${currentAttempt} - `, jsons)
  } catch (e) {
    console.log('Catching error')
    console.log('line 31: e - ', e)
  }
}

const loop = setInterval(fn, TIME_INTERVAL)
