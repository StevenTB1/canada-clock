import { credits } from '@/lib/portfolio'

// Unsplash photos carry a credit to the photographer wherever they are shown.
export default function PhotoCredits() {
  return (
    <span>
      Photos on <a href="https://unsplash.com" className="underline">Unsplash</a> by{' '}
      {credits.map((p, i) => (
        <span key={p.user}>
          <a href={`https://unsplash.com/@${p.user}`} className="underline">{p.by}</a>
          {i < credits.length - 1 ? ', ' : ''}
        </span>
      ))}
    </span>
  )
}
