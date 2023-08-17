import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

const PersonIcon = (props) => (
    <Icon {...props} name='home-outline' />
);

const BellIcon = (props) => (
    <Icon {...props} name='plus-outline'/>
);

const EmailIcon = (props) => (
    <Icon {...props} name='settings-2-outline'/>
);

const useBottomNavigationState = (initialState = 0) => {
    const [selectedIndex, setSelectedIndex] = useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
};

export default BottomNavigationAccessoriesShowcase = () => {
    const bottomState = useBottomNavigationState();
    return (
        <>
            <View style={styles.container}>
                <BottomNavigation
                    style={styles.bottomNavigation}
                    {...bottomState}
                >
                    <BottomNavigationTab icon={PersonIcon} />
                    <BottomNavigationTab icon={BellIcon} />
                    <BottomNavigationTab icon={EmailIcon} />
                </BottomNavigation>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1, // Take up all available space
      justifyContent: 'flex-end', // Align content at the bottom
    },
    bottomNavigation: {
        // Your existing styles
        marginVertical: 8,
    },
});