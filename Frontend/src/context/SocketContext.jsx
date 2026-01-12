import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        // Initialize Socket.IO connection
        const newSocket = io('http://localhost:5000', {
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
        });

        newSocket.on('connect', () => {
            console.log('✅ Socket connected:', newSocket.id);
            setConnected(true);

            // Join appropriate room based on user role
            if (isAuthenticated && user) {
                if (user.role === 'admin') {
                    newSocket.emit('joinAdminRoom');
                    console.log('👨‍💼 Joined admin room');
                } else {
                    newSocket.emit('joinUserRoom', user._id);
                    console.log('👤 Joined user room:', user._id);
                }
            }
        });

        newSocket.on('disconnect', () => {
            console.log('❌ Socket disconnected');
            setConnected(false);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setConnected(false);
        });

        setSocket(newSocket);

        // Cleanup on unmount
        return () => {
            console.log('🔌 Disconnecting socket');
            newSocket.close();
        };
    }, [isAuthenticated, user]);

    const value = {
        socket,
        connected,
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
