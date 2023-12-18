export default async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init)
  const data = await response.json()
  if (response.ok) {
    return data
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data
  })
}

export class FetchError extends Error {
  response: Response
  data: {
    message: string
  }
  constructor({
    message,
    response,
    data
  }: {
    message: string
    response: Response
    data: {
      message: string
    }
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = 'FetchError'
    this.response = response
    this.data = data ?? { message: message }
  }
}

export const fetcher = (region: string, databaseId: string) => async (url: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      databaseId,
      region
    })
  })

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }

  return response.json()
}
