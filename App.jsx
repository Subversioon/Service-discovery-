import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [serviceAInfo, setServiceAInfo] = useState(null)
  const [serviceBInfo, setServiceBInfo] = useState(null)
  const [serviceCInfo, setServiceCInfo] = useState(null)

  const fetchServiceInfo = async (service) => {
    try {
      const response = await axios.get(`http://localhost:3000/${service}/info`)
      return response.data
    } catch (error) {
      console.error(`Error fetching ${service} info:`, error)
      return null
    }
  }

  useEffect(() => {
    const fetchAllServices = async () => {
      const [aInfo, bInfo, cInfo] = await Promise.all([
        fetchServiceInfo("service-a"),
        fetchServiceInfo("service-b"),
        fetchServiceInfo("service-c"),
      ])
      setServiceAInfo(aInfo)
      setServiceBInfo(bInfo)
      setServiceCInfo(cInfo)
    }

    fetchAllServices()
    const interval = setInterval(fetchAllServices, 5000) // Refresh every 5 seconds

    return () => clearInterval(interval)
  }, [fetchServiceInfo]) // Added fetchServiceInfo to dependencies

  return (
    <div className="App">
      <h1>Service Discovery Demo</h1>
      <div className="card-container">
        <ServiceCard title="Service A" info={serviceAInfo} />
        <ServiceCard title="Service B" info={serviceBInfo} />
        <ServiceCard title="Service C" info={serviceCInfo} />
      </div>
    </div>
  )
}

function ServiceCard({ title, info }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {info ? (
        <>
          <p>Timestamp: {info.timestamp}</p>
          <p>Service: {info.service}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App

