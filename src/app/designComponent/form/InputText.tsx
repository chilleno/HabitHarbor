const InputText: React.FC<{ id?: string, value?: string, className?: string, placeholder?: string, onClick?: () => void, onKeyDown?, hidden?: boolean, onChange: (value: string) => void }> = ({ id, className, placeholder, onClick, onChange, onKeyDown, hidden, value }) => {
    return (
        <input
            type="text"
            id={id}
            value={value}
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