import React, { useState, useEffect } from "react";
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function Chart({ modifier }) {
  const { workouts } = useWorkoutContext()
  const [chartData, setChartData] = useState({
    labels,
    datasets: []
  })

  useEffect(() => {
    if (!workouts.length) return

    // Process workout data
    const processedData = workouts.reduce((acc, workout) => {
      const dayIndex = new Date(workout.createdAt).getDay()
      const exerciseName = workout.exercise[0].name

      if (!acc[exerciseName]) {
        acc[exerciseName] = {
          label: exerciseName,
          data: new Array(7).fill(0),
          backgroundColor: workout.exercise[0].color || '#2785c3',
          borderColor: 'rgb(255, 248, 248)',
          borderWidth: 1
        }
      }

      // Add workout time or count to the appropriate day
      acc[exerciseName].data[dayIndex] += workout.time || 1

      return acc
    }, {})

    // Convert processed data to chart format
    const datasets = Object.values(processedData)

    setChartData({
      labels,
      datasets
    })
  }, [workouts])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: { size: 14 }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.5)'
        },
        ticks: {
          color: '#ffffff'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.55)'
        },
        ticks: {
          color: '#ffffff'
        }
      }
    }
  }

  return (
    <div className="chart-wrapper">
      <div className="chart-container">
        <Bar
          data={chartData}
          options={options}
        />
      </div>
    </div>
  )
}

export default Chart;
