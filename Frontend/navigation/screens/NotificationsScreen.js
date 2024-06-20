import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function NotificationsScreen({
  notifications,
  clearUnreadCount,
}) {
  // console.log(notifications);
  /*
[{"message": "Indoor Humidity is more than 50, it's 66", "time": "17.06.2024, 00:06:03"}]
  */

  useEffect(() => {
    clearUnreadCount();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>{item.message}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  notificationContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  notificationText: {
    fontSize: 16,
  },
  notificationTime: {
    fontSize: 12,
    color: "#777",
  },
});
