import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function TemperatureChart({ readings }) {
  if (readings.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-amber-500 text-sm bg-amber-50 rounded-lg border border-amber-200">
        No temperature readings yet
      </div>
    )
  }

  const data = readings.map(r => ({
    day: r.day,
    temp: r.temp,
    timestamp: r.timestamp,
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d3" />
          <XAxis
            dataKey="day"
            tickFormatter={(d) => `Day ${d}`}
            tick={{ fontSize: 11, fill: '#92400e' }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={['dataMin - 2', 'dataMax + 2']}
            tick={{ fontSize: 11, fill: '#92400e' }}
            unit="°C"
          />
          <Tooltip
            labelFormatter={(d) => `Day ${d}`}
            formatter={(value) => [`${value} °C`, 'Temperature']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #d97706', fontSize: '13px' }}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#b45309"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#b45309' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
