# AccessHub

This project is a user management application built with React, React Router, and React Hook Form. The app allows you to create, list, edit, and delete users. Additionally, it supports assigning roles and ensuring proper access control. It is a lightweight application designed to support user management for management and HR departments. The app facilitates listing all users or employees along with their roles and is easily customizable to fit any organization's needs.

## Features

- **User Listing**: View a list of users.
- **Create User**: Add a new user to the list.
- **Edit User**: Modify the details of an existing user.
- **Delete User**: Remove users from the list.
- **Role Assignment**: Assign roles to users, such as Crew, Fleet Manager, TSI, and Admin.
- **Validation**: Form validation to ensure data integrity.

## Technologies Used

- React
- React Router
- React Hook Form
- React Toastify for notifications
- CSS for styling

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management-app.git
   cd user-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

## API

The app communicates with a backend server to manage user data. It also builds and ensures that the json-based backend server, built using the React JSON server package, is running and accessible at `http://localhost:8000`.

### Endpoints

- `GET /user` - Fetch all users
- `POST /user` - Create a new user
- `GET /user/:id` - Fetch a specific user by ID
- `PUT /user/:id` - Update a specific user by ID
- `DELETE /user/:id` - Delete a specific user by ID

## Components

### `App.js`

The main component that sets up routing for the application.

### `UserListing.js`

Displays the list of users with options to add, edit, or delete users.

### `UserCreate.js`

Form to create a new user.

### `EditForm.js`

Form to edit an existing user.

## Usage

### User Listing

The main page displays a list of users. You can select users using the checkboxes provided.

### Add New User

Click the "Add New" button to navigate to the user creation form. Fill in the details and submit the form to add a new user.

### Edit User

Select exactly one user and click the "Edit" button to navigate to the user editing form. Modify the details and submit the form to update the user.

### Delete User

Select one or more users and click the "Delete" button to remove the selected users from the list.

## Form Validation

The forms include validation to ensure that:

- Name and email are required fields.
- Age must be a number between 18 and 50.
- User type must be selected from the provided options.

## Notifications

React Toastify is used to display success and error messages for various actions such as adding, editing, or deleting users.


---

Feel free to contribute to this project by submitting issues or pull requests. If you have any questions, please contact [yasinmanath@gmail.com].
