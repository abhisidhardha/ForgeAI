/** Task workspace within a project details route; child components read its projectId. */
import CreateNewTaskForm from "./Task/CreateNewTaskForm"
import TaskList from "./Task/TaskList"
import Button from "../components/Button";
import { Plus } from "lucide-react";
import { useState } from "react";
const Tasks = () => {
  const [formEnabled,setFormEnabled] = useState(false);

  return (
    <div>
        {formEnabled && <CreateNewTaskForm onClose={() => setFormEnabled(false)}/>}
          <div className="flex flex-wrap gap-3 items-center pb-2">
              <h1 className="text-2xl md:text-3xl font-semibold">Tasks</h1>
                <Button
                  variant="base"
                    className="flex items-center gap-3 ml-auto"
                    onClick={() => setFormEnabled(true)}
                >
                    <span className="hidden md:block pl-2">New Task{" "}</span>
                    <span className="inline-block bg-ghost-background p-1 rounded-full">
                        <Plus size={20} />
                    </span>{" "}
                </Button>
            </div>
        <TaskList/>
    </div>
  )
}

export default Tasks
