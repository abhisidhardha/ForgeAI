const colorOptions = {
    blue:   { text: "text-[#005eff]", border: "border-[rgba(0,94,255,0.3)]" },
    gray:   { text: "text-[#8290a3]", border: "border-[rgba(111,123,138,0.4)]" },
    yellow: { text: "text-[#eab308]", border: "border-[rgba(234,179,8,0.3)]" },
    indigo: { text: "text-[#6366f1]", border: "border-[rgba(99,102,241,0.4)]" },
    green:  { text: "text-[#00c822]", border: "border-[rgba(0,200,34,0.3)]" },
};

const StatCard = ({ title, value, icon: Icon, color = "blue" }) => {
    const { text, border } = colorOptions[color];
    return (
        <div className={`p-5 h-full min-w-0 relative overflow-hidden rounded-3xl flex flex-col gap-3 shadow-card bg-background border-3 ${border}`}>
            <div className="flex items-center justify-between min-w-0">
                <h1 className={`text-lg xl:text-xl font-bold tracking-tight ${text}`}>{title}</h1>

                {Icon && (
                    <div className={`aspect-square p-2 border-2 rounded-full flex items-center justify-center ${text} ${border}`}>
                        <Icon />
                    </div>
                )}
            </div>

            <p className={`text-3xl font-semibold tracking-tight ${text}`}>
                {value ?? 0}
            </p>
        </div>
    );
};

export default StatCard;
