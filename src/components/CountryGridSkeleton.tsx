import './CountryGrid.css'
import './CountryGridSkeleton.css'

const SKELETON_COUNT = 8

export const CountryGridSkeleton = () => {
  return (
    <section className="country-grid" aria-label="Loading country cards">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div className="skeleton-card" key={`skeleton-card-${index}`}>
          <div className="skeleton-flag" />
          <div className="skeleton-line title" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      ))}
    </section>
  )
}
