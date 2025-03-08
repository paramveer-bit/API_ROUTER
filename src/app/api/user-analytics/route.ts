import { type NextRequest, NextResponse } from "next/server"

// This would typically connect to your database or analytics service
// For demo purposes, we're generating mock data
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const userCode = searchParams.get("userCode") || ""
    const timeRange = searchParams.get("timeRange") || "7d"

    if (!userCode) {
        return NextResponse.json({ error: "User code is required" }, { status: 400 })
    }

    // Generate mock data based on the user code and time range
    const data = generateMockUserData(userCode, timeRange)

    return NextResponse.json(data)
}

function generateMockUserData(userCode: string, timeRange: string) {
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

    // Create a deterministic but seemingly random user based on the userCode
    const userCodeHash = userCode.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    // Generate user profile
    const userProfile = {
        id: userCode,
        name: `User ${userCodeHash % 1000}`,
        email: `user${userCodeHash % 1000}@example.com`,
        joinedAt: new Date(Date.now() - (userCodeHash % 365) * 24 * 60 * 60 * 1000).toISOString(),
    }

    // Generate activity data
    const activityData = Array.from({ length: dataPoints }, (_, i) => {
        const date = new Date()

        if (format === "hourly") {
            date.setHours(date.getHours() - (dataPoints - i - 1))
        } else if (format === "daily") {
            date.setDate(date.getDate() - (dataPoints - i - 1))
        } else if (format === "weekly") {
            date.setDate(date.getDate() - (dataPoints - i - 1) * 7)
        }

        // Create some patterns based on userCode
        const baseRequests = (userCodeHash % 100) + 10
        const baseResponseTime = (userCodeHash % 50) + 30
        const baseErrors = userCodeHash % 5

        return {
            timestamp: date.toISOString(),
            requests: Math.floor(baseRequests * (0.5 + Math.random())),
            responseTime: Math.floor(baseResponseTime * (0.8 + Math.random() * 0.4)),
            errors: Math.floor(baseErrors * Math.random()),
        }
    })

    // Calculate total requests
    const totalRequests = activityData.reduce((sum, item) => sum + item.requests, 0)

    // Generate endpoint data
    const endpoints = [
        "/api/users",
        "/api/products",
        "/api/orders",
        "/api/auth",
        "/api/search",
        "/api/payments",
        "/api/analytics",
    ]

    const endpointData = endpoints
        .map((endpoint) => {
            // Make the data deterministic but varied based on userCode and endpoint
            const endpointHash = endpoint.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
            const combinedHash = (userCodeHash + endpointHash) % 1000

            return {
                endpoint,
                requests: Math.floor(combinedHash * 0.5) + 10,
                avgResponseTime: Math.floor(combinedHash * 0.2) + 20,
            }
        })
        .sort((a, b) => b.requests - a.requests)

    // Generate device data
    const deviceData = [
        { name: "iPhone", value: Math.floor(userCodeHash % 60) + 10 },
        { name: "Android", value: Math.floor(userCodeHash % 40) + 5 },
        { name: "Desktop", value: Math.floor(userCodeHash % 30) + 20 },
        { name: "Tablet", value: Math.floor(userCodeHash % 20) + 5 },
    ]

    // Generate browser data
    const browserData = [
        { name: "Chrome", value: Math.floor(userCodeHash % 50) + 30 },
        { name: "Safari", value: Math.floor(userCodeHash % 30) + 20 },
        { name: "Firefox", value: Math.floor(userCodeHash % 20) + 10 },
        { name: "Edge", value: Math.floor(userCodeHash % 10) + 5 },
    ]

    // Generate session data
    const sessionData = Array.from({ length: 5 }, (_, i) => {
        const startTime = new Date(Date.now() - i * 24 * 60 * 60 * 1000 - (userCodeHash % 12) * 60 * 60 * 1000)
        const isActive = i === 0 && Math.random() > 0.5
        const endTime = isActive ? null : new Date(startTime.getTime() + Math.random() * 60 * 60 * 1000)
        const duration = endTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : null

        return {
            id: `session-${userCodeHash}-${i}-${Date.now()}`,
            startTime: startTime.toISOString(),
            endTime: endTime?.toISOString() || null,
            duration,
            ipAddress: `${192 + (userCodeHash % 63)}.${168 + (i % 87)}.${1 + (userCodeHash % 254)}.${1 + (i % 254)}`,
            location: ["New York", "London", "Tokyo", "Sydney", "Berlin", "Paris", "Toronto"][userCodeHash % 7],
            device: deviceData[userCodeHash % deviceData.length].name,
            browser: browserData[userCodeHash % browserData.length].name,
            requestCount: Math.floor(Math.random() * 100) + 10,
        }
    })

    // Generate recent requests
    const methods = ["GET", "POST", "PUT", "DELETE"]
    const statusCodes = [200, 201, 204, 400, 401, 403, 404, 500]

    const recentRequests = Array.from({ length: 5 }, (_, i) => {
        const now = new Date()
        now.setMinutes(now.getMinutes() - i * 5 - (userCodeHash % 5))

        return {
            method: methods[(userCodeHash + i) % methods.length],
            endpoint: endpoints[(userCodeHash + i) % endpoints.length],
            statusCode: statusCodes[(userCodeHash + i) % statusCodes.length],
            responseTime: Math.floor(Math.random() * 200) + 20 + (userCodeHash % 50),
            timestamp: now.toISOString(),
        }
    })

    // Determine if there's an anomaly
    const hasAnomaly = userCodeHash % 5 === 0
    const anomalyMessages = [
        "Unusual spike in API requests detected in the last 24 hours.",
        "Significantly higher error rate than usual for this user.",
        "Unusual access pattern detected from new location.",
        "Multiple failed authentication attempts detected.",
        "Unusual number of requests to sensitive endpoints.",
    ]

    return {
        userProfile,
        totalRequests,
        requestsChange: Number.parseFloat((Math.random() * 20 - 10).toFixed(2)),
        avgResponseTime: Math.floor(activityData.reduce((sum, item) => sum + item.responseTime, 0) / activityData.length),
        responseTimeChange: Number.parseFloat((Math.random() * 20 - 10).toFixed(2)),
        errorRate: Number.parseFloat(
            ((activityData.reduce((sum, item) => sum + item.errors, 0) / totalRequests) * 100).toFixed(2),
        ),
        errorRateChange: Number.parseFloat((Math.random() * 5 - 2.5).toFixed(2)),
        activeSessions: sessionData.filter((session) => session.endTime === null).length,
        sessionsChange: Number.parseFloat((Math.random() * 15 - 7.5).toFixed(2)),
        activityData,
        endpointData,
        deviceData,
        browserData,
        sessionData,
        recentRequests,
        anomalyDetection: {
            hasAnomaly,
            message: hasAnomaly ? anomalyMessages[userCodeHash % anomalyMessages.length] : "",
        },
    }
}

