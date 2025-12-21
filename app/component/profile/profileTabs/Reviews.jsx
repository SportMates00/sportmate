import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/themeContext';

const ReviewsTab = ({loggedUser}) => {
  // Dummy data for reviews
  const reviews = loggedUser.profileInfo.reviews;
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const averageRating = reviews.length
    ? (reviews.reduce((total, review) => total + review.stars, 0) / reviews.length).toFixed(2)
    : 0;

  return (
    <View style={styles.container}>

      {/* Reviews Section */}
      <View style={styles.reviewsBlock}>
        <Text style={styles.reviewsTitle}>Reviews</Text>

        {reviews.length === '' ? (
          <Text style={styles.noReviewsText}>You don't have any reviews yet.</Text>
        ) : (
          reviews.map(val => {
            return (
              <View key={val.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <FontAwesome name="star" size={18} color="#FFD700" />
                <Text style={styles.reviewStars}>{val.stars} / 5</Text>
              </View>
              <Text style={styles.reviewText}>{val.text}</Text>
            </View>
            )
          } )
        )}
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  ratingBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.radius.semiCircle,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: theme.radius.semiCircle,
    elevation: 2,
  },
  ratingText: {
    fontSize: theme.fonts.size.large,
    fontWeight: 'bold',
    marginTop: theme.spacing.medium,
    color: theme.colors.text,
  },
  reviewsBlock: {
    flex: 1,
    marginTop: theme.spacing.medium,
  },
  reviewsTitle: {
    fontSize: theme.fonts.size.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.medium,
    textAlign: 'left',
    color: theme.colors.text,
  },
  noReviewsText: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.medium,
  },
  reviewCard: {
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.radius.semiCircle,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: theme.radius.semiCircle,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  reviewStars: {
    fontSize: theme.fonts.size.medium,
    marginLeft: theme.spacing.small,
    color: theme.colors.text,
    fontWeight: '600',
  },
  reviewText: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.text,
    lineHeight: 22,
  },
});

export default ReviewsTab;
