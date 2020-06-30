export default function formatWeatherParam (value, symbol = '') {
  return `${value.toFixed(1)} ${symbol}`
}
