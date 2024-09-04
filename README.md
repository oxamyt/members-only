# Private Club Messaging App

This project is a simple private club messaging system where users can sign up, create messages, and join a private club with restricted access. The app also includes an admin role for managing content and users.

## Features

- **User Authentication**: Secure sign-up and login forms with password hashing using bcrypt.
- **Membership System**: Users can join the private club by entering a secret passcode.
- **Message Creation**: Logged-in members can create messages with titles, timestamps, and text content.
- **Admin Role**: Admin users can delete messages and manage content on the platform.
- **Message Visibility**: Only club members can view the authors and timestamps of messages, while all visitors can see the messages themselves.

## Technologies Used

- **Node.js**: Backend development
- **Express.js**: Web framework for handling routes and middleware
- **PostgreSQL**: Database management system
- **Connect-pg-simple** Session store
- **bcrypt**: Library for hashing and securing passwords
- **passport.js**: Authentication middleware for Node.js
- **ExpressValidator**: Validation library for ensuring data integrity
- **EJS**: Templating engine for dynamic views

## Project Structure

1. **Database Design**:

   - **Users**: Stores full name, username (email), password, membership status, and an optional admin field.
   - **Messages**: Contains the message title, timestamp, text, and a reference to the user who created it.

2. **User Authentication**:

   - Secure sign-up form with password and confirmPassword fields.
   - Passwords are hashed using bcrypt, with custom validators for form validation.
   - Membership passcode page for granting membership status to users.
   - Admin setup via an additional passcode or checkbox during sign-up.

3. **Message Management**:

   - Logged-in users can create new messages.
   - Admin users have the ability to delete messages.

4. **Visibility Rules**:

   - Messages are visible to all, but author details and timestamps are only visible to members.

5. **DEPLOY**:

   - Live: https://members-only-production-9359.up.railway.app/
