import { Stack } from 'expo-router';

const Layout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // This will hide the header for all screens in this stack
            }}
        />
    );
}

export default Layout;
