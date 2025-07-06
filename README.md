
# Task Manager App

A clean and intuitive task management application built with React Native and Expo. This app helps you organize your daily tasks with a simple and effective interface.

## Features

### Core Functionality
- **Add Tasks**: Create new tasks with title and optional description
- **Mark as Complete**: Toggle task completion status with visual feedback
- **Delete Tasks**: Remove tasks from your list with confirmation
- **Task List**: View all tasks in a clean, organized list format
- **Real-time Statistics**: Monitor your productivity with live-updating statistics

### State Management
- **Shared Context**: Uses React Context API for global task state management
- **Real-time Updates**: Statistics automatically update when tasks are modified
- **Component State**: Demonstrates proper state and props usage in React Native
- **No External Dependencies**: Simple and lightweight state management

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Expo CLI (install globally with `npm install -g @expo/cli`)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your device**
   - **iOS**: Press `i` in the terminal or scan the QR code with the Expo Go app
   - **Android**: Press `a` in the terminal or scan the QR code with the Expo Go app
   - **Web**: Press `w` in the terminal to open in your browser

### Development Commands

```bash
# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Lint the code
npm run lint
```

## Project Structure

```
task-manager/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Tasks screen (main functionality)
│   │   └── explore.tsx    # Statistics screen
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable UI components
├── constants/            # App constants (colors, etc.)
├── hooks/               # Custom React hooks
└── assets/              # Images, fonts, and other assets
```

## Key Components

### Task Management (`app/(tabs)/index.tsx`)
- **Task Interface**: Defines the structure of a task object
- **State Management**: Uses useState for task list and input management
- **Task Operations**: Add, toggle, and delete functionality
- **UI Components**: Input field, task list, and interactive elements

### Statistics Screen (`app/(tabs)/explore.tsx`)
- **Real-time Data**: Shows live statistics based on actual tasks
- **Visual Components**: Cards displaying various metrics
- **Activity Tracking**: Recent task creation and completion stats
- **Productivity Tips**: Helpful suggestions for better task management

## Third-Party Libraries

This project uses the following third-party libraries:

- **@expo/vector-icons**: Provides a comprehensive icon library for React Native
  - Used for: Task completion checkmarks, delete buttons, and statistics icons
- **expo-linear-gradient**: Creates beautiful gradient backgrounds
  - Used for: Purple gradient backgrounds on both screens
- **expo-router**: File-based routing system for React Native
  - Used for: Navigation between screens and tab management
- **react-native-reanimated**: Animation library for smooth interactions
  - Used for: Enhanced user experience and transitions

## Customization

### Adding New Features
1. **New Task Properties**: Extend the Task interface in `index.tsx`
2. **Additional Screens**: Create new files in the `app/` directory
3. **Custom Components**: Add reusable components in the `components/` directory

### Styling
- **Theme Colors**: Modify `constants/Colors.ts` for custom color schemes
- **Component Styles**: Update StyleSheet objects in individual components
- **Dark/Light Mode**: Colors automatically adapt to system theme

## Best Practices Implemented

- **TypeScript**: Full type safety for better development experience
- **Component Structure**: Clean separation of concerns
- **State Management**: Proper use of React hooks
- **Error Handling**: Input validation and user confirmation dialogs
- **Performance**: Efficient list rendering with FlatList
- **Accessibility**: Proper touch targets and screen reader support

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npm start -- --clear
   ```

2. **iOS simulator not working**
   - Ensure Xcode is installed and updated
   - Run `npx expo install` to ensure compatibility

3. **Android emulator issues**
   - Make sure Android Studio and SDK are properly configured
   - Check that ANDROID_HOME environment variable is set

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Review [React Native documentation](https://reactnative.dev/)
- Search for issues in the [Expo GitHub repository](https://github.com/expo/expo)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)
- Icons provided by [@expo/vector-icons](https://expo.github.io/vector-icons/)


