import './FeedbackState.css'

type EmptyStateProps = {
  message: string
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="feedback-card empty" role="status" aria-live="polite">
      <p>{message}</p>
    </div>
  )
}
