import type { CSSProperties } from 'react'
import { images, type ImageSlug } from '../data/images.generated'

interface PhotoProps {
  slug: ImageSlug
  /** Rendered width hint for the browser's srcset choice. */
  sizes: string
  className?: string
  /** Decorative crops that repeat adjacent text get an empty alt. */
  decorative?: boolean
  eager?: boolean
  focus?: string
}

export function Photo({ slug, sizes, className, decorative = false, eager = false, focus }: PhotoProps) {
  const img = images[slug]
  const style = { '--photo-tone': img.tone, '--focus': focus ?? img.focus } as CSSProperties
  return (
    <span className={['photo', className].filter(Boolean).join(' ')} style={style}>
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={decorative ? '' : img.alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
      />
    </span>
  )
}
