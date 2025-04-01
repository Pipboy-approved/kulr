import { FC, useState, useEffect } from 'react'

interface StockData {
  currentPrice: string;
  yearHigh: string;
  yearLow: string;
  marketCap: string;
  earnings: string;
  todayHigh: string;
  todayLow: string;
}

const App: FC = () => {
  const [stockData, setStockData] = useState<StockData>({
    currentPrice: '--',
    yearHigh: '--',
    yearLow: '--',
    marketCap: '--',
    earnings: '--',
    todayHigh: '--',
    todayLow: '--'
  })

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('/api/market-activity/stocks/kulr')
        const text = await response.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')

        // Extract all required data using appropriate selectors
        const currentPriceEl = doc.querySelector('.quote-info-val')
        const yearHighLowEl = doc.querySelector('[data-label="52 Week Range"]')
        const marketCapEl = doc.querySelector('[data-label="Market Cap"]')
        const earningsEl = doc.querySelector('[data-label="EPS"]')
        const todayHighEl = doc.querySelector('[data-label="Today\'s High"]')
        const todayLowEl = doc.querySelector('[data-label="Today\'s Low"]')

        // Update state with all fetched data
        setStockData({
          currentPrice: currentPriceEl?.textContent?.trim() || '--',
          yearHigh: yearHighLowEl?.textContent?.split('-')[1]?.trim() || '--',
          yearLow: yearHighLowEl?.textContent?.split('-')[0]?.trim() || '--',
          marketCap: marketCapEl?.textContent?.trim() || '--',
          earnings: earningsEl?.textContent?.trim() || '--',
          todayHigh: todayHighEl?.textContent?.trim() || '--',
          todayLow: todayLowEl?.textContent?.trim() || '--'
        })
      } catch (error) {
        console.error('Error fetching stock data:', error)
      }
    }

    fetchStockData()
    const interval = setInterval(fetchStockData, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app">
      <div id="chart">--</div>
      <table id="data">
        <tbody>
          <tr>
            <td id="exchange">Exchange<br /><span className="highlight">AMEX</span></td>
            <td id="sector">Sector<br /><span className="highlight">Technology</span></td>
            <td id="industry">Industry<br /><span className="highlight">Electrical products</span></td>
          </tr>
          <tr>
            <td id="year">Year high / low<br /><span className="highlight">{stockData.yearHigh} / {stockData.yearLow}</span></td>
            <td id="market">Market cap<br /><span className="highlight">{stockData.marketCap}</span></td>
            <td id="earnings">Earnings<br /><span className="highlight">{stockData.earnings}</span></td>
          </tr>
          <tr>
            <td id="high">Today's high<br /><span className="highlight">{stockData.todayHigh}</span></td>
            <td id="current">Current price<br /><span className="highlight">{stockData.currentPrice}</span></td>
            <td id="low">Today's low<br /><span className="highlight">{stockData.todayLow}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App 