
# Arithmetic Calculator Back-end

This repository contains the back-end code for the Arithmetic Calculator application.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your local machine:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone git@github.com:jvmxgs/arithmetic-calculator-back.git
   cd arithmetic-calculator-back
   ```

2. **Copy `.env.example` to `.env` and configure the variables:**

   ```sh
   cp .env.example .env
   ```

   Open `.env` in your preferred text editor and configure the necessary environment variables.

3. **Install the dependencies:**

   ```sh
   npm install
   ```

4. **Generate the application key:**

   ```sh
   npm run key:generate
   ```

   Copy the generated key and add it to the `.env` file.

5. **Run the database migrations:**

   ```sh
   npm run migration:run
   ```

6. **Seed the database:**

   ```sh
   npm run seed:run
   ```

7. **Start the development server:**

   ```sh
   npm run dev
   ```

The application should now be running on `http://localhost:3001`.

## Usage

To use the application, you can make API requests to the endpoints defined in the [API Documentation](https://github.com/jvmxgs/arithmetic-calculator-back/wiki/Api-endpoints).

