// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DockerStatus } from "./components/docker-status";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { RotateCcw } from "lucide-react";
import { DockerContainers } from "./components/docker-containers";


function App() {

  const [dockerStatus, setDockerStatus] = useState<any>({
    error: true,
    refreshing: true
  })

  const [dockerContainers, setDockerContainers] = useState([])
  
  async function CheckHealthDocker() {
    setDockerStatus({
      error: true,
      refreshing: false
    })

    const result = await invoke("check_docker_status")

    if(result === "Docker not available") {
      setDockerStatus({
        error: true,
        refreshing: false
      })
    } else {

      const status = JSON.parse(JSON.parse(result as string))

      setDockerStatus({
        error: status.ID === "" ? true : false,
        refreshing: false,
        ...status
      })

      await GetContainersDocker()
    }
  }

  async function GetContainersDocker() {

    const result = await invoke("get_containers_docker")

    if(result === "Docker not available") {

    } else {
      const data = JSON.parse(JSON.parse(result as string))
      console.log(data)
      setDockerContainers(data)
    }
  }

  useEffect(() => {
    CheckHealthDocker()
  }, [])

  return (
    <div className="w-full h-full p-4">
      <Tabs defaultValue="local">
        <TabsList>
          <TabsTrigger value="local">Local</TabsTrigger>
          <TabsTrigger value="external">Externo</TabsTrigger>
        </TabsList>
        <TabsContent value="local">

          <div className="flex gap-1">
            <h1 className="text-zinc-400 text-base mb-2">Docker status: </h1>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={CheckHealthDocker}><RotateCcw size={10} /></Button>
          </div>

          {!dockerStatus.refreshing && (
            <DockerStatus id={dockerStatus.ID} error={dockerStatus.error} os={dockerStatus?.ClientInfo?.Os} status="" version={dockerStatus.ServerVersion} />
          )}

          {!dockerStatus.refreshing && !dockerStatus.error && (
            <DockerContainers data={dockerContainers as []} />
          )}

        </TabsContent>
        <TabsContent value="external">
          <p>In development</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
