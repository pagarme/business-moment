type Country = 'brazil'

type Options = {
  cacheLifetime?: number,
  source?: string,
  staticPath?: string,
  httpBase?: string,
}

type DateData = {
  date: string,
  description: string,
  holiday: boolean,
  limited_financial_operation: boolean,
}

export function configure(options: Options): void
export function queryDateInformation(country: Country, date: Date, options?: Options): DateData
export function isBusinessDay(country: Country, date: Date, options?: Options): Promise<boolean>
export function nextBusinessDay(country: Country, date: Date, options?: Options): Promise<Date>
