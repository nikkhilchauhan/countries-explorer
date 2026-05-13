import './FeedbackState.css'

type ErrorStateProps = {
  message: string
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <div className="feedback-card error" role="alert" aria-live="assertive">
      <p>{message}</p>
    </div>
  )
}
