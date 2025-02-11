import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const phoneNumber = 9866115041;

    // Fetch user details and e-wallet balance
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                console.log("Fetching user data...");
                const response = await axios.get(`https://ewalletbackend-t1gl.onrender.com/api/v1/users/${phoneNumber}`);
                setUser(response.data);
                console.log("User data fetched:", response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getUserDetails();
    }, []);

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error || !user) {
        return <Text style={styles.errorText}>Error loading data</Text>;
    }

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuText}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.balance}>User: {user.name || 'N/A'}</Text>
                <Text style={styles.balanceLabel}>Linked Bank: {user.bankName || 'N/A'}</Text>
                <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
                <Text style={styles.balance}>Rs. {user.ewalletBalance || 0}</Text>
            </View>

            {/* Body Section */}
            <View style={styles.body}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('loadMoney')}>
                        <Text style={styles.buttonText}>Load Money</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('sendMoney')}>
                        <Text style={styles.buttonText}>Send Money</Text>
                    </TouchableOpacity>
                    <Button title="Bank Balance Load" />
                </View>
            </View>

            {/* Footer Section */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerTab}>
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerTab}>
                    <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    header: {
        backgroundColor: '#015f66',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 90,
        paddingBottom: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    menuButton: {
        position: 'absolute',
        top: 40,
        left: 24,
    },
    menuText: {
        fontSize: 24,
        color: '#fff',
    },
    balanceLabel: {
        fontSize: 16,
        color: '#b2ebf2',
        marginTop: 10,
    },
    balance: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '90%',
        paddingHorizontal: 10,
    },
    actionButton: {
        backgroundColor: '#027378',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: -1 },
    },
    footerTab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 8,
        borderColor: '#000',
        borderRadius: 4,
        marginHorizontal: 2,
        backgroundColor: '#fff',
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.4,
    },
    footerText: {
        fontSize: 16,
        color: '#015f66',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#015f66',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'red',
    }
});
