interface ICustomRadioButtonProps {
  caption?: string
  selected?: boolean
  onClick?: () => void
}

const CustomRadioButton: React.FC<ICustomRadioButtonProps> = ({ caption, selected, onClick }) => {
  const selectedClass = selected ? 'border-main-blue' : 'border-transparent';
  return (
    <div className="flex items-center w-full justify-between py-1">
      {
        caption
        ? <div> { caption } </div> 
        : null
      }
      <div className={`border-1 ${selectedClass} rounded-full bg-white h-4 w-4 flex items-center justify-center`} onClick={onClick}>
        {selected ? <div className="rounded-full bg-main-blue h-2 w-2" /> : null}
      </div>
    </div>
  )
};

export default CustomRadioButton;