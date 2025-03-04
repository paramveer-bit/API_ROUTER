import { Badge } from "@/components/ui/badge"

interface RoutePreviewProps {
  path: string
  parameters: {
    id: number
    name: string
    type: string
    required: boolean
  }[]
  requiresAuth: boolean
}

export function RoutePreview({ path, parameters, requiresAuth }: RoutePreviewProps) {
  const formattedPath = path ? `/api/${path}` : "/api/[route]"

  // Extract parameter names from the path
  const pathParams = path.match(/\[(.*?)\]/g)?.map((param) => param.replace(/[[\]]/g, "")) || []

  // Find defined parameters that match path parameters
  const matchedParams = parameters.filter((param) => pathParams.includes(param.name))

  // Find query parameters (those not in the path)
  const queryParams = parameters.filter((param) => !pathParams.includes(param.name))

  return (
    <div className="space-y-4">
      <div className="space-y-2">

        <div className="rounded-md bg-muted p-2 font-mono text-sm">{formattedPath}</div>
      </div>

      {requiresAuth && (
        <div className="rounded-md bg-yellow-100 p-2 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
          <p className="font-medium">Authentication Required</p>
          <p>This endpoint requires authentication</p>
        </div>
      )}

      {(pathParams.length > 0 || queryParams.length > 0) && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Parameters</h4>

          {pathParams.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Path Parameters:</p>
              <ul className="text-xs space-y-1">
                {pathParams.map((param) => {
                  const matchedParam = matchedParams.find((p) => p.name === param)
                  return (
                    <li key={param} className="flex items-center gap-2">
                      <span className="font-mono">{param}</span>
                      {matchedParam && (
                        <>
                          <span className="text-muted-foreground">({matchedParam.type})</span>
                          {matchedParam.required && (
                            <Badge variant="outline" className="text-[10px] h-4">
                              required
                            </Badge>
                          )}
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {queryParams.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Query Parameters:</p>
              <ul className="text-xs space-y-1">
                {queryParams.map((param) => (
                  <li key={param.id} className="flex items-center gap-2">
                    <span className="font-mono">{param.name}</span>
                    <span className="text-muted-foreground">({param.type})</span>
                    {param.required && (
                      <Badge variant="outline" className="text-[10px] h-4">
                        required
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="pt-2">
        <h4 className="text-sm font-medium mb-2">Example Request</h4>
        <div className="rounded-md bg-zinc-950 p-3 font-mono text-xs text-zinc-100 overflow-x-auto">
          <pre>
            {`fetch("${formattedPath.replace(/\[(.*?)\]/g, "123")}${queryParams.length > 0 ? `?${queryParams.map((p) => `${p.name}=${p.type === "string" ? "value" : "123"}`).join("&")}` : ""}", {
  method: "$",${
    requiresAuth
      ? `
  headers: {
    "Authorization": "Bearer YOUR_TOKEN"
  },`
      : ""
  }${
    `
  body: JSON.stringify({
    // request body
  })`
  }
})`}
          </pre>
        </div>
      </div>
    </div>
  )
}

