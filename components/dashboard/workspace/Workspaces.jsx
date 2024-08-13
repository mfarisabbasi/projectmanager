import { IoIosAdd } from "react-icons/io";
import { ScrollArea } from "@/components/ui/scroll-area";

const Workspaces = ({
  selectedWorkspace,
  setSelectedWorkspace,
  setShowNewWorkspace,
  showNewWorkspace,
  workspaces,
}) => {
  return (
    <div className="bg-gray-100 p-4 h-full w-1/3 rounded-lg">
      <div className="flex items-center justify-between">
        <h2>Workspaces</h2>
        <IoIosAdd
          size={24}
          className="cursor-pointer"
          onClick={() => {
            setSelectedWorkspace(undefined);
            setShowNewWorkspace(!showNewWorkspace);
          }}
        />
      </div>
      <ScrollArea className="h-[600px]">
        {workspaces?.map((workspace, index) => {
          return (
            <div
              key={index}
              className={`${
                selectedWorkspace?._id === workspace?._id
                  ? "bg-primary"
                  : "bg-zinc-200"
              } px-4 py-2 cursor-pointer rounded-md mt-4 transition duration-300`}
              onClick={() => setSelectedWorkspace(workspace)}
            >
              <h4
                className={`${
                  selectedWorkspace?._id === workspace?._id
                    ? "text-white"
                    : "text-primary"
                }`}
              >
                {workspace.name}
              </h4>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default Workspaces;
