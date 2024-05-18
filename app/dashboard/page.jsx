"use client";
import MainButton from "@/components/common/MainButton";
import NewWorkspace from "@/components/dashboard/workspace/NewWorkspace";
import Workspaces from "@/components/dashboard/workspace/Workspaces";
import { workspaceStore } from "@/store/store";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [showNewWorkspace, setShowNewWorkspace] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(undefined);

  const workspaces = workspaceStore((state) => state.workspaces);
  const setWorkspaces = workspaceStore((state) => state.setWorkspaces);

  async function fetchWorkspaces() {
    const response = await fetch("/api/workspaces/", {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      if (data.statusText !== "No Workspace Found") {
        setWorkspaces(data);
      }
    }
  }

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <section className="flex h-[700px] w-full">
      <Workspaces
        workspaces={workspaces}
        showNewWorkspace={showNewWorkspace}
        setShowNewWorkspace={setShowNewWorkspace}
        setSelectedWorkspace={setSelectedWorkspace}
        selectedWorkspace={selectedWorkspace}
      />
      <div className="bg-gray-100 p-4 h-full w-full rounded-lg ml-4">
        {selectedWorkspace ? (
          <h2>{selectedWorkspace.name} Workboard</h2>
        ) : (
          <h2>Workboard</h2>
        )}
        {/* if user doesn't have any workspace and showNewWorkspace is false */}
        {workspaces == undefined && !showNewWorkspace ? (
          <div className="h-3/4 flex flex-col gap-4 justify-center items-center">
            <h3>Create your first Workspace</h3>
            <MainButton
              onClick={() => setShowNewWorkspace(!showNewWorkspace)}
              type="button"
              label="Create Workspace"
            />
          </div>
        ) : //  if user selected a workspace and showNewWorkspace is false
        selectedWorkspace && !showNewWorkspace ? (
          <div className="h-3/4 flex flex-col gap-4 justify-center items-center">
            <h3>{selectedWorkspace.name}</h3>
          </div>
        ) : //  if user didn't select a workspace and showNewWorkspace is false
        !selectedWorkspace && !showNewWorkspace ? (
          <div className="h-3/4 flex flex-col gap-4 justify-center items-center">
            <h3>Select a workspace</h3>
          </div>
        ) : null}
        {showNewWorkspace && (
          <NewWorkspace
            setShowNewWorkspace={setShowNewWorkspace}
            fetchWorkspaces={fetchWorkspaces}
          />
        )}
      </div>
    </section>
  );
};

export default Dashboard;
