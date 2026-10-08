// Official asset: the white dot-matrix ZOMZEY® wordmark (961 × 145 px, transparent), supplied
// by the client and kept unaltered in public/brand/. A 320px lossless resize of the same file
// serves the 138–158px header and footer on 1× and 2× screens. Used on navy only.
const LOGO_WIDTH = 961
const LOGO_HEIGHT = 145

export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      className={['brand-logo', className].filter(Boolean).join(' ')}
      src="/brand/zomzey-logo.webp"
      srcSet="/brand/zomzey-logo-320.webp 320w, /brand/zomzey-logo.webp 961w"
      sizes="(max-width: 1023px) 138px, 158px"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      alt="ZOMZEY"
      decoding="async"
    />
  )
}
