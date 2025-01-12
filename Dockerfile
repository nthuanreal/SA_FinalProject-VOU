# Use an official Golang image to build the application
FROM golang:1.22 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the entire source code into the container
COPY . .

# Build the Go application with environment variables to ensure it builds for Linux
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o promotion_service ./cmd/main.go

# Use a smaller image to run the application
FROM alpine:latest

# Install necessary dependencies (if any)
RUN apk --no-cache add ca-certificates bash

# Copy the executable from the builder stage to the runtime stage
COPY --from=builder /app/promotion_service /promotion_service
COPY config.yaml /config.yaml
COPY wait-for-it.sh /wait-for-it.sh

# Ensure the executable has execution permissions
RUN chmod +x /promotion_service /wait-for-it.sh

# Set the entrypoint to run the application
ENTRYPOINT ["/wait-for-it.sh", "db:3306", "--", "/promotion_service"]