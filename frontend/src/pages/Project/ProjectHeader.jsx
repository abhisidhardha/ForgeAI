const ProjectHeader = ({ project , children }) => {
    const {name , description } = project ;
    return (
        <>
            <div className="bg-card relative z-10 rounded-xl p-5 border-card flex flex-col gap-5">
                <h1 className="text-lg lg:text-xl font-medium">{name}</h1>
                {description && <p className="text-sm lg:text-md line-clamp-2">{description}</p>}
            </div>
            {
                children &&
                <div>
                    {children}
                </div>
            }
        </>
    );
};

export default ProjectHeader;
