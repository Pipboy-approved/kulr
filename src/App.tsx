import { FC } from 'react'

const App: FC = () => {
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
            <td id="year">Year high / low<br /><span className="highlight">-- / --</span></td>
            <td id="market">Market cap<br /><span className="highlight">--</span></td>
            <td id="earnings">Earnings<br /><span className="highlight">--</span></td>
          </tr>
          <tr>
            <td id="high">Today's high<br /><span className="highlight">--</span></td>
            <td id="current">Current price<br /><span className="highlight">--</span></td>
            <td id="low">Today's low<br /><span className="highlight">--</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App 