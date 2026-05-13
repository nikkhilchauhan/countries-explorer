export type CountryApiResponse = {
  flags?: {
    png?: string
    svg?: string
    alt?: string
  }
  name?: {
    common?: string
    official?: string
  }
  capital?: string[]
  population?: number
  currencies?: Record<
    string,
    {
      name?: string
      symbol?: string
    }
  >
  currency?: Record<
    string,
    {
      name?: string
      symbol?: string
    }
  >
  languages?: Record<string, string>
}

export type Country = {
  name: string
  capital: string
  population: number
  currency: string
  languages: string
  flagUrl: string
  flagAlt: string
}
