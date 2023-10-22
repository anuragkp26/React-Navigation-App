import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import { getUsers } from "../../../api/FollowersService";

export default function FollowersScreen() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFollowers = async () => {
      setIsLoading(true);
      console.log(" Api call Page : " + currentPage);
      const res = await getUsers(currentPage);

      console.log(" response size : " + res.length);

      setUsers((prev) => [...prev, ...res]);
      setIsLoading(false);
    };

    getFollowers(currentPage);
  }, [currentPage]);

  console.log(" Users List : " + users.length);

  const renderUsersItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={{ uri: item.picture?.large }} />
        <View style={styles.textContainer}>
          <Text
            style={styles.name}
          >{`${item.name?.title} ${item.name?.first} ${item.name?.last}`}</Text>
          <Text style={styles.email}>{item?.email}</Text>
        </View>
      </View>
    );
  };

  const renderLoading = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItems = () => {
    if (users.length > 0) {
      console.log(" Load more : ");

      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index}
        renderItem={renderUsersItem}
        ListFooterComponent={renderLoading}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 100,
  },
  textContainer: {
    justifyContent: "space-around",
  },
  name: {
    fontSize: 16,
  },
  email: {
    color: "#777",
  },
  loader: {
    marginVertical: 16,
    alignItems: "center",
  },
});
