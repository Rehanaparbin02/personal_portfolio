import { Stack } from 'expo-router';
import '../src/index.css';

export default function Layout() {
    return <Stack screenOptions={{ headerShown: false }} />;
}
