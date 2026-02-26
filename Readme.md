

# Email Verification Using MEAN Stack

This application provides a user registration and email verification system implemented using the MEAN stack (MongoDB, Express.js, Angular, and Node.js). It allows users to register their accounts, receive a verification email with a unique token, and verify their email addresses to activate their accounts.

## Installation

Follow these steps to set up the application:

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/alalUDDIN123/email_verification.git
   ```

2. Navigate to the project directory:
   ```
   cd email_verification
   ```

3. Set up the backend:
   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Install the dependencies:
     ```
     npm install
     ```

4. Set up the frontend:
   - Navigate to the `frontend` directory:
     ```
     cd ../frontend
     ```
   - Install the dependencies:
     ```
     npm install
     ```

## Configuration

Before running the application, you need to configure some environment variables:

 **`Backend Configuration`**:
   - Create a `.env` file in the `backend` directory.
   - Set the following variables in the `.env` file:
     ```
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     EMAIL_USER=<your-email-username>
     EMAIL_PASS=<your-email-password>
     ```

## Usage

To run the application, follow these steps:

1. Start the backend server:
   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Run the following command:
     ```
     npm start
     ```

2. Start the frontend development server:
   - Navigate to the `frontend` directory:
     ```
     cd ../frontend
     ```
   - Run the following command:
     ```
     ng serve
     ```

3. Access the application in your browser:
   Open your web browser and go to `http://localhost:4200`.



## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

---

### Contact Information 📞

If you have any further inquiries or need additional information, please feel free to contact me via email or phone:

- Email: alalu75666@gmail.com
- Phone: +91 8822368403
