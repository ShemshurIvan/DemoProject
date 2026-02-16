# Stage 1: Compilation
# Utilizing Maven with Java 21 to match the pom.xml specification
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy configuration and source code
COPY pom.xml .
COPY src ./src

# execute the build, skipping tests to accelerate the process
RUN mvn clean package -DskipTests

# Stage 2: Runtime Environment
# Utilizing a lightweight Alpine Linux image with Java 21 JRE
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the compiled JAR file from the build stage
# The wildcard *.jar ensures the file is found regardless of specific version naming
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Define the entry point for the container
ENTRYPOINT ["java", "-jar", "app.jar"]