/** Project workspace entry: list owned projects and open the create-project modal. */
//import CreateProjectForm from "./Project/CreateProjectForm";
import ProjectList from "./Project/ProjectList";
import CreateProjectForm from "./Project/CreateProjectForm";
import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../components/Button";
const Projects = () => {
    const [formEnabled, setFormEnabled] = useState(false);

    return (
        <div>
            {formEnabled && (
                <CreateProjectForm onClose={() => setFormEnabled(false)} />
            )}
            <div className="flex flex-wrap gap-3 items-center">
              <h1 className="text-2xl md:text-3xl font-semibold">Projects</h1>
                <Button
                variant= "base"
                    className="flex items-center gap-3 ml-auto"
                    onClick={() => setFormEnabled(true)}
                >
                    <span className="hidden md:block pl-2">New Project{" "}</span>
                    <span className="inline-block bg-ghost-background p-1 rounded-full">
                        <Plus size={20} />
                    </span>{" "}
                </Button>
            </div>

            <ProjectList />
        </div>
    );
};

export default Projects;
