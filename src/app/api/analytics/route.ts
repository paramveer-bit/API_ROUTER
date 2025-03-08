import { type NextRequest, NextResponse } from "next/server"

// This would typically connect to your database or analytics service
// For demo purposes, we're generating mock data
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const timeRange = searchParams.get("timeRange") || "7d"
    const selectedRoute = searchParams.get("route") || "/api/users"

    // Generate mock data based on the time range and selected route
    const data = generateMockData(timeRange, selectedRoute)

    return NextResponse.json(data)
}

function generateMockData(timeRange: string, selectedRoute: string) {
    // Number of data points based on time range
    let dataPoints: number
    let format: string

    switch (timeRange) {
        case "24h":
            dataPoints = 24
            format = "hourly"
            break
        case "7d":
            dataPoints = 7
            format = "daily"
            break
        case "30d":
            dataPoints = 30
            format = "daily"
            break
        case "90d":
            dataPoints = 12 // Weekly data points for 90 days
            format = "weekly"
            break
        default:
            dataPoints = 7
            format = "daily"
    }

    // Available routes
    const availableRoutes = [
        "/api/users",
        "/api/products",
        "/api/orders",
        "/api/auth",
        "/api/search",
        "/api/payments",
        "/api/analytics",
    ]

    // Generate usage data
    const usageData = Array.from({ length: dataPoints }, (_, i) => {
        const date = new Date()

        if (format === "hourly") {
            date.setHours(date.getHours() - (dataPoints - i - 1))
        } else if (format === "daily") {
            date.setDate(date.getDate() - (dataPoints - i - 1))
        } else if (format === "weekly") {
            date.setDate(date.getDate() - (dataPoints - i - 1) * 7)
        }

        return {
            timestamp: date.toISOString(),
            requests: Math.floor(Math.random() * 1000) + 500,
        }
    })

    // Calculate total requests
    const totalRequests = usageData.reduce((sum, item) => sum + item.requests, 0)

    // Generate endpoint data
    const endpointData = availableRoutes
        .map((endpoint) => ({
            endpoint,
            requests: Math.floor(Math.random() * 5000) + 1000,
        }))
        .sort((a, b) => b.requests - a.requests)

    // Generate response time data
    const responseTimeData = availableRoutes
        .map((endpoint) => ({
            endpoint,
            responseTime: Math.floor(Math.random() * 300) + 50,
        }))
        .sort((a, b) => b.responseTime - a.responseTime)

    // Generate status code data
    const statusCodeData = [
        { statusCode: "2xx", count: Math.floor(Math.random() * 8000) + 10000 },
        { statusCode: "3xx", count: Math.floor(Math.random() * 1000) + 500 },
        { statusCode: "4xx", count: Math.floor(Math.random() * 800) + 200 },
        { statusCode: "5xx", count: Math.floor(Math.random() * 100) + 10 },
    ]

    // Calculate error rate
    const totalStatusCodes = statusCodeData.reduce((sum, item) => sum + item.count, 0)
    const errorCodes = statusCodeData
        .filter((item) => item.statusCode === "4xx" || item.statusCode === "5xx")
        .reduce((sum, item) => sum + item.count, 0)
    const errorRate = Number.parseFloat(((errorCodes / totalStatusCodes) * 100).toFixed(2))

    // Generate route-specific analysis data
    const routeAnalysisData = Array.from({ length: dataPoints }, (_, i) => {
        const date = new Date()

        if (format === "hourly") {
            date.setHours(date.getHours() - (dataPoints - i - 1))
        } else if (format === "daily") {
            date.setDate(date.getDate() - (dataPoints - i - 1))
        } else if (format === "weekly") {
            date.setDate(date.getDate() - (dataPoints - i - 1) * 7)
        }

        return {
            timestamp: date.toISOString(),
            requests: Math.floor(Math.random() * 500) + 100,
            responseTime: Math.floor(Math.random() * 200) + 50,
            errors: Math.floor(Math.random() * 20),
        }
    })

    // Generate user analysis data
    const userAnalysisData = [
        {
            category: "Mobile",
            newUsers: Math.floor(Math.random() * 1000) + 500,
            returningUsers: Math.floor(Math.random() * 2000) + 1000,
        },
        {
            category: "Desktop",
            newUsers: Math.floor(Math.random() * 800) + 300,
            returningUsers: Math.floor(Math.random() * 1500) + 800,
        },
        {
            category: "Tablet",
            newUsers: Math.floor(Math.random() * 400) + 100,
            returningUsers: Math.floor(Math.random() * 600) + 200,
        },
    ]

    // Generate geographic distribution data
    const geoDistributionData = [
        { region: "North America", value: Math.floor(Math.random() * 5000) + 3000 },
        { region: "Europe", value: Math.floor(Math.random() * 4000) + 2000 },
        { region: "Asia", value: Math.floor(Math.random() * 3000) + 1500 },
        { region: "South America", value: Math.floor(Math.random() * 1500) + 500 },
        { region: "Africa", value: Math.floor(Math.random() * 1000) + 300 },
        { region: "Oceania", value: Math.floor(Math.random() * 800) + 200 },
    ]

    // Generate realtime activity
    const methods = ["GET", "POST", "PUT", "DELETE"]
    const statusCodes = [200, 201, 204, 400, 401, 403, 404, 500]

    const realtimeActivity = Array.from({ length: 5 }, (_, i) => {
        const now = new Date()
        now.setMinutes(now.getMinutes() - i)

        return {
            method: methods[Math.floor(Math.random() * methods.length)],
            route: availableRoutes[Math.floor(Math.random() * availableRoutes.length)],
            statusCode: statusCodes[Math.floor(Math.random() * statusCodes.length)],
            responseTime: Math.floor(Math.random() * 500) + 20,
            ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            timestamp: now.toISOString(),
        }
    })

    // Calculate active users
    const activeUsers = Math.floor(Math.random() * 5000) + 1000

    return {
        totalRequests,
        requestsChange: Number.parseFloat((Math.random() * 20 - 10).toFixed(2)),
        avgResponseTime: Math.floor(Math.random() * 100) + 50,
        responseTimeChange: Number.parseFloat((Math.random() * 20 - 10).toFixed(2)),
        errorRate,
        errorRateChange: Number.parseFloat((Math.random() * 5 - 2.5).toFixed(2)),
        activeUsers,
        activeUsersChange: Number.parseFloat((Math.random() * 15 - 7.5).toFixed(2)),
        usageData,
        endpointData,
        responseTimeData,
        statusCodeData,
        routeAnalysisData,
        routeMetrics: {
            avgResponseTime: Math.floor(Math.random() * 150) + 30,
            successRate: Number.parseFloat((Math.random() * 10 + 90).toFixed(2)),
            cacheHitRate: Number.parseFloat((Math.random() * 60 + 20).toFixed(2)),
        },
        userAnalysisData,
        geoDistributionData,
        availableRoutes,
        realtimeActivity,
    }
}

