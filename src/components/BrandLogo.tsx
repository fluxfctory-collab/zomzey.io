// Official asset: the white dotted ZOMZEY wordmark (961 × 145 px, transparent PNG) from
// https://zomzey.io/wp-content/uploads/2026/05/new99.png — used unaltered, on navy only.
const LOGO_WIDTH = 961
const LOGO_HEIGHT = 145

export function BrandLogo({ className }: { className?: string }) {
  if (__HAS_OFFICIAL_LOGO__) {
    return (
      <img
        className={['brand-logo', className].filter(Boolean).join(' ')}
        src="/brand/zomzey-logo.png"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        alt="ZOMZEY"
      />
    )
  }
  // The official file could not be fetched in this build environment. Rather than invent
  // or retype a mark, reserve its exact proportions and say what belongs here.
  return (
    <span className={['brand-logo', 'brand-logo--slot', className].filter(Boolean).join(' ')} role="img" aria-label="ZOMZEY">
      <span aria-hidden="true">Official logo file</span>
    </span>
  )
}
