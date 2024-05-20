
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface DockerContainersProps {
  data: {
    ID: string
    Names: string
    Image: string
  }[]
}

export function DockerContainers({ data }: DockerContainersProps) {
  return (
    <div className="mt-5 w-auto">
      <h1 className="text-zinc-400">Containers avaliable:</h1>

      <ul className="grid gap-2 grid-cols-4 mt-5">
        {data.map(container => (
          <li key={container.ID}>
            <Card className="w-[200px] h-[150px]">
              <CardHeader>
                <CardTitle className="text-base">{container.Names}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{container.Image}</p>
              </CardContent>
              {/* <CardFooter className="flex justify-between">
                <Button>Backup</Button>
              </CardFooter> */}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}