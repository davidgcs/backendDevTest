## Build and Run Instructions

### Clone the Repository

```sh
git clone https://github.com/davidgcs/backendDevTest.git
cd ./backendDevTest/backend
```

### Build and Install Dependencies

```sh
./gradlew clean build --refresh-dependencies
```

### Run the Project

```sh
./gradlew bootRun
```

**Access the App**
Open your browser and navigate to `http://localhost:5000/swagger` (or the port specified in your configuration).

## Dependencies

- Java 17 (jdk Eclipse Adoptium 17.0.16+8)
- Spring Boot 3.5.3
- Gradle 8.14.3
- Groovy 3.0.24
