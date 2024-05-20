
interface DockerStatusProps {
  id: string;
  error: boolean;
  status: string;
  os: string;
  version: string;
}

export function DockerStatus(props: DockerStatusProps) {
  return (
    <div className="w-full">
      <ul>
        <li className="text-sm flex gap-1 items-center">Status: {props.error ? (
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        ) : (
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        )}</li>
        {!props.error && (
          <li className="text-sm">OS: {props.os}</li>
        )}
        {!props.error && (
          <li className="text-sm">Version: {props.version}</li>
        )}
      </ul>
    </div>
  )
}