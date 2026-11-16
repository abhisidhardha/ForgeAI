import { Link } from "react-router-dom";
import Button from "../../components/Button";
const Landing = () => {
    return (
        <div className="flex flex-col w-screen h-full justify-center items-center relative">
            <div className="dotted-background landing-dots animate-[dot-sweep_4s_linear_infinite]" />
            <div className="flex flex-col items-center gap-4">

                <div className="overflow-hidden  p-3">
                    <h1 className="text-9xl font-bold tracking-tight animate-[intro_1s_ease-in-out_forwards]">
                        Forge<span className="text-blue-500">.ai</span>
                    </h1>
                </div>

                <div className="overflow-hidden  p-3">
                    <p className="text-3xl font-medium text-center opacity-0 animate-[intro_1s_ease-in-out_1s_forwards]">
                        Manage projects.
                        <br />
                        Move ideas into action.
                    </p>
                </div>

            </div>
            <Link to="/login" className="mt-4 z-10"><Button>Get Started</Button></Link>
        </div>
    );
};

export default Landing;
