import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ReviewsTab = () => {
  // Dummy data for reviews
  const reviews = [
    { id: '1', stars: 5, text: 'Great player! Really enjoyed the game.' },
    { id: '2', stars: 4, text: 'Good teammate but needs to improve punctuality.' },
    { id: '3', stars: 5, text: 'Good game, much respect to him!' },
  ];

  const averageRating = reviews.length
    ? (reviews.reduce((total, review) => total + review.stars, 0) / reviews.length).toFixed(2)
    : 0;

  return (
    <View style={styles.container}>
      {/* User Rating Block */}
      <View style={styles.ratingBlock}>
        <FontAwesome name="star" size={40} color="#FFD700" />
        <Text style={styles.ratingText}>
          {reviews.length > 0 ? `${averageRating} / 5` : 'No ratings yet'}
        </Text>
      </View>

      {/* Reviews Section */}
      <View style={styles.reviewsBlock}>
        <Text style={styles.reviewsTitle}>Reviews</Text>

        {reviews.length === 0 ? (
          <Text style={styles.noReviewsText}>You don't have any reviews yet.</Text>
        ) : (
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <FontAwesome name="star" size={18} color="#FFD700" />
                  <Text style={styles.reviewStars}>{item.stars} / 5</Text>
                </View>
                <Text style={styles.reviewText}>{item.text}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  ratingBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#f7f7f7',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  reviewsBlock: {
    flex: 1,
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'left',
    color: '#333',
  },
  noReviewsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  reviewCard: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewStars: {
    fontSize: 16,
    marginLeft: 5,
    color: '#333',
    fontWeight: '600',
  },
  reviewText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});

export default ReviewsTab;
