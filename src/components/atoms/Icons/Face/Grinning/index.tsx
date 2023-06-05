interface Props {
  width?: number
  height?: number
}

export const GrinningIcon = ({ width = 80, height = 80 }: Props) => {
  return (
    <svg id='Outline' width={width} height={height} viewBox='0 0 40 40'>
      <defs>
        <style dangerouslySetInnerHTML={{ __html: '\n      .cls-1 { fill: none; }\n    ' }} />
      </defs>
      <rect className='cls-1' width={width} height={height} />
      <path d='M20,36A16,16,0,1,1,36,20,16.01833,16.01833,0,0,1,20,36ZM20,6A14,14,0,1,0,34,20,14.01572,14.01572,0,0,0,20,6Z' />
      <path d='M20,30a7.15683,7.15683,0,0,1-6.98047-5.80371A1,1,0,0,1,14,23H26a1,1,0,0,1,.98047,1.19629A7.15683,7.15683,0,0,1,20,30Zm-4.59766-5a5.02982,5.02982,0,0,0,9.20411,0Z' />
      <circle cx='25.5' cy='17.5' r='1.5' />
      <circle cx='14.5' cy='17.5' r='1.5' />
    </svg>
  )
}
