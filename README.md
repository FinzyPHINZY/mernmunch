# MERNMunch

MERNMunch is a food delivery application built with the MERN stack (MongoDB, Express.js, React, and Node.js). The project aims to provide users with a seamless experience for browsing and ordering food from various restaurants. The project also used TailwindCSS, TypeScript, Mongoose, React Query, Shadcn Component Library for efficient styling, type safety, database modeling, state management, and user interface components, respectively.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Issues Faced](#issues-faced)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with Auth0
- Browse restaurants and menu items
- Add items to cart and place orders
- Responsive design with ShadCN components
- User profile management
- Restaurant profile management
- Pagination
- Filtering and Sorting

## Tech Stack

- **Frontend:** React, Vite, TypeScript, ShadCN UI, React Hook Form
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** Auth0
- **State Management:** React Query

## Project Structure

```
mernmunch/
│
├── backend/                  # Backend directory
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Frontend directory
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Usage

- Register and log in to your account
- Browse available restaurants and their menu items
- Add items to your cart and place an order
- Update your user profile information

## Issues Faced

### Path Resolution Issues

**Problem:** The initial deployment failed due to unresolved module paths in the frontend. The error messages indicated that modules could not be found.

**Solution:** The import paths were updated to relative paths (e.g., `../../lib/utils`) to ensure proper resolution during the build process. This change resolved the build errors and allowed the application to be deployed successfully.

### Environment Configuration

**Problem:** Setting up environment variables for different environments (development, staging, production) was challenging.

**Solution:** Proper `.env` files were created for both backend and frontend, and sensitive information was stored securely.

### Auth0 Integration

**Problem:** Integrating Auth0 for user authentication required careful handling of tokens and securing routes.

**Solution:** Auth0 was successfully integrated, and protected routes were created to ensure only authenticated users can access certain parts of the application.

### State Management with React Query

**Problem:** Managing server state efficiently, especially for asynchronous operations like fetching user data and updating profiles.

**Solution:** React Query was utilized to manage server state, providing hooks for data fetching, caching, and synchronization.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
