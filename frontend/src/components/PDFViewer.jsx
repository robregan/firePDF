// src/components/PDFViewer.js

import React, { useState, useEffect } from 'react'
import { Document, Page } from 'react-pdf'

const PDFViewer = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth * 0.8)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={width}
          />
        ))}
      </Document>
    </div>
  )
}

export default PDFViewer
