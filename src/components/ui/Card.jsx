const Card = ({ children, className = '', glow = false }) => {
  return (
    <div className={`glass rounded-2xl p-6 ${glow ? 'glow' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default Card