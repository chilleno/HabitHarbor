const InputText: React.FC<{ id?: string, name?: string, value?: string, defaultValue?: string, className?: string, placeholder?: string, onClick?: () => void, onKeyDown?, hidden?: boolean, onChange: (value: string) => void }> = ({ id,name, className, placeholder, onClick, onChange, onKeyDown, hidden, value, defaultValue }) => {
    return (
        <input
            type="text"
            name={name}
            id={id}
            value={value}
            defaultValue={value}
            hidden={hidden}
            onClick={onClick}
            placeholder={placeholder}
            className={`w-full h-[32px] text-start py-3 px-8 rounded-3xl bg-main-primary border-main-primary placeholder:italic text-white ${className}`}
            onFocus={(e) => e.target.select()}
            onKeyDown={onKeyDown}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default InputText;