# ADR 001: Choice of Socket.io for Real-Time Race Data

## Status
Accepted

## Context
The Apex Race Control dashboard requires high-frequency, low-latency updates for driver positions, lap times, and race standings. The data changes every second (or faster) and must be synchronized across all connected clients to provide a professional "broadcast-style" experience.

We evaluated three primary architectural patterns for delivering these updates:

### 1. REST Polling (Every 1 Second)
- **Trade-offs**:
    - **Latency**: High. On average, updates are delayed by half the polling interval + network overhead.
    - **Server Load**: Very High. Each client makes a full HTTP request/response cycle every second, leading to massive overhead in headers and connection setup.
    - **Scalability**: Poor. Database and server resources are wasted on "no change" responses.
    - **Support**: Universal.

### 2. Server-Sent Events (SSE)
- **Trade-offs**:
    - **Latency**: Low. Pushed from server as soon as data is available.
    - **Protocol**: Unidirectional (Server-to-Client only).
    - **Server Load**: Moderate. Persistent HTTP connections but lighter than full bidirectional setups.
    - **Browser Support**: Good (Native in modern browsers), but lacks features like automatic reconnection logic out of the box.

### 3. WebSocket via Socket.io
- **Trade-offs**:
    - **Latency**: Ultra-Low. Full-duplex persistent connection.
    - **Bidirectional**: Allows clients to "join rooms" (e.g., follow specific drivers) or send interaction signals back to the server.
    - **Features**: Built-in heartbeat, automatic reconnection, and fallback to long-polling for older environments.
    - **Server Load**: Initial handshake overhead, but very efficient for high-frequency data streaming.

## Decision
We decided to use **Socket.io** for real-time telemetry and standings.

Socket.io provides the best balance of performance (low-latency WebSockets) and reliability (automatic reconnection and fallbacks). In a race environment, losing connection for even a few seconds means missing crucial overtakes or flag changes; Socket.io handles these disruptions more gracefully than primitive SSE or manual REST polling.

## Consequences
- **Bidirectional Need**: While current needs are mostly server-to-client, the bidirectional nature allows for future features like team radio requests or interactive pit strategy voting.
- **State Management**: Using Socket.io requires careful management of client connections and "rooms" to ensure we aren't broadcasting telemetry to clients who are on a different page.
- **Scaling to 10k+ Viewers**: 
    - WebSocket connections are stateful and memory-intensive. To scale beyond a single server, we would need to implement a **Redis Adapter** for Socket.io.
    - This allows multiple server instances to coordinate broadcasts and ensures that a client connected to Server A receives a message emitted from Server B.
    - A load balancer with "sticky sessions" or "session affinity" is required during the initial HTTP handshake.
