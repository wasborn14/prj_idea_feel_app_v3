interface Props {
  width?: number
  height?: number
}

export const FrowningIcon = ({ width = 80, height = 80 }: Props) => {
  return (
    <svg id='Outline' width={width} height={height} viewBox='0 0 40 40'>
      <defs>
        <style dangerouslySetInnerHTML={{ __html: '\n      .cls-1 { fill: none; }\n    ' }} />
      </defs>
      <rect className='cls-1' width={width} height={height} />
      <path d='M20,36A16,16,0,1,1,36,20,16.01833,16.01833,0,0,1,20,36ZM20,6A14,14,0,1,0,34,20,14.01572,14.01572,0,0,0,20,6Z' />
      <path d='M25.61279,29a.9985.9985,0,0,1-.832-.44336,5.74818,5.74818,0,0,0-9.56152,0,1.00025,1.00025,0,0,1-1.66211-1.11328,7.74931,7.74931,0,0,1,12.88574,0A1.00022,1.00022,0,0,1,25.61279,29Z' />
      <circle cx='25.5' cy='17.5' r='1.5' />
      <circle cx='14.5' cy='17.5' r='1.5' />
    </svg>
  )
}
