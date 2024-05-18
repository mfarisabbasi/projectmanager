import { IoIosAdd } from "react-icons/io";

const Workspaces = ({
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
      {workspaces?.map((workspace, index) => {
        return (
          <div
            key={index}
            className="bg-primary px-4 py-4 cursor-pointer rounded-lg mt-4"
            onClick={() => setSelectedWorkspace(workspace)}
          >
            <h4 className="text-white">{workspace.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Workspaces;
