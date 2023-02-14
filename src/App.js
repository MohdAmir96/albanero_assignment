
import React from 'react'
import './App.css'
import Csv from './components/CsvUploader'
import ModalProvider from './context/ModalContext'
const CsvUploader = () => {
  return (
    <div>
      <ModalProvider>
        <Csv />
      </ModalProvider>
    </div>
  )
}

export default CsvUploader