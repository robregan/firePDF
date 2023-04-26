import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import PDFViewer from '../components/PDFViewer'
import { toggleSelectedPdf } from '../features/pdfs/pdfSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  const selectedPdf = useSelector((state) => state.pdf.selectedPdf)

  const pdfFiles = [
    { name: 'pms-311-13.pdf', path: '/pdfs/pms-311-13.pdf' },
    { name: 'pms-311-45.pdf', path: '/pdfs/pms-311-45.pdf' },
  ]

  const handlePdfClick = (pdfPath) => {
    dispatch(toggleSelectedPdf(pdfPath))
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Tasks Dashboard</p>
      </section>

      <div>
        <ul>
          {pdfFiles.map((pdf, index) => (
            <li key={index}>
              <button onClick={() => handlePdfClick(pdf.path)}>
                {pdf.name}
              </button>
            </li>
          ))}
        </ul>

        {selectedPdf && <PDFViewer pdfFile={selectedPdf} />}
      </div>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have no taskbooks</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
